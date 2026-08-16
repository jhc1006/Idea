window.SILVER_CARE_CONFIG = {
  centerInfo: {
    name: "서울시 마포구 독거노인 통합 관제 센터",
    activeMonitoredCount: 148,
    onDutyWorkers: 12,
    todayDispatches: 7
  },

  welfareWorkers: [
    { id: "worker-1", name: "김민수 사회복지사", phone: "010-3456-7890", zone: "성산1동/2동", activeCases: 3 },
    { id: "worker-2", name: "이지은 사회복지사", phone: "010-2345-6789", zone: "망원1동/2동", activeCases: 2 },
    { id: "worker-3", name: "박준혁 사회복지사", phone: "010-8765-4321", zone: "상암동", activeCases: 4 },
    { id: "worker-4", name: "최수진 사회복지사", phone: "010-9876-5432", zone: "연남동/합정동", activeCases: 1 }
  ],

  seniors: [
    {
      id: "sn-101",
      name: "김순자 (82세)",
      zone: "성산1동 124-5",
      riskLevel: "critical", // critical, warning, caution, normal
      riskLabel: "🚨 긴급 (24시간 미활동)",
      workerId: "worker-1",
      workerName: "김민수 사회복지사",
      guardianPhone: "010-1111-2222 (장녀 김정희)",
      medicalConditions: "고혈압, 당뇨, 인공관절 수술",
      lastTelemetry: "24시간 동안 움직임 센서 감지 없음",
      lastTelemetryTime: "방금 전 (14:02)",
      devices: { motionSensor: "offline", smartPillbox: "missed", aiCall: "unanswered", emergencyButton: "idle" },
      dispatchStatus: "pending" // pending, dispatched, resolved
    },
    {
      id: "sn-102",
      name: "박창식 (78세)",
      zone: "망원2동 45-12",
      riskLevel: "critical",
      riskLabel: "🚨 긴급 (SOS 비상버튼 작동)",
      workerId: "worker-2",
      workerName: "이지은 사회복지사",
      guardianPhone: "010-3333-4444 (장남 박철민)",
      medicalConditions: "심혈관 질환, 협심증",
      lastTelemetry: "거실 벽면 SOS 비상 버튼 눌림",
      lastTelemetryTime: "2분 전 (14:04)",
      devices: { motionSensor: "active", smartPillbox: "done", aiCall: "answered", emergencyButton: "triggered" },
      dispatchStatus: "dispatched"
    },
    {
      id: "sn-103",
      name: "이옥분 (85세)",
      zone: "상암동 89-2",
      riskLevel: "warning",
      riskLabel: "⚠️ 경고 (AI 콜 '어지럼증' 언급)",
      workerId: "worker-3",
      workerName: "박준혁 사회복지사",
      guardianPhone: "010-5555-6666 (차남 이진호)",
      medicalConditions: "저혈압, 만성 골다공증",
      lastTelemetry: "오전 AI 통화 중 '어지러워서 누워있다' 발화 인지",
      lastTelemetryTime: "15분 전 (13:50)",
      devices: { motionSensor: "active", smartPillbox: "done", aiCall: "warning_keyword", emergencyButton: "idle" },
      dispatchStatus: "pending"
    },
    {
      id: "sn-104",
      name: "정동철 (80세)",
      zone: "연남동 12-3",
      riskLevel: "warning",
      riskLabel: "⚠️ 경고 (2회 연속 약 미복용)",
      workerId: "worker-4",
      workerName: "최수진 사회복지사",
      guardianPhone: "010-7777-8888 (장녀 정수연)",
      medicalConditions: "파킨슨병 초기, 당뇨",
      lastTelemetry: "스마트 약통 8시/12시 미개봉",
      lastTelemetryTime: "30분 전 (13:35)",
      devices: { motionSensor: "active", smartPillbox: "missed", aiCall: "answered", emergencyButton: "idle" },
      dispatchStatus: "pending"
    },
    {
      id: "sn-105",
      name: "최말순 (83세)",
      zone: "성산2동 33-8",
      riskLevel: "caution",
      riskLabel: "⚡ 주의 (야간 화장실 동선 빈번)",
      workerId: "worker-1",
      workerName: "김민수 사회복지사",
      guardianPhone: "010-8888-9999 (장남 최현우)",
      medicalConditions: "신장 질환, 불면증",
      lastTelemetry: "새벽 02:00~05:00 사이 화장실 센서 7회 감지",
      lastTelemetryTime: "2시간 전 (12:00)",
      devices: { motionSensor: "active", smartPillbox: "done", aiCall: "answered", emergencyButton: "idle" },
      dispatchStatus: "resolved"
    },
    {
      id: "sn-106",
      name: "한상배 (76세)",
      zone: "망원1동 77-4",
      riskLevel: "normal",
      riskLabel: "✅ 정상 (일상 활동 양호)",
      workerId: "worker-2",
      workerName: "이지은 사회복지사",
      guardianPhone: "010-2222-3333 (차녀 한지민)",
      medicalConditions: "관절염",
      lastTelemetry: "오전 10:00 거실/주방 활동성 정상",
      lastTelemetryTime: "1시간 전 (13:00)",
      devices: { motionSensor: "active", smartPillbox: "done", aiCall: "answered", emergencyButton: "idle" },
      dispatchStatus: "resolved"
    },
    {
      id: "sn-107",
      name: "강영희 (81세)",
      zone: "상암동 204-1",
      riskLevel: "normal",
      riskLabel: "✅ 정상 (복약 완료)",
      workerId: "worker-3",
      workerName: "박준혁 사회복지사",
      guardianPhone: "010-4444-5555 (장남 강태성)",
      medicalConditions: "고혈압",
      lastTelemetry: "점심 약 복용 스마트약통 감지 완료",
      lastTelemetryTime: "40분 전 (13:25)",
      devices: { motionSensor: "active", smartPillbox: "done", aiCall: "answered", emergencyButton: "idle" },
      dispatchStatus: "resolved"
    },
    {
      id: "sn-108",
      name: "윤철호 (79세)",
      zone: "합정동 56-2",
      riskLevel: "caution",
      riskLabel: "⚡ 주의 (AI 스피커 외로움 호소)",
      workerId: "worker-4",
      workerName: "최수진 사회복지사",
      guardianPhone: "010-6666-7777 (장녀 윤서연)",
      medicalConditions: "경도인지장애",
      lastTelemetry: "AI 스피커 대화 중 '이야기할 사람이 없다' 발화",
      lastTelemetryTime: "3시간 전 (11:00)",
      devices: { motionSensor: "active", smartPillbox: "done", aiCall: "warning_keyword", emergencyButton: "idle" },
      dispatchStatus: "resolved"
    }
  ],

  recentEvents: [
    { time: "14:04:12", type: "critical", message: "[박창식 어르신] SOS 비상 버튼 작동 (망원2동 45-12)" },
    { time: "14:02:00", type: "critical", message: "[김순자 어르신] 24시간 감지 미발생 경보 자동 발령 (성산1동)" },
    { time: "13:50:45", type: "warning", message: "[이옥분 어르신] AI 콜 어지럼증 키워드 감지 (상암동)" },
    { time: "13:35:10", type: "warning", message: "[정동철 어르신] 스마트 약통 점심약 미개봉 통보" },
    { time: "13:25:00", type: "normal", message: "[강영희 어르신] 점심 복약 완료 통신 정상" }
  ]
};
