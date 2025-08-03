#!/usr/bin/env python3
"""
Simple HTTP server for PC Organization Configuration UI
Handles loading, saving, and running the organization script
"""

import json
import os
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

class PCConfigHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve static files
        if self.path == '/':
            self.path = '/pc_config_ui.html'
        return SimpleHTTPRequestHandler.do_GET(self)
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        if self.path == '/save_config':
            self.save_config(post_data)
        elif self.path == '/run_organization':
            self.run_organization()
        else:
            self.send_error(404, "Endpoint not found")
    
    def save_config(self, post_data):
        try:
            config = json.loads(post_data.decode('utf-8'))
            
            # Save to pc_organization_config.json
            with open('pc_organization_config.json', 'w') as f:
                json.dump(config, f, indent=2)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success'}).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode())
    
    def run_organization(self):
        try:
            # Run the organization script
            result = subprocess.run(['./organize_pc_enhanced.sh'], 
                                  capture_output=True, text=True, cwd=os.getcwd())
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            response = {
                'status': 'success' if result.returncode == 0 else 'error',
                'output': result.stdout,
                'error': result.stderr
            }
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode())

def main():
    port = 8030
    print(f"🚀 Starting PC Organization Config Server on port {port}")
    print(f"📱 Open your browser and go to: http://localhost:{port}")
    print("🛑 Press Ctrl+C to stop the server")
    
    server = HTTPServer(('localhost', port), PCConfigHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        server.server_close()

if __name__ == '__main__':
    main() 