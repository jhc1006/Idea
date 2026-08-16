/**
 * SILVERCARE CONTROL CENTER
 * Real-time Telemetry Monitoring & Social Worker Linkage Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.SILVER_CARE_CONFIG;
  if (!config) {
    console.error('SilverCare dataset configuration missing!');
    return;
  }

  let seniorsData = [...config.seniors];
  let eventsData = [...config.recentEvents];
  let currentFilter = 'all';
  let activeTargetSeniorId = null;

  // 1. INITIALIZE HEADER & CLOCK
  initHeaderStats(config.centerInfo, seniorsData);
  startLiveClock();

  // 2. RENDER SENIORS GRID & FILTERS
  renderSeniorsCards(seniorsData, currentFilter);
  setupFilters(seniorsData);

  // 3. RENDER SIDEBAR (EVENTS & WORKERS)
  renderEventStream(eventsData);
  renderWorkersList(config.welfareWorkers);

  // 4. SETUP SIMULATOR
  setupSensorSimulator(seniorsData, eventsData);

  // 5. SETUP MODAL HANDLERS
  setupDispatchModal(seniorsData);

  // 6. SETUP SSE TELEMETRY STREAM
  setupTelemetryStream(seniorsData, eventsData);
});

/* ==========================================
   1. HEADER STATS & CLOCK
   ========================================== */
function initHeaderStats(centerInfo, seniors) {
  document.getElementById('center-name').textContent = centerInfo.name;
  document.getElementById('stat-total-monitored').textContent = `${centerInfo.activeMonitoredCount}명`;
  document.getElementById('stat-workers-count').textContent = `${centerInfo.onDutyWorkers}명`;
  document.getElementById('stat-today-dispatches').textContent = `${centerInfo.todayDispatches}건`;

  updateCriticalCount(seniors);
}

function updateCriticalCount(seniors) {
  const criticalCount = seniors.filter(s => s.riskLevel === 'critical').length;
  document.getElementById('stat-critical-count').textContent = `${criticalCount}건`;
  
  const banner = document.getElementById('emergency-banner');
  if (criticalCount > 0) {
    banner.style.display = 'block';
    const firstCritical = seniors.find(s => s.riskLevel === 'critical');
    if (firstCritical) {
      document.getElementById('banner-title').textContent = `🚨 긴급 상황 발생: ${firstCritical.name} (${firstCritical.zone})`;
      document.getElementById('banner-desc').textContent = `${firstCritical.lastTelemetry} — 담당 복지사(${firstCritical.workerName}) 긴급 출동 요망`;
    }
  } else {
    banner.style.display = 'none';
  }
}

function startLiveClock() {
  const clockEl = document.getElementById('live-clock');
  setInterval(() => {
    const now = new Date();
    clockEl.textContent = now.toTimeString().split(' ')[0];
  }, 1000);
}

/* ==========================================
   2. SENIOR CARDS & FILTERING
   ========================================== */
function renderSeniorsCards(seniors, filter) {
  const container = document.getElementById('seniors-cards-container');
  const visibleCountEl = document.getElementById('visible-count');

  const filtered = filter === 'all' 
    ? seniors 
    : seniors.filter(s => s.riskLevel === filter);

  visibleCountEl.textContent = `${filtered.length}명 표시 중`;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align:center; color:var(--text-muted);">해당 조건의 어르신이 없습니다.</div>`;
    return;
  }

  container.innerHTML = filtered.map(senior => `
    <div class="senior-card glass-box ${senior.riskLevel === 'critical' ? 'card-critical' : ''}" id="${senior.id}">
      <div class="card-header-box">
        <div>
          <h3 class="senior-name">${senior.name}</h3>
          <span class="senior-zone"><i class="fa-solid fa-location-dot"></i> ${senior.zone}</span>
        </div>
        <span class="risk-badge badge-${senior.riskLevel}">${senior.riskLabel}</span>
      </div>

      <div class="telemetry-summary">
        <div class="summary-text"><i class="fa-solid fa-triangle-exclamation"></i> ${senior.lastTelemetry}</div>
        <div class="summary-time"><i class="fa-solid fa-clock"></i> 감지 시각: ${senior.lastTelemetryTime}</div>
      </div>

      <div class="devices-status-grid">
        <div class="dev-pill ${senior.devices.motionSensor === 'offline' ? 'dev-alert' : 'dev-ok'}">
          <i class="fa-solid fa-person-walking"></i>
          <span>${senior.devices.motionSensor === 'offline' ? '미감지' : '정상'}</span>
        </div>
        <div class="dev-pill ${senior.devices.smartPillbox === 'missed' ? 'dev-warn' : 'dev-ok'}">
          <i class="fa-solid fa-pills"></i>
          <span>${senior.devices.smartPillbox === 'missed' ? '미복용' : '완료'}</span>
        </div>
        <div class="dev-pill ${senior.devices.aiCall === 'warning_keyword' || senior.devices.aiCall === 'unanswered' ? 'dev-warn' : 'dev-ok'}">
          <i class="fa-solid fa-robot"></i>
          <span>${senior.devices.aiCall === 'unanswered' ? '부재중' : '응답'}</span>
        </div>
        <div class="dev-pill ${senior.devices.emergencyButton === 'triggered' ? 'dev-alert' : 'dev-ok'}">
          <i class="fa-solid fa-bell"></i>
          <span>${senior.devices.emergencyButton === 'triggered' ? 'SOS 작동' : '정상'}</span>
        </div>
      </div>

      <div class="worker-linkage-info">
        <span><i class="fa-solid fa-user-nurse"></i> ${senior.workerName}</span>
        <span style="color:var(--text-muted);">${senior.guardianPhone}</span>
      </div>

      <div class="card-actions-group">
        <button class="action-btn btn-dispatch" onclick="openDispatchModal('${senior.id}')">
          <i class="fa-solid fa-truck-medical"></i> ${senior.dispatchStatus === 'dispatched' ? '출동 진행 중' : '출동/조치 지시'}
        </button>
        <button class="action-btn btn-call" onclick="makeDirectCall('${senior.name}', '${senior.guardianPhone}')">
          <i class="fa-solid fa-phone"></i> 상태 확인
        </button>
      </div>
    </div>
  `).join('');
}

