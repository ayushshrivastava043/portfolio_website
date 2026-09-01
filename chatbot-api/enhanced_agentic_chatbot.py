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
GEMINI_MODEL = 'gemini-3.6-flash'
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

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
    
    context_parts = ["You're Ayush's friendly AI assistant. Talk naturally and casually, like chatting with a friend. Keep responses short (1-3 sentences) unless they ask for details."]
    
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
                "temperature": 0.9,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 512,
            }
        }
        
        response = requests.post(url, json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if 'candidates' in data and len(data['candidates']) > 0:
                content = data['candidates'][0].get('content', {})
                parts = content.get('parts', [])
                if parts and len(parts) > 0:
                    return parts[0].get('text', 'Hmm, let me think about that...').strip()
        else:
            logger.error(f"Gemini API error: {response.status_code} - {response.text}")
            return "Oops, something went wrong. Try again?"
    except Exception as e:
        logger.error(f"Gemini API error: {e}")
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
        'model': 'gemini-pro'
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
        'model': 'gemini-pro'
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
        
        # Get AI response from Gemini
        ai_response = get_gemini_response(message)
        
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

