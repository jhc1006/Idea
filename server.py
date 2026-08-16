import sys
import os
import json
import time
from http.server import SimpleHTTPRequestHandler
from socketserver import ThreadingTCPServer

# Add current dir to path to import harness
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from harness.mock_telemetry import MockTelemetryEngine

class CustomHandler(SimpleHTTPRequestHandler):
    # Initialize the engine once
    engine = MockTelemetryEngine(config_path="harness/config.json")

    def do_GET(self):
        if self.path == '/api/telemetry/stream':
            # Server-Sent Events (SSE) stream
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            print("📡 SSE telemetry stream client connected.")
            try:
                while True:
                    # Generate a random telemetry event
                    packet = self.engine.generate_random_telemetry()
                    # Evaluate the risk level (critical, warning, normal, caution)
                    evaluated_risk = self.engine.evaluate_risk_level(packet)
                    packet["evaluated_risk"] = evaluated_risk

                    # Send to client
                    data = json.dumps(packet, ensure_ascii=False)
                    self.wfile.write(f"data: {data}\n\n".encode('utf-8'))
                    self.wfile.flush()

                    # Wait 5 seconds
                    time.sleep(5)
            except (ConnectionResetError, BrokenPipeError):
                print("🔌 SSE client disconnected.")
            except Exception as e:
                print(f"❌ Error in SSE stream: {e}")
        elif self.path == '/api/telemetry/trigger':
            # Manual trigger endpoint
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            packet = self.engine.generate_random_telemetry()
            evaluated_risk = self.engine.evaluate_risk_level(packet)
            packet["evaluated_risk"] = evaluated_risk

            self.wfile.write(json.dumps(packet, ensure_ascii=False).encode('utf-8'))
        else:
            # Serve static files normally
            super().do_GET()

class ThreadedHTTPServer(ThreadingTCPServer):
    allow_reuse_address = True

def run(port=8085):
    server_address = ('', port)
    httpd = ThreadedHTTPServer(server_address, CustomHandler)
    print(f"⚡ SilverCare AI Full-Stack Server running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    run()
