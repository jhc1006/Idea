window.PORTFOLIO_CONFIG = {
  profile: {
    name: "전효철 (Hyochul Jeon)",
    role: "AI & Full-Stack Software Engineer",
    tagline: "Empowering Next-Gen Applications with Autonomous Agents & High-Performance Systems",
    bio: "AI 멀티에이전트 시스템, LLM 응용 솔루션, 그리고 몰입감 넘치는 고성능 웹 애플리케이션을 설계하고 구축하는 풀스택 엔지니어입니다. 최신 웹 기술과 생성형 AI의 경계를 허무는 인과적 혁신을 지향합니다.",
    location: "Seoul, South Korea",
    email: "hyochul.dev@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    status: "Available for New Projects & Collaborations",
    avatar: "assets/avatar.svg"
  },
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "AI & Web Projects", value: "24+" },
    { label: "Open Source Commits", value: "500+" },
    { label: "Client Satisfaction", value: "100%" }
  ],
  skills: [
    {
      category: "AI & Agent Systems",
      icon: "fa-brain",
      items: [
        { name: "LLM & MCP (Model Context Protocol)", level: 95 },
        { name: "Multi-Agent Orchestration", level: 90 },
        { name: "LangChain / LlamaIndex", level: 88 },
        { name: "PyTorch & Computer Vision", level: 82 }
      ]
    },
    {
      category: "Full-Stack Development",
      icon: "fa-code",
      items: [
        { name: "Modern JavaScript / TypeScript", level: 95 },
        { name: "HTML5 / CSS3 / Glassmorphism", level: 92 },
        { name: "Python / FastAPI / AsyncIO", level: 94 },
        { name: "React & Next.js Frameworks", level: 88 }
      ]
    },
    {
      category: "Architecture & DevOps",
      icon: "fa-server",
      items: [
        { name: "Docker & Containerization", level: 86 },
        { name: "RESTful & WebSockets / SSE", level: 92 },
        { name: "Database Design (SQL & NoSQL)", level: 85 },
        { name: "CI/CD & Cloud Infrastructure", level: 80 }
      ]
    }
  ],
  projects: [
    {
      id: "project-1",
      title: "Gemma 4 YouTube Vision MCP Server",
      category: "ai",
      badge: "Featured AI Project",
      image: "assets/project1.svg",
      summary: "LM Studio 및 표준 입출력 JSON-RPC 기반으로 유튜브 비디오 자막과 비전 프레임을 실시간 연동하는 MCP 서버",
      description: "유튜브 동영상 링크 입력 시 자막 스크립트를 수집하고, CV2 및 yt-dlp를 활용해 주요 비디오 프레임을 자동 추출하여 Gemma 멀티모달 모델에 공급하는 타임라인 분석 도구입니다.",
      tags: ["Python", "MCP", "Gemma 4", "OpenCV", "yt-dlp", "JSON-RPC"],
      githubUrl: "https://github.com",
      liveUrl: "#"
    },
    {
      id: "project-2",
      title: "Local Agent Team Orchestrator",
      category: "ai",
      badge: "Agent System",
      image: "assets/project2.svg",
      summary: "복잡한 코딩 및 리서치 과업을 병렬 분산 처리하는 자율형 로컬 에이전트 팀 오케스트레이터",
      description: "역할별 자율 에이전트(리서처, 코더, 검증자)를 생성하여 실시간 협업 통신 프로토콜로 과업을 완료하도록 지휘하는 지능형 워크플로우 프레임워크입니다.",
      tags: ["Python", "AsyncIO", "LLM Orchestration", "Multi-Agent"],
      githubUrl: "https://github.com",
      liveUrl: "#"
    },
    {
      id: "project-3",
      title: "Market Trend AI Reporter",
      category: "fullstack",
      badge: "Full-Stack AI",
      image: "assets/project3.svg",
      summary: "실시간 글로벌 웹 데이터와 뉴스 트렌드를 감지하여 보고서를 자동 작성하는 AI 대시보드",
      description: "웹 스크래핑과 정형 데이터 분석 엔진을 통합하여 실시간 시장 동향 보고서를 Markdown 및 대시보드로 시각화해 주는 마켓 인사이트 플랫폼입니다.",
      tags: ["TypeScript", "CSS3 Glassmorphism", "FastAPI", "Web Automation"],
      githubUrl: "https://github.com",
      liveUrl: "#"
    },
    {
      id: "project-4",
      title: "Glassmorphic Interactive Design System",
      category: "design",
      badge: "UI / UX Design",
      image: "assets/project4.svg",
      summary: "네온 그래디언트 및 유기적 마이크로 애니메이션 기반의 차세대 웹 UI 디자인 시스템",
      description: "접근성을 보장하면서도 극도의 시각적 완성도를 제공하는 Glassmorphism 기반의 바닐라 CSS / JS 디자인 토큰 파이프라인입니다.",
      tags: ["Vanilla CSS", "Design System", "Micro-Animations", "UX Design"],
      githubUrl: "https://github.com",
      liveUrl: "#"
    }
  ],
  experience: [
    {
      period: "2024 - Present",
      role: "Lead AI Systems & Full-Stack Architect",
      company: "Innovate AI Labs",
      description: "Model Context Protocol(MCP) 기반 인프라 구축, 멀티에이전트 에이전트 오케스트레이션 및 차세대 인터랙티브 웹 솔루션 개발 총괄."
    },
    {
      period: "2022 - 2024",
      role: "Senior Full-Stack Engineer",
      company: "NextGen Software",
      description: "고성능 실시간 데이터 시각화 대시보드 개발, REST/WebSocket API 마이크로서비스 설계 및 UI UX 시스템 구축."
    },
    {
      period: "2020 - 2022",
      role: "Software Engineer",
      company: "Tech Dynamic Inc.",
      description: "웹 자동화 파이프라인 구축, 데이터 스크래핑 및 크로스 플랫폼 프론트엔드 서비스 개발."
    }
  ],
  aiDemoScenarios: [
    {
      name: "📹 유튜브 비전 요약",
      prompt: "유튜브 비디오 URL을 입력받아 핵심 이미지 5장과 함께 타임라인 보고서를 작성해 줘",
      steps: [
        "🔍 MCP Client: tools/call 'analyze_youtube_video' 요청 전송",
        "📥 yt-dlp & OpenCV: 자막 및 주요 프레임 추출 완료",
        "🤖 Gemma 4 Vision: 멀티모달 분석 및 타임라인 융합 처리 중...",
        "✅ 결과: 01:20 [핵심 개요], 03:45 [주요 시모의 결과], 07:10 [결론 요약 보고서 생성 완료]"
      ]
    },
    {
      name: "🚀 멀티에이전트 과업 분담",
      prompt: "새로운 파이썬 비동기 서버 프로젝트 초기화 및 테스트 코드 작성",
      steps: [
        "🤖 Leader Agent: 과업 분석 및 3개 서브에이전트 할당",
        "🛠 Architecture Agent: Project Structure 및 AsyncIO boilerplate 생성",
        "🧪 Test Agent: Pytest 단위 테스트 8개 자동 생성 및 검증",
        "🎉 Orchestrator: 모든 서브에이전트 작업 검증 완료 및 통합 성공"
      ]
    }
  ]
};

