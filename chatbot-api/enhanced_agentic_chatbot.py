#!/usr/bin/env python3
"""
Enhanced Agentic Chatbot Server with Google Gemini API
Runs on port 4010 to provide AI chat functionality with Gemini integration
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os
import json
import requests
from datetime import datetime

# Gemini via REST API (avoids google-generativeai protobuf issues on Python 3.14)
# gemini-2.0-flash is faster and more reliable for short chat than 3.6-thinking models
GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.0-flash')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
GEMINI_TIMEOUT = int(os.environ.get('GEMINI_TIMEOUT', '18'))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# CORS for GitHub Pages and local dev (explicit preflight support)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=False,
)


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        resp = app.make_response(("", 204))
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        resp.headers["Access-Control-Max-Age"] = "86400"
        return resp


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

if GEMINI_API_KEY:
    logger.info(f"✅ Gemini REST API configured with model: {GEMINI_MODEL}")
else:
    logger.warning("⚠️  GEMINI_API_KEY not set.")

# Load knowledge base from file
KNOWLEDGE_BASE = {}
KNOWLEDGE_BASE_PATH = os.path.join(os.path.dirname(__file__), 'knowledge_base.json')

# Also check for PORTFOLIO_CONTEXT from ai_server.py
AI_SERVER_PATH = os.path.join(os.path.dirname(__file__), 'ai_server.py')

def load_knowledge_base():
    """Load knowledge base from JSON file and merge with any existing context"""
    global KNOWLEDGE_BASE
    try:
        # First, try to load from JSON file
        if os.path.exists(KNOWLEDGE_BASE_PATH):
            with open(KNOWLEDGE_BASE_PATH, 'r', encoding='utf-8') as f:
                KNOWLEDGE_BASE = json.load(f)
            logger.info(f"✅ Knowledge base loaded from {KNOWLEDGE_BASE_PATH}")
        else:
            logger.warning(f"⚠️  Knowledge base file not found: {KNOWLEDGE_BASE_PATH}")
            KNOWLEDGE_BASE = {}
        
        # Also try to extract PORTFOLIO_CONTEXT from ai_server.py if it exists
        try:
            if os.path.exists(AI_SERVER_PATH):
                with open(AI_SERVER_PATH, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Look for PORTFOLIO_CONTEXT
                    if 'PORTFOLIO_CONTEXT' in content:
                        logger.info("✅ Found PORTFOLIO_CONTEXT in ai_server.py")
                        # Extract the context (basic extraction)
                        import re
                        match = re.search(r'PORTFOLIO_CONTEXT\s*=\s*"""(.*?)"""', content, re.DOTALL)
                        if match:
                            portfolio_context = match.group(1).strip()
                            # If knowledge base doesn't have about_ayush, try to parse from context
                            if "about_ayush" not in KNOWLEDGE_BASE:
                                KNOWLEDGE_BASE["about_ayush"] = {}
                            if "profession" not in KNOWLEDGE_BASE.get("about_ayush", {}):
                                if "AI Product Manager" in portfolio_context:
                                    KNOWLEDGE_BASE.setdefault("about_ayush", {})["profession"] = "AI Product Manager & GenAI Strategist"
        except Exception as e:
            logger.warning(f"Could not extract context from ai_server.py: {e}")
        
        # Ensure we have at least minimal structure
        if not KNOWLEDGE_BASE:
            KNOWLEDGE_BASE = {
                "about_ayush": {
                    "name": "Ayush Shrivastava",
                    "profession": "AI Product Manager & GenAI Strategist"
                },
                "personal": {
                    "friends": [{"name": "Patty", "relationship": "friend"}]
                }
            }
        
        return True
    except Exception as e:
        logger.error(f"Error loading knowledge base: {e}")
        KNOWLEDGE_BASE = {}
        return False

# Load knowledge base on startup
load_knowledge_base()

def build_context_from_knowledge_base():
    """Build conversation context from knowledge base"""
    if not KNOWLEDGE_BASE:
        return "You are Ayush's friendly AI assistant. Be casual and conversational."
    
    context_parts = [
        "You're Ayush's friendly AI assistant. Talk naturally and casually, like chatting with a friend.",
        "Always finish with a complete sentence. Use 2-4 sentences for 'about Ayush' or project questions.",
    ]
    
    # Add about information
    if "about_ayush" in KNOWLEDGE_BASE:
        about = KNOWLEDGE_BASE["about_ayush"]
        context_parts.append(f"\nAbout Ayush:")
        if "name" in about:
            context_parts.append(f"- Name: {about['name']}")
        if "profession" in about:
            context_parts.append(f"- Profession: {about['profession']}")
        if "bio" in about:
            context_parts.append(f"- Bio: {about['bio']}")
    
    # Add projects
    if "projects" in KNOWLEDGE_BASE and KNOWLEDGE_BASE["projects"]:
        context_parts.append("\nProjects:")
        for project in KNOWLEDGE_BASE["projects"][:5]:  # Limit to 5 projects
            if "name" in project:
                context_parts.append(f"- {project['name']}")
                if "description" in project:
                    context_parts.append(f"  ({project['description']})")
    
    # Add personal connections
    if "personal" in KNOWLEDGE_BASE and "friends" in KNOWLEDGE_BASE["personal"]:
        friends = KNOWLEDGE_BASE["personal"]["friends"]
        if friends:
            context_parts.append("\nFriends:")
            for friend in friends:
                if "name" in friend:
                    context_parts.append(f"- {friend['name']}")
    
    # Add conversation style
    context_parts.append("\nConversation style:")
    context_parts.append("- Be casual, friendly, and human-like")
    context_parts.append("- Keep responses concise (1-3 sentences usually)")
    context_parts.append("- Don't always redirect to professional topics")
    context_parts.append("- Use contractions (I'm, you're, don't, etc.)")
    context_parts.append("- Match the user's tone")
    
    return "\n".join(context_parts)


def looks_incomplete(text):
    """Detect mid-sentence cutoffs from Gemini."""
    if not text or not text.strip():
        return True
    text = text.strip()
    if text[-1] in '.!?':
        return False
    trailing = text.rsplit(None, 1)[-1].lower() if text.split() else ''
    bad_endings = (
        'and', 'or', 'the', 'a', 'an', 'to', 'in', 'with', 'like', 'for', 'of',
        'is', 'are', 'who', 'that', 'creative', 'super', 'really', 'just',
    )
    return trailing in bad_endings or len(text) > 40


def brain_answer(message):
    """Intent-based answers from knowledge base — mirrors assets/js/chatbot-brain.js."""
    if not KNOWLEDGE_BASE:
        return None

    msg = message.lower().strip().replace('mea ', 'me ').replace('bout ', 'about ')
    about = KNOWLEDGE_BASE.get('about_ayush', {})
    skills = KNOWLEDGE_BASE.get('skills', [])
    projects = KNOWLEDGE_BASE.get('projects', [])
    templates = KNOWLEDGE_BASE.get('templates', {})

    for faq in KNOWLEDGE_BASE.get('faqs', []):
        if any(k.lower() in msg for k in faq.get('keywords', [])):
            return faq.get('answer')

    def about_block():
        name = about.get('name', 'Ayush Shrivastava')
        profession = about.get('profession', 'AI Product Manager & GenAI Strategist')
        bio = about.get('bio', '')
        names = ', '.join(p.get('name', '') for p in projects[:3] if p.get('name'))
        parts = [f"{name} is an {profession}.", bio]
        if names:
            parts.append(f"Notable work includes {names}.")
        return ' '.join(p for p in parts if p).strip()

    # Greeting
    if msg in ('hi', 'hey', 'hello', 'hola', 'yo', 'sup', 'wassup') or "what's up" in msg or 'whats up' in msg:
        return templates.get('greeting', "Hey! I'm Ayush's AI assistant. Ask about his projects, skills, or experience.")

    # What does Ayush do
    if 'ayush' in msg and any(p in msg for p in ('what does', 'what do', 'does he do', 'does ayush do', ' his work', ' his job')):
        name = about.get('name', 'Ayush Shrivastava')
        profession = about.get('profession', 'AI Product Manager & GenAI Strategist')
        bio = about.get('bio', '')
        names = ', '.join(p.get('name', '') for p in projects[:3] if p.get('name'))
        parts = [f"{name} is an {profession}.", bio]
        if names:
            parts.append(f"He builds products like {names}.")
        return ' '.join(p for p in parts if p).strip()

    if any(p in msg for p in ('skill', 'tech', 'expertise', 'stack', 'technologies')):
        skills = KNOWLEDGE_BASE.get('skills', {})
        if isinstance(skills, dict):
            flat = [i for v in skills.values() for i in (v or [])]
            return f"Ayush's key skills include {', '.join(flat)}." if flat else "Ayush works across AI product management and GenAI."
        if skills:
            return f"Ayush's key skills include {', '.join(skills)}."
        return "Ayush works across AI product management and GenAI."

    if any(p in msg for p in ('project', 'built', 'portfolio', 'showcase', 'demo')):
        if projects:
            return ' | '.join(
                f"{p.get('name')} — {p.get('description', '')}".strip(' —')
                for p in projects if p.get('name')
            )
        return "Ayush has built agentic chatbots, workflow tools, and AI portal integrations."

    if any(p in msg for p in ('experience', 'career', 'background', 'resume', 'cv')):
        exp = KNOWLEDGE_BASE.get('experience', [])
        if exp:
            e = exp[0]
            return f"{e.get('role', 'AI Product Manager')}. {e.get('description', '')}".strip()
        return about_block()

    if any(p in msg for p in ('contact', 'email', 'linkedin', 'reach', 'hire', 'available', 'connect')):
        c = KNOWLEDGE_BASE.get('contact', {})
        parts = []
        if c.get('email'):
            parts.append(f"Email: {c['email']}")
        if c.get('linkedin'):
            parts.append(f"LinkedIn: {c['linkedin']}")
        if c.get('github'):
            parts.append(f"GitHub: {c['github']}")
        if parts:
            return f"You can reach Ayush here — {'. '.join(parts)}."
        return "Check the Contact section on this portfolio, or connect via LinkedIn."

    if any(p in msg for p in ('who is', 'about ayush', 'tell me', 'what can you', 'introduce')) or 'ayush' in msg:
        return about_block()

    return templates.get('fallback')


def kb_fast_response(message):
    """Alias for brain_answer; returns None only when KB empty."""
    result = brain_answer(message)
    if result:
        return result
    return None


def extract_gemini_text(data):
    """Join all text parts; return (text, finish_reason)."""
    candidates = data.get('candidates') or []
    if not candidates:
        return '', None
    candidate = candidates[0]
    parts = candidate.get('content', {}).get('parts', [])
    text = ''.join(p.get('text', '') for p in parts if p.get('text')).strip()
    finish = candidate.get('finishReason')
    return text, finish


def get_gemini_response(message):
    """Get AI response using Google Gemini API"""
    if not GEMINI_API_KEY:
        return "Sorry, I'm having some technical issues right now."
    
    # Build context from knowledge base
    context = build_context_from_knowledge_base()
    
    # Create a more conversational prompt
    conversation_prompt = f"""{context}

