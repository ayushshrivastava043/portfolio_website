"""
Portfolio chatbot API — grounded on knowledge_base.json (Gemini optional).
Deploy to Render and point CHATBOT_CONFIG.apiUrl at /chat after deploy.
"""
from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ROOT = Path(__file__).resolve().parent
KB_PATH = ROOT / "knowledge_base.json"

def load_kb():
    with open(KB_PATH, encoding="utf-8") as f:
        return json.load(f)

KB = load_kb()

SYSTEM = """You are Ayush Shrivastava's portfolio assistant.
Answer ONLY from the provided CONTEXT. Be concise and accurate.
If the context lacks the answer, say you don't have that detail and suggest asking about Verifast, CGI, Durham MBA consulting, projects, skills, or contact.
Never invent employers, projects, or metrics.
Never mention Visual Workflow Generator or Universal Avatar Generator — those are outdated.
"""

def context_blob(kb: dict) -> str:
    parts = []
    about = kb.get("about_ayush") or {}
    parts.append(f"PROFILE: {about.get('name')} — {about.get('profession')}. {about.get('bio')}")
    for e in kb.get("experience") or []:
        parts.append(f"EXPERIENCE: {e.get('company')} | {e.get('role')} | {'; '.join(e.get('highlights') or [])}")
    for c in kb.get("consulting") or []:
        parts.append(f"CONSULTING: {c.get('name')}: {c.get('summary')}")
    for p in kb.get("projects") or []:
        parts.append(f"PROJECT: {p.get('name')} — {p.get('description')}")
    skills = kb.get("skills") or {}
    if isinstance(skills, dict):
        parts.append("SKILLS: " + "; ".join(f"{k}: {', '.join(v)}" for k, v in skills.items()))
    contact = kb.get("contact") or {}
    parts.append(f"CONTACT: {contact}")
    for f in kb.get("faqs") or []:
        parts.append(f"FAQ: {f.get('answer')}")
    return "\n".join(parts)

CONTEXT = context_blob(KB)

def gemini_answer(question: str) -> str | None:
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        return None
    try:
        import google.generativeai as genai

        genai.configure(api_key=key)
        model = genai.GenerativeModel(
            os.environ.get("GEMINI_MODEL", "gemini-2.0-flash"),
            system_instruction=SYSTEM,
        )
        prompt = f"CONTEXT:\n{CONTEXT}\n\nQUESTION: {question}"
        resp = model.generate_content(prompt)
        text = (getattr(resp, "text", None) or "").strip()
        return text or None
    except Exception as exc:  # noqa: BLE001
        print("gemini error", exc)
        return None

@app.get("/health")
@app.get("/status")
def status():
    return jsonify(
        {
            "status": "ready",
            "message": "Portfolio grounded chatbot ready",
            "gemini_configured": bool(os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")),
            "model": os.environ.get("GEMINI_MODEL", "gemini-2.0-flash"),
            "knowledge_base_loaded": True,
        }
    )

@app.post("/chat")
def chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or data.get("query") or "").strip()
    if not message:
        return jsonify({"status": "error", "message": "Empty message"}), 400

    api_text = gemini_answer(message)
    if api_text:
        return jsonify(
            {
                "status": "success",
                "response": api_text,
                "metadata": {
                    "gemini_enabled": True,
                    "knowledge_base_loaded": True,
                    "model": os.environ.get("GEMINI_MODEL", "gemini-2.0-flash"),
                    "grounded": True,
                },
                "timestamp": datetime.utcnow().isoformat(),
            }
        )

    # Deterministic fallback excerpt from FAQs / about
    lower = message.lower()
    for faq in KB.get("faqs") or []:
        keys = faq.get("keywords") or []
        if any(str(k).lower() in lower for k in keys):
            return jsonify(
                {
                    "status": "success",
                    "response": faq["answer"],
                    "metadata": {"gemini_enabled": False, "knowledge_base_loaded": True, "grounded": True},
                    "timestamp": datetime.utcnow().isoformat(),
                }
            )

    about = KB.get("about_ayush") or {}
    fallback = f"{about.get('name')} is {about.get('profession')}. {about.get('bio')}"
    return jsonify(
        {
            "status": "success",
            "response": fallback,
            "metadata": {"gemini_enabled": False, "knowledge_base_loaded": True, "grounded": True},
            "timestamp": datetime.utcnow().isoformat(),
        }
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "4010"))
    app.run(host="0.0.0.0", port=port, debug=False)
