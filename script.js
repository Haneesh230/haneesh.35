/**
 * Haneesh Chowdary Ponduri - Portfolio Interactivity Script
 * Features:
 * - Typewriter text effect with animated rotating strings
 * - Navbar scroll background and active link spy
 * - Mobile responsive navigation drawer
 * - Interactive Skills matrix filtering
 * - Case study modal with full project details
 * - 1-Click copy email with toast notification
 * - Client-side contact form handler to trigger mailto
 * - Smooth scroll-to-top handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 0. Interactive Particle Background Canvas Engine
  // ==========================================================================
  const canvas = document.getElementById('bgCanvas');
  let ctx = null;
  let particles = [];
  let animationFrameId = null;
  let currentTheme = localStorage.getItem('haneesh_portfolio_theme') || 'midnight';

  if (canvas) {
    ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    const multiColorPalettes = [
      'rgba(56, 189, 248,',   // Cyan
      'rgba(236, 72, 153,',   // Pink
      'rgba(168, 85, 247,',   // Purple
      'rgba(52, 211, 153,',   // Emerald
      'rgba(251, 191, 36,',   // Amber
      'rgba(96, 165, 250,'    // Blue
    ];

    class Particle {
      constructor() {
        this.colorPrefix = multiColorPalettes[Math.floor(Math.random() * multiColorPalettes.length)];
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.opacity = Math.random() * 0.7 + 0.25;
        this.pulse = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.opacity += this.pulse;
        if (this.opacity > 0.85 || this.opacity < 0.2) {
          this.pulse = -this.pulse;
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        let pColor;
        if (currentTheme === 'midnight') {
          pColor = `rgba(56, 189, 248, ${this.opacity * 0.9})`;
        } else if (currentTheme === 'amethyst') {
          pColor = `rgba(192, 132, 252, ${this.opacity * 0.95})`;
        } else if (currentTheme === 'cyber') {
          pColor = `rgba(52, 211, 153, ${this.opacity * 0.9})`;
        } else if (currentTheme === 'sunset') {
          pColor = `rgba(251, 146, 60, ${this.opacity * 0.9})`;
        } else if (currentTheme === 'obsidian') {
          pColor = `rgba(255, 255, 255, ${this.opacity * 0.35})`;
        } else if (currentTheme === 'light') {
          pColor = `rgba(2, 132, 199, ${this.opacity * 0.5})`;
        } else {
          // custom or fallback
          pColor = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        }

        ctx.fillStyle = pColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 13000), 110);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connecting constellation lines
      const maxDistance = 115;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineOpacity = (1 - dist / maxDistance) * 0.16;
            let strokeColor = `rgba(56, 189, 248, ${lineOpacity})`;
            if (currentTheme === 'midnight') {
              strokeColor = `rgba(56, 189, 248, ${lineOpacity * 1.2})`;
            } else if (currentTheme === 'amethyst') {
              strokeColor = `rgba(192, 132, 252, ${lineOpacity * 1.3})`;
            } else if (currentTheme === 'cyber') {
              strokeColor = `rgba(16, 185, 129, ${lineOpacity * 1.3})`;
            } else if (currentTheme === 'sunset') {
              strokeColor = `rgba(244, 63, 94, ${lineOpacity * 1.2})`;
            } else if (currentTheme === 'light') {
              strokeColor = `rgba(2, 132, 199, ${lineOpacity * 0.8})`;
            } else if (currentTheme === 'obsidian') {
              strokeColor = `rgba(255, 255, 255, ${lineOpacity * 0.4})`;
            } else {
              strokeColor = `rgba(255, 255, 255, ${lineOpacity * 0.6})`;
            }

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
  }

  // ==========================================================================
  // Theme Switcher Logic (Midnight, Amethyst, Cyber, Sunset, Obsidian, Light, Custom)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-option');
  const themeIcon = document.getElementById('themeIcon');
  const themeName = document.getElementById('themeName');
  const customBgColorInput = document.getElementById('customBgColorInput');

  const themeMetadata = {
    midnight: { icon: '💎', name: 'Midnight Sapphire' },
    amethyst: { icon: '🔮', name: 'Royal Amethyst' },
    cyber: { icon: '⚡', name: 'Cyber Emerald' },
    sunset: { icon: '🌅', name: 'Sunset Horizon' },
    obsidian: { icon: '🖤', name: 'Obsidian Minimal' },
    light: { icon: '☀️', name: 'Clean Light' },
    custom: { icon: '🎨', name: 'Custom Color' }
  };

  function applyTheme(themeKey, customColor = null) {
    currentTheme = themeKey;
    document.body.setAttribute('data-theme', themeKey);
    localStorage.setItem('haneesh_portfolio_theme', themeKey);

    if (themeKey === 'custom' && customColor) {
      document.documentElement.style.setProperty('--user-custom-bg', customColor);
      localStorage.setItem('haneesh_portfolio_custom_bg', customColor);
      if (customBgColorInput) customBgColorInput.value = customColor;
    } else {
      document.documentElement.style.removeProperty('--user-custom-bg');
    }

    const meta = themeMetadata[themeKey] || themeMetadata.midnight;
    if (themeIcon) themeIcon.textContent = meta.icon;
    if (themeName) themeName.textContent = meta.name;

    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-theme') === themeKey);
    });
  }

  // Check saved custom background color
  const savedCustomBg = localStorage.getItem('haneesh_portfolio_custom_bg');
  if (currentTheme === 'custom' && savedCustomBg) {
    applyTheme('custom', savedCustomBg);
  } else {
    applyTheme(currentTheme);
  }

  if (themeToggleBtn && themeDropdown) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('open');
    });

    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.getAttribute('data-theme');
        applyTheme(theme);
        themeDropdown.classList.remove('open');
        showToast(`Theme changed to: ${themeMetadata[theme].name}`);
      });
    });

    // Custom Color Input Change Listener
    if (customBgColorInput) {
      if (savedCustomBg) customBgColorInput.value = savedCustomBg;
      customBgColorInput.addEventListener('input', (e) => {
        const selectedColor = e.target.value;
        applyTheme('custom', selectedColor);
      });
      customBgColorInput.addEventListener('change', (e) => {
        showToast(`Custom background color applied: ${e.target.value}`);
      });
    }

    document.addEventListener('click', (e) => {
      if (!themeDropdown.contains(e.target) && e.target !== themeToggleBtn) {
        themeDropdown.classList.remove('open');
      }
    });
  }

  // 1. Dynamic Typewriter Effect for Hero
  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    'Python Applications.',
    'AI & Machine Learning Models.',
    'Healthcare Vision Diagnostics.',
    'Scalable Web & Database Systems.',
    'Innovative Software Solutions.'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of the text
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRole, typingSpeed);
  }

  if (typewriterElement) {
    typeRole();
  }

  // 2. Navbar Scroll Behavior & Scroll-Spy
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('header, section');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background toggle
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active link highlighting based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Scroll to top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking on any link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // 4. Skills Category Filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Toast Notification Utility
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. Copy Email Clipboard Handlers
  const emailToCopy = 'haneeshchowdaryp@gmail.com';
  const copyHeroBtn = document.getElementById('heroCopyEmailBtn');
  const copyContactBtn = document.getElementById('copyEmailAction');

  function copyEmail() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast('Email copied to clipboard: ' + emailToCopy);
      }).catch(() => {
        fallbackCopyText(emailToCopy);
      });
    } else {
      fallbackCopyText(emailToCopy);
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Email copied to clipboard: ' + text);
    } catch (err) {
      showToast('Please copy manually: ' + text);
    }
    document.body.removeChild(textArea);
  }

  if (copyHeroBtn) copyHeroBtn.addEventListener('click', copyEmail);
  if (copyContactBtn) copyContactBtn.addEventListener('click', copyEmail);

  // 7. Project Details Modal System
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalInner = document.getElementById('modalInnerContent');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetailsData = {
    'nutri-scan': {
      title: 'Nutri Scan AI System',
      badge: 'Academic Major Project • Team of 3 • Deep Learning',
      overview: 'Nutri Scan AI is a non-invasive diagnostic assistant designed to identify vitamin and micro-nutrient deficiencies by inspecting tissue manifestations (such as tongue discoloration, nail-bed striations, and angular cheilitis).',
      architecture: [
        'Data preprocessing pipeline written in Python using OpenCV for image normalisation and contrast enhancement.',
        'Convolutional Neural Network (CNN) architecture optimized for multi-class classification of nutritional deficiencies.',
        'Interactive web evaluation frontend allowing medical staff to upload clinical photos and receive confidence metrics.',
        'Detailed diagnostic summary output highlighting correlated deficiencies (e.g. Vitamin B12, Iron, Vitamin D, Vitamin C).'
      ],
      impact: 'Significantly lowers barriers for early preliminary screening in underserved clinics where blood testing infrastructure may be delayed or unavailable.'
    },
    'student-system': {
      title: 'Student Result Management System',
      badge: 'Academic Mini Project • Team of 4 • Full Stack & DB',
      overview: 'An institutional web software platform built to modernize how universities manage academic grade books, semester records, and backlog alerts across multiple semesters.',
      architecture: [
        'Normalized relational schema in MySQL ensuring complete ACID compliance across student batches, subject codes, and marks.',
        'Role-Based Access Control (RBAC) separating administrative faculties from student read-only dashboards.',
        'Automated backlog detection algorithms that flag students at risk of academic probation or requiring supplementary examination registration.',
        'Export module for generating semester grade sheets and institutional pass-rate analytical charts.'
      ],
      impact: 'Eliminated manual paper calculation errors and reduced result processing time for teachers by over 60%.'
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetailsData[projKey];

      if (data && modalInner) {
        modalInner.innerHTML = `
          <h2 class="modal-project-title">${data.title}</h2>
          <div class="modal-project-meta">${data.badge}</div>
          
          <h4 class="modal-section-title">Project Overview</h4>
          <p class="modal-desc">${data.overview}</p>
          
          <h4 class="modal-section-title">Technical Architecture & Implementation</h4>
          <ul class="modal-points">
            ${data.architecture.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
          
          <h4 class="modal-section-title">Results & Impact</h4>
          <p class="modal-desc">${data.impact}</p>

          <div style="margin-top: 24px;">
            <a href="mailto:haneeshchowdaryp@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(data.title)}" class="btn btn-primary btn-sm">
              Discuss This Project With Haneesh
            </a>
          </div>
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 8. Contact Form Mailto Handler
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('senderSubject').value;
      const message = document.getElementById('senderMessage').value;

      const mailtoUrl = `mailto:haneeshchowdaryp@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      showToast('Opening your email client to send message...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }
});