User: {message}

You (respond naturally, be friendly and casual, don't always redirect to work topics):"""
    
    # Call Gemini REST API
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [{
                "parts": [{
                    "text": conversation_prompt
                }]
            }],
            "generationConfig": {
                "temperature": 0.8,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            }
        }

        response = requests.post(url, json=payload, timeout=GEMINI_TIMEOUT)

        if response.status_code == 200:
            data = response.json()
            text, finish = extract_gemini_text(data)
            if text and not looks_incomplete(text):
                return text
            if text:
                logger.warning(f"Gemini truncated response (finish={finish}): {text[:80]}...")
            fallback = kb_fast_response(message)
            if fallback:
                return fallback
            if text:
                return text.rstrip(',;: ') + '.'
            return "Hmm, let me think about that..."
        else:
            logger.error(f"Gemini API error: {response.status_code} - {response.text}")
    except Exception as e:
        logger.error(f"Gemini API error: {e}")

    fallback = kb_fast_response(message)
    if fallback:
        return fallback
    return "Sorry, I'm having trouble right now. Can you try again?"

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Enhanced Agentic Chatbot',
        'port': 4010,
        'version': '1.0.0',
        'gemini_configured': bool(GEMINI_API_KEY),
        'model': GEMINI_MODEL
    })

@app.route('/init', methods=['POST'])
def init():
    """Initialize RAG system"""
    return jsonify({
        'status': 'ready',
        'message': 'Enhanced Agentic Chatbot initialized',
        'gemini_available': bool(GEMINI_API_KEY)
    })

