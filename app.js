/**
 * PORTFOLIO APPLICATION LOGIC
 * Dynamic Rendering & Interactive Micro-features
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.PORTFOLIO_CONFIG;
  if (!config) {
    console.error('Portfolio configuration missing!');
    return;
  }

  // 1. RENDER PROFILE & HERO STATS
  renderProfileInfo(config.profile);
  renderStats(config.stats);

  // 2. RENDER SKILLS MATRIX
  renderSkills(config.skills);

  // 3. RENDER PROJECTS & FILTERING
  renderProjects(config.projects);
  setupProjectFilters(config.projects);

  // 4. RENDER TIMELINE
  renderTimeline(config.experience);

  // 5. SETUP AI SIMULATOR DEMO
  setupAIDemo(config.aiDemoScenarios);

  // 6. SETUP NAVBAR & INTERSECTION OBSERVER
  setupNavbar();

  // 7. SETUP THEME TOGGLE
  setupThemeToggle();

  // 8. SETUP CONTACT FORM & TOAST
  setupContactForm();
});

/* ==========================================
   1. PROFILE & HERO STATS
   ========================================== */
function renderProfileInfo(profile) {
  document.getElementById('profile-name').textContent = profile.name;
  document.getElementById('profile-role').innerHTML = `<i class="fa-solid fa-laptop-code"></i> ${profile.role}`;
  document.getElementById('hero-tagline').textContent = profile.tagline;
  document.getElementById('profile-bio').textContent = profile.bio;
  document.getElementById('status-text').textContent = profile.status;
  document.getElementById('profile-avatar').src = profile.avatar;
  document.getElementById('contact-email').textContent = profile.email;
  document.getElementById('contact-email').href = `mailto:${profile.email}`;
}

function renderStats(stats) {
  const statsGrid = document.getElementById('stats-grid');
  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-card glass-panel">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

/* ==========================================
   2. SKILLS MATRIX
   ========================================== */
function renderSkills(skills) {
  const skillsMatrix = document.getElementById('skills-matrix');
  skillsMatrix.innerHTML = skills.map(cat => `
    <div class="skills-category glass-panel">
      <div class="category-header">
        <i class="fa-solid ${cat.icon}"></i>
        <h3>${cat.category}</h3>
      </div>
      <div class="skills-list">
        ${cat.items.map(skill => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-percent">${skill.level}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar" style="width: ${skill.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================
   3. PROJECTS & FILTERING
   ========================================== */
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(proj => {
    // If it is the SilverCare project, link to silvercare/index.html
    const liveUrl = proj.id === 'project-3' || proj.title.includes('SilverCare') 
      ? '/silvercare/index.html' 
      : proj.liveUrl;

    return `
      <div class="project-card glass-panel" data-category="${proj.category}">
        <div class="project-image-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-img">
          <span class="project-badge">${proj.badge}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-summary">${proj.summary}</p>
          <div class="project-tags">
            ${proj.tags.map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
          </div>
          <div class="project-actions">
            <button class="cta-btn glass-btn btn-sm" onclick="openProjectModal('${proj.id}')">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
            <a href="${liveUrl}" class="cta-btn primary-btn btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupProjectFilters(projects) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal open
  window.openProjectModal = function(id) {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    const liveUrl = proj.id === 'project-3' || proj.title.includes('SilverCare') 
      ? '/silvercare/index.html' 
      : proj.liveUrl;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-body-content');
    
    content.innerHTML = `
      <div class="modal-grid">
        <div class="modal-visual">
          <img src="${proj.image}" alt="${proj.title}">
        </div>
        <div class="modal-details">
          <h2>${proj.title}</h2>
          <span class="project-badge">${proj.badge}</span>
          <p class="modal-desc">${proj.description}</p>
          <div class="project-tags" style="margin: 20px 0;">
            ${proj.tags.map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
          </div>
          <div class="modal-actions-group">
            <a href="${proj.githubUrl}" target="_blank" class="cta-btn glass-btn">
              <i class="fa-brands fa-github"></i> GitHub Repository
            </a>
            <a href="${liveUrl}" class="cta-btn primary-btn">
              <i class="fa-solid fa-rocket"></i> Launch Live Demo
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  // Close modal
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================
   4. TIMELINE
   ========================================== */
function renderTimeline(experience) {
  const timeline = document.getElementById('experience-timeline');
  timeline.innerHTML = experience.map((exp, index) => `
    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
      <div class="timeline-dot"></div>
      <div class="timeline-content glass-panel">
        <span class="timeline-period">${exp.period}</span>
        <h3 class="timeline-role">${exp.role}</h3>
        <span class="timeline-company">${exp.company}</span>
        <p class="timeline-desc">${exp.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   5. AI SIMULATOR PLAYGROUND
   ========================================== */
function setupAIDemo(scenarios) {
  const selector = document.getElementById('scenario-selector');
  const textarea = document.getElementById('demo-prompt-text');
  const runBtn = document.getElementById('run-demo-btn');
  const terminal = document.getElementById('terminal-output');

  selector.innerHTML = scenarios.map((sc, index) => `
    <button class="scenario-btn ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${sc.name}
    </button>
  `).join('');

  let activeIndex = 0;
  textarea.value = scenarios[0].prompt;

  const buttons = document.querySelectorAll('.scenario-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeIndex = parseInt(btn.getAttribute('data-index'));
      textarea.value = scenarios[activeIndex].prompt;
      
      // Reset terminal
      terminal.innerHTML = `<div class="terminal-line placeholder">Press 'Run Simulation' to start agent workflow...</div>`;
    });
  });

  runBtn.addEventListener('click', async () => {
    runBtn.disabled = true;
    terminal.innerHTML = '';
    const sc = scenarios[activeIndex];

    for (let i = 0; i < sc.steps.length; i++) {
      const line = document.createElement('div');
      line.className = 'terminal-line fade-in';
      
      if (sc.steps[i].startsWith('✅') || sc.steps[i].startsWith('🎉')) {
        line.innerHTML = `<span class="terminal-success">${sc.steps[i]}</span>`;
      } else if (sc.steps[i].startsWith('🔍') || sc.steps[i].startsWith('📥')) {
        line.innerHTML = `<span class="terminal-info">${sc.steps[i]}</span>`;
      } else {
        line.innerHTML = sc.steps[i];
      }
      
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
      
      // Simulate delay between steps
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    runBtn.disabled = false;
  });
}

/* ==========================================
   6. NAVBAR & INTERSECTION OBSERVER
   ========================================== */
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================
   7. THEME TOGGLE
   ========================================== */
function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  
  // Set default theme to dark
  document.documentElement.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const icon = toggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });
}

/* ==========================================
   8. CONTACT FORM & TOAST
   ========================================== */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const container = document.getElementById('toast-container');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    
    showToast(`✉️ Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast glass-panel fade-in';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--primary-color);"></i> ${msg}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }
}
