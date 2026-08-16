"""
SILVERCARE & MCP TEST HARNESS - HTML REPORT GENERATOR
Generates interactive, visual test execution reports.
"""

import os
import json
from datetime import datetime

def generate_html_report(results, summary_metrics, output_path="harness/reports/latest_report.html"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    passed_count = sum(1 for r in results if r['status'] == 'PASSED')
    failed_count = len(results) - passed_count
    pass_rate = round((passed_count / len(results)) * 100, 1) if results else 0

    html_content = f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Harness Execution Report | SilverCare AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@700;800&family=Fira+Code:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    :root {{
      --bg: #060913;
      --card-bg: #0f172a;
      --border: rgba(255, 255, 255, 0.1);
      --cyan: #38bdf8;
      --green: #34d399;
      --red: #ef4444;
      --text: #f8fafc;
      --muted: #94a3b8;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{ font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); padding: 40px 24px; line-height: 1.5; }}
    .container {{ max-width: 960px; margin: 0 auto; }}
    .header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }}
    .brand {{ font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; }}
    .brand span {{ color: var(--cyan); }}
    .timestamp {{ font-family: 'Fira Code', monospace; font-size: 0.85rem; color: var(--muted); }}

    .summary-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }}
    .stat-card {{ background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 20px; text-align: center; }}
    .stat-num {{ font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800; margin-top: 4px; }}
    .pass-rate {{ color: var(--green); }}

    .section-title {{ font-family: 'Outfit', sans-serif; font-size: 1.3rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }}

    .results-table {{ width: 100%; border-collapse: collapse; background: var(--card-bg); border-radius: 14px; overflow: hidden; border: 1px solid var(--border); }}
    .results-table th, .results-table td {{ padding: 14px 20px; text-align: left; border-bottom: 1px solid var(--border); font-size: 0.95rem; }}
    .results-table th {{ background: rgba(255, 255, 255, 0.04); font-size: 0.85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }}
    .badge {{ display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; font-family: 'Fira Code', monospace; }}
    .badge-pass {{ background: rgba(52, 211, 153, 0.15); color: var(--green); border: 1px solid rgba(52, 211, 153, 0.3); }}
    .badge-fail {{ background: rgba(239, 68, 68, 0.15); color: var(--red); border: 1px solid rgba(239, 68, 68, 0.3); }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand"><i class="fa-solid fa-vial-circle-check"></i> SilverCare <span>Harness Report</span></div>
      <div class="timestamp">Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</div>
    </div>

    <div class="summary-grid">
      <div class="stat-card">
        <div style="font-size:0.8rem; color:var(--muted)">TOTAL TESTS</div>
        <div class="stat-num">{len(results)}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:0.8rem; color:var(--muted)">PASSED</div>
        <div class="stat-num" style="color:var(--green)">{passed_count}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:0.8rem; color:var(--muted)">FAILED</div>
        <div class="stat-num" style="color:var(--red)">{failed_count}</div>
      </div>
      <div class="stat-card">
        <div style="font-size:0.8rem; color:var(--muted)">PASS RATE</div>
        <div class="stat-num pass-rate">{pass_rate}%</div>
      </div>
    </div>

    <h2 class="section-title"><i class="fa-solid fa-list-check" style="color:var(--cyan)"></i> Test Suite Assertions</h2>
    <table class="results-table">
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Status</th>
          <th>Duration</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {"".join(f'''
        <tr>
          <td><strong>{r["name"]}</strong></td>
          <td><span class="badge badge-{"pass" if r["status"] == "PASSED" else "fail"}">{r["status"]}</span></td>
          <td style="font-family:'Fira Code', monospace">{r["duration_ms"]} ms</td>
          <td style="color:var(--muted)">{r["details"]}</td>
        </tr>
        ''' for r in results)}
      </tbody>
    </table>
  </div>
</body>
</html>
"""
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"📊 HTML Test Report generated: {output_path}")
    return output_path