@app.route('/status', methods=['GET'])
def status():
    """Get RAG status"""
    return jsonify({
        'status': 'ready',
        'message': 'Enhanced Agentic Chatbot is ready',
        'gemini_configured': bool(GEMINI_API_KEY),
        'model': GEMINI_MODEL
    })

@app.route('/chat', methods=['POST'])
def chat():
    """AI chat endpoint"""
    try:
        data = request.json
        message = data.get('message', '')
        
        if not message:
            return jsonify({
                'status': 'error',
                'message': 'Message is required'
            }), 400
        
        # Reload knowledge base if requested (for dynamic updates)
        if data.get('reload_kb', False):
            load_knowledge_base()
        
        # Fast path: intent brain answers instantly from KB
        ai_response = brain_answer(message)
        if not ai_response and os.environ.get('USE_GEMINI_CHAT', 'false').lower() == 'true':
            ai_response = get_gemini_response(message)
        elif not ai_response:
            ai_response = KNOWLEDGE_BASE.get('templates', {}).get(
                'fallback',
                "I'm Ayush's portfolio assistant. Ask about his projects, skills, or experience."
            )
        
        return jsonify({
            'status': 'success',
            'response': ai_response,
            'timestamp': datetime.now().isoformat(),
            'metadata': {
                'model': GEMINI_MODEL if GEMINI_API_KEY else 'not_configured',
                'gemini_enabled': bool(GEMINI_API_KEY),
                'knowledge_base_loaded': bool(KNOWLEDGE_BASE)
            }
        })
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/knowledge-base', methods=['GET'])
def get_knowledge_base():
    """Get current knowledge base"""
    return jsonify({
        'status': 'success',
        'knowledge_base': KNOWLEDGE_BASE,
        'loaded_from_file': os.path.exists(KNOWLEDGE_BASE_PATH)
    })

