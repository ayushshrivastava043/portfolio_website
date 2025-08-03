import asyncio
import websockets
import json
import random
import time
from datetime import datetime

# Store connected clients
connected = set()

# Sample data for generating realistic updates
ACTIONS = [
    "New lead generated",
    "Sales call completed",
    "Meeting scheduled",
    "Contract signed",
    "Follow-up email sent",
    "Product demo completed",
    "Quote sent",
    "Payment received"
]

COMPANIES = [
    "TechCorp Inc.",
    "Global Solutions Ltd.",
    "InnovatePro",
    "DataSmart Systems",
    "FutureTech Industries",
    "CloudScale Solutions",
    "Digital Dynamics",
    "SmartServe Technologies"
]

AMOUNTS = [5000, 10000, 15000, 25000, 50000, 75000, 100000]

async def register(websocket):
    # Add client to the set of connected clients
    connected.add(websocket)
    try:
        # Keep the connection alive and send updates
        while True:
            # Generate realistic update
            action = random.choice(ACTIONS)
            company = random.choice(COMPANIES)
            amount = random.choice(AMOUNTS)
            
            if "Payment" in action or "Contract" in action:
                message = f"{action} - {company} (${amount:,})"
                type = "success"
            elif "Meeting" in action or "Demo" in action:
                message = f"{action} with {company}"
                type = "info"
            elif "Quote" in action or "Follow-up" in action:
                message = f"{action} to {company}"
                type = "warning"
            else:
                message = f"{action} from {company}"
                type = "alert"
            
            update = {
                'type': type,
                'message': message,
                'timestamp': datetime.now().strftime("%H:%M:%S"),
                'value': amount
            }
            
            # Send update to the client
            await websocket.send(json.dumps(update))
            
            # Wait for 2 seconds before next update
            await asyncio.sleep(2)
            
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        # Remove client when disconnected
        connected.remove(websocket)

async def main():
    print("WebSocket server starting...")
    try:
        async with websockets.serve(register, "localhost", 8001):
            print("WebSocket server is running on ws://localhost:8001")
            await asyncio.Future()  # run forever
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print("Error: Port 8001 is already in use. Please kill any existing processes using this port.")
        else:
            print(f"Error starting WebSocket server: {e}")

if __name__ == "__main__":
    asyncio.run(main()) 