#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If requesting root, serve index.html
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

# Change to the directory containing the files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 Server running at http://localhost:{PORT}/")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"📄 Main file: {os.path.join(os.getcwd(), 'index.html')}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever() 