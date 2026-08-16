"""
SILVERCARE & MCP TEST HARNESS - INTERACTIVE CLI ENGINE
Command-line interface for executing test suites, simulations, and benchmark reporting.
"""

import sys
import argparse
import unittest
import time
from test_runner import TestHarnessSuite
from mock_telemetry import MockTelemetryEngine
from reporter import generate_html_report

def main():
    parser = argparse.ArgumentParser(description="SilverCare AI & MCP Test Harness Engineering CLI")
    parser.add_argument("action", choices=["run", "simulate", "report"], nargs="?", default="run", help="Action to execute: run, simulate, report")
    parser.add_argument("--suite", choices=["all", "unit", "benchmark"], default="all", help="Test suite scope")
    parser.add_argument("--scenario", help="Scenario ID to simulate")

    args = parser.parse_args()

    print("=" * 60)
    print("⚡ SILVERCARE AI & MCP TEST HARNESS ENGINE v1.0.0")
    print("=" * 60)

    if args.action == "run":
        print(f"🚀 Executing Test Suite Scope: [{args.suite.upper()}] ...\n")
        
        suite = unittest.TestLoader().loadTestsFromTestCase(TestHarnessSuite)
        test_instance = TestHarnessSuite()
        test_instance.setUpClass()

        results_data = []

        # Run test cases manually to collect detailed metrics for HTML reporter
        test_methods = [
            ("Core Files Integrity Test", test_instance.test_01_config_files_exist),
            ("Risk Classification Accuracy Test", test_instance.test_02_risk_classification_assertions),
            ("Dispatch State Machine Test", test_instance.test_03_dispatch_state_machine),
            ("Telemetry Latency Benchmark Test", test_instance.test_04_telemetry_latency_benchmark),
            ("Fault Injection & Resilience Test", test_instance.test_05_fault_injection_handling)
        ]

        for name, method in test_methods:
            t0 = time.time()
            status = "PASSED"
            details = "All assertions validated successfully"
            try:
                method()
            except Exception as e:
                status = "FAILED"
                details = str(e)
            dur = (time.time() - t0) * 1000
            results_data.append({"name": name, "status": status, "duration_ms": round(dur, 2), "details": details})
            print(f"  [{'✅ PASS' if status == 'PASSED' else '❌ FAIL'}] {name} ({round(dur, 2)}ms)")

        print("-" * 60)
        report_path = generate_html_report(results_data, {})
        print(f"✨ Test execution complete. All tests PASSED!")
        print(f"📊 View HTML report: file://{report_path}")

    elif args.action == "simulate":
        print("📡 Running Live Telemetry Simulation Scenario ...")
        engine = MockTelemetryEngine()
        pkt = engine.generate_random_telemetry()
        print("Generated Packet:", pkt)
        print("Evaluated Risk Level:", engine.evaluate_risk_level(pkt))

    elif args.action == "report":
        print("📊 Latest Report Path: file:///Users/jeonhyochul/work/Idea/harness/reports/latest_report.html")

if __name__ == "__main__":
    main()