function setupFilters(seniors) {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-risk');
      renderSeniorsCards(seniors, filter);
    });
  });
}

window.scrollToSenior = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.outline = '2px solid var(--color-cyan)';
    setTimeout(() => el.style.outline = 'none', 2000);
  }
};

/* ==========================================
   3. SIDEBAR TELEMETRY STREAM & WORKERS
   ========================================== */
function renderEventStream(events) {
  const streamContainer = document.getElementById('event-stream-container');
  streamContainer.innerHTML = events.map(evt => `
    <div class="log-item ${evt.type}">
      <div class="log-time">[${evt.time}]</div>
      <div>${evt.message}</div>
    </div>
  `).join('');
}

function renderWorkersList(workers) {
  const listContainer = document.getElementById('workers-list-container');
  listContainer.innerHTML = workers.map(w => `
    <div class="worker-item">
      <div>
        <div class="worker-name">${w.name}</div>
        <div class="worker-zone">${w.zone}</div>
      </div>
      <div>
        <span class="count-chip" style="color:var(--color-cyan);">${w.activeCases}건 담당</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   4. AI SENSOR SIMULATOR
   ========================================== */
function setupSensorSimulator(seniors, events) {
  const simBtn = document.getElementById('sim-trigger-btn');

  const simScenarios = [
    {
      seniorId: "sn-103",
      name: "이옥분 어르신",
      newRisk: "critical",
      newLabel: "🚨 긴급 (AI 스피커 호통/통증 감지)",
      telemetry: "AI 스피커 호흡 이상 및 '가슴이 아프다' 비명 감지",
      logMsg: "[이옥분 어르신] AI 스피커 응급 통증 키워드 감지 (상암동 89-2)"
    },
    {
      seniorId: "sn-104",
      name: "정동철 어르신",
      newRisk: "critical",
      newLabel: "🚨 긴급 (스마트 약통 3회 연속 미개봉)",
      telemetry: "스마트 약통 저녁약 미복용 + 현관 센서 무반응",
      logMsg: "[정동철 어르신] 24시간 복약 연속 미이행 위험 경보 발령"
    }
  ];

  simBtn.addEventListener('click', () => {
    const sc = simScenarios[Math.floor(Math.random() * simScenarios.length)];
    const target = seniors.find(s => s.id === sc.seniorId);

    if (target) {
      target.riskLevel = sc.newRisk;
      target.riskLabel = sc.newLabel;
      target.lastTelemetry = sc.telemetry;
      target.lastTelemetryTime = "방금 전 (" + new Date().toTimeString().split(' ')[0].substring(0,5) + ")";
      target.devices.emergencyButton = "triggered";

      const nowStr = new Date().toTimeString().split(' ')[0];
      events.unshift({ time: nowStr, type: "critical", message: sc.logMsg });

      updateCriticalCount(seniors);
      renderSeniorsCards(seniors, 'all');
      renderEventStream(events);

      showToast(`⚡ [AI 텔레메트리 경보] ${sc.logMsg}`);
    }
  });
}

/* ==========================================
   5. DISPATCH & FIELD REPORT MODAL
   ========================================== */
function setupDispatchModal(seniors) {
  const modal = document.getElementById('dispatch-modal');
  const form = document.getElementById('dispatch-form');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');

  window.openDispatchModal = function(seniorId) {
    activeTargetSeniorId = seniorId;
    const senior = seniors.find(s => s.id === seniorId);
    if (!senior) return;

    document.getElementById('modal-title').textContent = `🚨 ${senior.name} 조치 서식 작성`;
    document.getElementById('modal-senior-info').textContent = `어르신: ${senior.name} | ${senior.zone} | 특이사항: ${senior.medicalConditions}`;
    document.getElementById('modal-field-note').value = `${senior.lastTelemetry} 감지 건으로 현장 방문 조치 실시.`;

    modal.classList.add('active');
  };

  function closeModal() {
    modal.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const senior = seniors.find(s => s.id === activeTargetSeniorId);
    const newStatus = document.getElementById('modal-status-select').value;
    const note = document.getElementById('modal-field-note').value;

    if (senior) {
      if (newStatus === 'resolved') {
        senior.riskLevel = 'normal';
        senior.riskLabel = '✅ 정상 (조치 완료)';
        senior.dispatchStatus = 'resolved';
        senior.lastTelemetry = `[조치 완료] ${note.substring(0, 30)}...`;
      } else {
        senior.dispatchStatus = 'dispatched';
      }

      updateCriticalCount(seniors);
      renderSeniorsCards(seniors, 'all');

      showToast(`📱 ${senior.name} 어르신 현장 조치 상태가 '${newStatus === 'resolved' ? '완료' : '출동중'}'(으)로 갱신되었습니다.`);
    }

    closeModal();
  });
}

window.makeDirectCall = function(name, phone) {
  showToast(`📞 ${name} 어르신 / 보호자(${phone})로 통화를 연결합니다...`);
};

function showToast(msg) {
  const area = document.getElementById('toast-area');
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--color-cyan);"></i> ${msg}`;
  area.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================
   6. SSE TELEMETRY STREAM INTEGRATION
   ========================================== */
function getTelemetryTextAndLabel(device, state) {
  let riskLevel = 'normal';
  let riskLabel = '✅ 정상 (일상 활동 양호)';
  let telemetry = '센서 활동 양호';

  if (device === 'emergencyButton' && state === 'triggered') {
    riskLevel = 'critical';
    riskLabel = '🚨 긴급 (SOS 비상버튼 작동)';
    telemetry = '거실 벽면 SOS 비상 버튼 눌림';
  } else if (device === 'motionSensor' && state === 'offline') {
    riskLevel = 'critical';
    riskLabel = '🚨 긴급 (24시간 미활동)';
    telemetry = '24시간 동안 움직임 센서 감지 없음';
  } else if (device === 'aiCall' && state === 'warning_keyword') {
    riskLevel = 'warning';
    riskLabel = "⚠️ 경고 (AI 콜 '어지럼증' 언급)";
    telemetry = "오전 AI 통화 중 '어지러워서 누워있다' 발화 인지";
  } else if (device === 'smartPillbox' && state === 'missed') {
    riskLevel = 'warning';
    riskLabel = '⚠️ 경고 (2회 연속 약 미복용)';
    telemetry = '스마트 약통 8시/12시 미개봉';
  } else if (device === 'smartPillbox' && state === 'done') {
    riskLevel = 'normal';
    riskLabel = '✅ 정상 (복약 완료)';
    telemetry = '점심 약 복용 스마트약통 감지 완료';
  } else if (device === 'motionSensor' && state === 'active') {
    riskLevel = 'normal';
    riskLabel = '✅ 정상 (일상 활동 양호)';
    telemetry = '거실/주방 활동성 정상';
  } else if (device === 'aiCall' && state === 'answered') {
    riskLevel = 'normal';
    riskLabel = '✅ 정상 (일상 활동 양호)';
    telemetry = 'AI 스피커 정상 통화 완료';
  }

  return { riskLevel, riskLabel, telemetry };
}

function setupTelemetryStream(seniors, events) {
  console.log("Connecting to telemetry stream...");
  const eventSource = new EventSource('/api/telemetry/stream');

  eventSource.onmessage = (event) => {
    try {
      const packet = JSON.parse(event.data);
      console.log("Received telemetry packet:", packet);

      const target = seniors.find(s => s.id === packet.seniorId);
      if (target) {
        // Update device status
        if (target.devices) {
          target.devices[packet.device] = packet.state;
        }

        // Get labels
        const mapped = getTelemetryTextAndLabel(packet.device, packet.state);
        
        target.riskLevel = mapped.riskLevel;
        target.riskLabel = mapped.riskLabel;
        target.lastTelemetry = mapped.telemetry;
        
        const timestamp = new Date(packet.timestamp);
        const timeStr = timestamp.toTimeString().split(' ')[0].substring(0, 5);
        target.lastTelemetryTime = `방금 전 (${timeStr})`;

        // Prepend event
        const nowStr = timestamp.toTimeString().split(' ')[0];
        const logMsg = `[${target.name}] ${mapped.telemetry} (지연: ${packet.latencyMs}ms)`;
        
        events.unshift({
          time: nowStr,
          type: mapped.riskLevel,
          message: logMsg
        });

        // Keep last 15 events
        if (events.length > 15) {
          events.pop();
        }

        // Update UI
        updateCriticalCount(seniors);
        renderSeniorsCards(seniors, 'all');
        renderEventStream(events);

        // Toast notification for critical or warning
        if (mapped.riskLevel === 'critical' || mapped.riskLevel === 'warning') {
          showToast(`📡 [실시간 텔레메트리] ${target.name} 어르신 ${mapped.riskLevel === 'critical' ? '🚨 긴급 상황' : '⚠️ 경고 상황'} 감지!`);
        }
      }
    } catch (e) {
      console.error("Error processing telemetry message:", e);
    }
  };

  eventSource.onerror = (err) => {
    console.warn("Telemetry stream disconnected or encountered an error. Reconnecting...");
  };
}
