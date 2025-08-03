import asyncio
import websockets
import http.server
import socketservera
import json
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('server.log')
    ]
)

# WebSocket clients set
CLIENTS = set()

# WebSocket handler
async def handle_websocket(websocket, path):
    try:
        CLIENTS.add(websocket)
        logging.info(f"New client connected. Total clients: {len(CLIENTS)}")
        
        async for message in websocket:
            try:
                data = json.loads(message)
                response = {
                    "timestamp": datetime.now().isoformat(),
                    "message": data.get("message", ""),
                    "type": "response"
                }
                await websocket.send(json.dumps(response))
                logging.info(f"Message processed: {data.get('message', '')}")
            except json.JSONDecodeError:
                logging.error("Invalid JSON received")
            
    except websockets.exceptions.ConnectionClosed:
        logging.info("Client connection closed")
    finally:
        CLIENTS.remove(websocket)
        logging.info(f"Client disconnected. Total clients: {len(CLIENTS)}")

# HTTP request handler
class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)
    
    def log_message(self, format, *args):
        logging.info(f"{self.client_address[0]} - - {format%args}")

def run_http_server():
    port = 8080
    handler = RequestHandler
    
    while True:
        try:
            with socketserver.TCPServer(("", port), handler) as httpd:
                logging.info(f"HTTP Server started at http://localhost:{port}")
                httpd.serve_forever()
        except OSError as e:
            if e.errno == 48:  # Address already in use
                port += 1
                continue
            raise
        break

async def run_websocket_server():
    port = 8001
    while True:
        try:
            async with websockets.serve(handle_websocket, "localhost", port):
                logging.info(f"WebSocket Server started at ws://localhost:{port}")
                await asyncio.Future()  # run forever
        except OSError as e:
            if e.errno == 48:  # Address already in use
                port += 1
                continue
            raise
        break

async def main():
    # Start HTTP server in a separate thread
    http_thread = threading.Thread(target=run_http_server)
    http_thread.daemon = True
    http_thread.start()
    
    # Run WebSocket server in the main thread
    await run_websocket_server()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logging.info("Server shutting down...")
    except Exception as e:
        logging.error(f"Error: {str(e)}") 