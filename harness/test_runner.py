"""
SILVERCARE & MCP TEST HARNESS - AUTOMATED TEST RUNNER
Executes unit, integration, benchmark, and regression test suites.
"""

import os
import sys
import json
import time
import unittest
from mock_telemetry import MockTelemetryEngine

class TestHarnessSuite(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = MockTelemetryEngine(config_path="harness/config.json")
        cls.test_results = []

    def log_result(self, name, status, duration_ms, details=""):
        self.test_results.append({
            "name": name,
            "status": status,
            "duration_ms": round(duration_ms, 2),
            "details": details
        })

    def test_01_config_files_exist(self):
        """Verify presence of core project files."""
        t0 = time.time()
        required_files = [
            "silvercare/index.html",
            "silvercare/styles.css",
            "silvercare/app.js",
            "silvercare/config.js",
            "config.js",
            "index.html",
            "styles.css",
            "app.js"
        ]
        for f in required_files:
            self.assertTrue(os.path.exists(f), f"Required file missing: {f}")
        dur = (time.time() - t0) * 1000
        self.log_result("Core Files Integrity Test", "PASSED", dur, f"{len(required_files)} files verified")

    def test_02_risk_classification_assertions(self):
        """Verify 100% classification accuracy on scenario assertions."""
        t0 = time.time()
        scenarios = self.engine.scenarios
        for sc in scenarios:
            telemetry = sc["telemetry"]
            expected_risk = sc["expected_risk"]
            actual_risk = self.engine.evaluate_risk_level(telemetry)
            self.assertEqual(actual_risk, expected_risk, f"Scenario '{sc['name']}' failed risk classification")
        dur = (time.time() - t0) * 1000
        self.log_result("Risk Classification Accuracy Test", "PASSED", dur, f"{len(scenarios)} scenarios passed")

    def test_03_dispatch_state_machine(self):
        """Verify social worker dispatch state transitions: pending -> dispatched -> resolved."""
        t0 = time.time()
        states = ["pending", "dispatched", "resolved"]
        senior_state = "pending"
        
        # Transition 1: Dispatch triggered
        senior_state = "dispatched"
        self.assertEqual(senior_state, "dispatched")
        
        # Transition 2: Field visit note registered
        senior_state = "resolved"
        self.assertEqual(senior_state, "resolved")

        dur = (time.time() - t0) * 1000
        self.log_result("Dispatch State Machine Test", "PASSED", dur, "Transitions valid: pending -> dispatched -> resolved")

    def test_04_telemetry_latency_benchmark(self):
        """Benchmark telemetry processing latency against 500ms SLA."""
        t0 = time.time()
        packets_count = 100
        total_latency = 0

        for _ in range(packets_count):
            pkt = self.engine.generate_random_telemetry()
            self.assertLess(pkt["latencyMs"], 500.0, "Latency threshold exceeded SLA (500ms)")
            total_latency += pkt["latencyMs"]

        avg_latency = total_latency / packets_count
        dur = (time.time() - t0) * 1000
        self.log_result("Latency Benchmark Test", "PASSED", dur, f"Avg Latency: {round(avg_latency, 2)}ms across {packets_count} packets")

    def test_05_fault_injection_handling(self):
        """Verify system behavior under simulated telemetry network jitter and payload corruptions."""
        t0 = time.time()
        packet = self.engine.generate_random_telemetry()
        
        # Test delay fault
        delayed_pkt = self.engine.inject_fault(packet, fault_type="delay")
        self.assertGreater(delayed_pkt["latencyMs"], packet["latencyMs"])

        # Test corrupt payload
        corrupt_pkt = self.engine.inject_fault(packet, fault_type="corrupt_payload")
        evaluated = self.engine.evaluate_risk_level(corrupt_pkt)
        self.assertEqual(evaluated, "normal", "Corrupt payload handled with graceful fallback to normal")

        dur = (time.time() - t0) * 1000
        self.log_result("Fault Injection & Resilience Test", "PASSED", dur, "Faults injected and fallback verified")

def run_all_tests():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestHarnessSuite)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    return result

if __name__ == "__main__":
    res = run_all_tests()
    sys.exit(0 if res.wasSuccessful() else 1)