@app.route('/knowledge-base', methods=['POST'])
def update_knowledge_base():
    """Update knowledge base"""
    try:
        global KNOWLEDGE_BASE
        new_kb = request.json.get('knowledge_base', {})
        KNOWLEDGE_BASE.update(new_kb)
        
        # Save to file
        with open(KNOWLEDGE_BASE_PATH, 'w', encoding='utf-8') as f:
            json.dump(KNOWLEDGE_BASE, f, indent=2)
        
        logger.info("Knowledge base updated and saved")
        return jsonify({
            'status': 'success',
            'message': 'Knowledge base updated',
            'knowledge_base': KNOWLEDGE_BASE
        })
    except Exception as e:
        logger.error(f"Error updating knowledge base: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4010))
    debug = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    print("🤖 Starting Enhanced Agentic Chatbot Server with Google Gemini...")
    print(f"🌐 Chatbot Server: http://0.0.0.0:{port}")
    print(f"📊 Health Check: http://0.0.0.0:{port}/health")
    print(f"💬 Chat Endpoint: http://0.0.0.0:{port}/chat")
    print(f"🔑 Gemini API Key: {'✅ Configured' if GEMINI_API_KEY else '❌ Not configured'}")
    print("=" * 50)

    app.run(host='0.0.0.0', port=port, debug=debug, use_reloader=False)

