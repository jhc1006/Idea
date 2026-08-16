"""
SILVERCARE & MCP TEST HARNESS - MOCK TELEMETRY ENGINE
Generates synthetic IoT sensor payloads, simulates fault injections, and benchmarks system latency.
"""

import time
import random
import json
from datetime import datetime

class MockTelemetryEngine:
    def __init__(self, config_path="harness/config.json"):
        with open(config_path, "r", encoding="utf-8") as f:
            self.config = json.load(f)
        self.scenarios = self.config.get("test_scenarios", [])

    def generate_random_telemetry(self, senior_id="sn-101"):
        """Generates a random sensor telemetry packet with timestamp."""
        devices = ["motionSensor", "smartPillbox", "aiCall", "emergencyButton"]
        chosen_device = random.choice(devices)

        states = {
            "motionSensor": ["active", "offline"],
            "smartPillbox": ["done", "missed"],
            "aiCall": ["answered", "unanswered", "warning_keyword"],
            "emergencyButton": ["idle", "triggered"]
        }

        packet = {
            "seniorId": senior_id,
            "timestamp": datetime.now().isoformat(),
            "device": chosen_device,
            "state": random.choice(states[chosen_device]),
            "latencyMs": round(random.uniform(10.0, 120.0), 2)
        }
        return packet

    def evaluate_risk_level(self, telemetry_packet):
        """Pure classification logic for assertion testing."""
        dev = telemetry_packet.get("device")
        state = telemetry_packet.get("state")

        if dev == "emergencyButton" and state == "triggered":
            return "critical"
        elif dev == "motionSensor" and state == "offline":
            return "critical"
        elif dev == "aiCall" and state == "warning_keyword":
            return "warning"
        elif dev == "smartPillbox" and state == "missed":
            return "warning"
        else:
            return "normal"

    def inject_fault(self, packet, fault_type="delay"):
        """Injects artificial faults to test system resilience."""
        corrupted = packet.copy()
        if fault_type == "delay":
            time.sleep(0.3)
            corrupted["latencyMs"] += 300
        elif fault_type == "corrupt_payload":
            corrupted["state"] = "INVALID_STATE_PAYLOAD"
        elif fault_type == "missing_id":
            corrupted["seniorId"] = None
        return corrupted

if __name__ == "__main__":
    engine = MockTelemetryEngine()
    print("⚡ Mock Telemetry Engine Initialized.")
    sample = engine.generate_random_telemetry()
    print("Sample Packet:", json.dumps(sample, indent=2, ensure_ascii=False))
    print("Evaluated Risk:", engine.evaluate_risk_level(sample))
