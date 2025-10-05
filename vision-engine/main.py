# vision-engine/main.py
import asyncio
import websockets
import json

async def handler(websocket):
    print("Frontend connected!")
    elixir = 0
    try:
        while True:
            elixir = (elixir + 1) % 11  # Count from 0 to 10

            mock_data = {
                "status": "MATCH_IN_PROGRESS",
                "opponent": {"name": "Test Player", "trophies": 5000},
                "live_stats": {
                    "opponent_elixir": elixir,
                    "opponent_cycle": ["knight", "archers", "arrows", "giant"],
                    "opponent_next_cards": ["minions", "musketeer", "fireball", "barbarians"]
                },
                "events": []
            }

            await websocket.send(json.dumps(mock_data))
            print(f"Sent mock elixir count: {elixir}")
            await asyncio.sleep(2)
    except websockets.ConnectionClosed:
        print("Frontend disconnected.")

async def main():
    print("Starting WebSocket server on ws://localhost:8765")
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())