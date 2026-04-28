#!/usr/bin/env python3
"""Delegate tasks to OpenFang agents via WebSocket."""

import argparse
import asyncio
import json
import sys
import time
import websockets

OPENFANG_WS = "ws://localhost:50051"


async def delegate_to_agent(agent_id, task, timeout=120):
    uri = f"{OPENFANG_WS}/api/agents/{agent_id}/ws"
    
    async with websockets.connect(uri, ping_interval=30, ping_timeout=15) as ws:
        resp = await asyncio.wait_for(ws.recv(), timeout=5)
        data = json.loads(resp)
        if data.get("type") != "connected":
            print(f"Unexpected init: {data}", file=sys.stderr)
            return None
        
        await ws.send(json.dumps({"type": "message", "content": task}))
        
        deltas = []
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            try:
                resp = await asyncio.wait_for(ws.recv(), timeout=20)
                data = json.loads(resp)
                msg_type = data.get("type")
                
                if msg_type == "text_delta":
                    deltas.append(data.get("content", ""))
                elif msg_type == "response":
                    # Final response
                    return data.get("content", "".join(deltas))
                elif msg_type == "error":
                    print(f"Agent error: {data}", file=sys.stderr)
                    return None
                elif msg_type == "typing":
                    print("Agent is typing...", file=sys.stderr)
                    
            except asyncio.TimeoutError:
                # If we have deltas, return them
                if deltas:
                    return "".join(deltas)
                continue
        
        # Timeout fallback
        return "".join(deltas) if deltas else None


async def delegate_to_hand(hand_id, task, timeout=120):
    import urllib.request
    
    req = urllib.request.Request(
        f"http://localhost:50051/api/hands/{hand_id}/activate",
        method="POST", headers={"Content-Type": "application/json"}, data=b"{}"
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            pass
    except Exception as e:
        print(f"Hand activation warning: {e}", file=sys.stderr)
    
    req = urllib.request.Request(f"http://localhost:50051/api/hands/{hand_id}")
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            agent_id = data.get("agent_id")
            if not agent_id:
                return None
    except Exception as e:
        print(f"Failed to get hand info: {e}", file=sys.stderr)
        return None
    
    return await delegate_to_agent(agent_id, task, timeout)


def main():
    parser = argparse.ArgumentParser(description="Delegate tasks to OpenFang")
    parser.add_argument("--agent", help="Agent ID or name")
    parser.add_argument("--hand", help="Hand ID (e.g. researcher, browser)")
    parser.add_argument("--task", help="Task description")
    parser.add_argument("--task-file", help="File containing task description")
    parser.add_argument("--timeout", type=int, default=120)
    parser.add_argument("--output", help="Output file (default: stdout)")
    
    args = parser.parse_args()
    
    if not args.agent and not args.hand:
        print("Error: --agent or --hand required", file=sys.stderr)
        sys.exit(1)
    
    if args.task:
        task = args.task
    elif args.task_file:
        with open(args.task_file, "r") as f:
            task = f.read()
    else:
        print("Error: --task or --task-file required", file=sys.stderr)
        sys.exit(1)
    
    agent_id = args.agent
    if args.agent and len(args.agent) < 20:
        import urllib.request
        try:
            req = urllib.request.Request("http://localhost:50051/api/agents")
            with urllib.request.urlopen(req, timeout=5) as resp:
                agents = json.loads(resp.read().decode())
                for a in agents:
                    if a.get("name") == args.agent:
                        agent_id = a.get("id")
                        break
        except Exception:
            pass
    
    if args.hand:
        result = asyncio.run(delegate_to_hand(args.hand, task, args.timeout))
    else:
        result = asyncio.run(delegate_to_agent(agent_id, task, args.timeout))
    
    if result:
        if args.output:
            with open(args.output, "w") as f:
                f.write(result)
            print(f"Result written to {args.output}")
        else:
            print(result)
    else:
        print("No response from agent", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
