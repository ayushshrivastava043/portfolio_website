#!/usr/bin/env python3
"""
Development server with no-cache headers to prevent browser caching issues.
Run with: python3 dev/server.py
"""

import http.server
import socketserver
import os
import sys

PORT = 8001

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add no-cache headers to prevent browser caching
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging to show cache-busting is active
        print(f"[NO-CACHE SERVER] {format % args}")

if __name__ == "__main__":
    # Change to the parent directory (website root)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)
    os.chdir(parent_dir)
    
    print(f"🚀 NO-CACHE DEVELOPMENT SERVER")
    print(f"📍 Serving at http://localhost:{PORT}")
    print(f"🔄 All responses include no-cache headers")
    print(f"📁 Working directory: {os.getcwd()}")
    print(f"⏹️  Press Ctrl+C to stop")
    print("-" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Please stop other servers first.")
            print("Try: pkill -f 'python3.*8001'")
        else:
            print(f"❌ Server error: {e}")
        sys.exit(1) 