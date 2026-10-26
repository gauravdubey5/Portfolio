/* ==========================================================================
   MAIN CONTROLLER // CLOUDVERSE INTERFACE
   HUD Navigation, Recruiter Mode, Island Flying, Audio Drone, Copy Email
   ========================================================================== */

(function () {
  'use strict';

  // 1. TYPING EFFECT
  const typingWords = [
    'Microsoft Azure Cloud Infrastructure',
    'Terraform Infrastructure as Code',
    'CI/CD Pipelines with GitHub Actions',
    'Linux System Administration & Shell',
    'Container Workloads with Docker & K8s',
    'Cloud Networking, NSGs & Monitoring'
  ];

  const typingTarget = document.getElementById('typing-text');
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function runTyping() {
    if (!typingTarget) return;

    const currentWord = typingWords[wordIdx];
    if (!isDeleting) {
      typingTarget.textContent = currentWord.substring(0, charIdx++);
      if (charIdx > currentWord.length) {
        isDeleting = true;
        setTimeout(runTyping, 1800);
        return;
      }
    } else {
      typingTarget.textContent = currentWord.substring(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % typingWords.length;
      }
    }

    setTimeout(runTyping, isDeleting ? 30 : 65);
  }

  // 2. HUD HEADER & SCROLL SPY
  const hud = document.querySelector('.cyber-hud');
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.hud-nav a, .drawer-nav-list a, .dock-pill');

  function handleScroll() {
    const scrollY = window.scrollY;

    // HUD glass shadow
    if (hud) {
      if (scrollY > 50) {
        hud.classList.add('scrolled');
      } else {
        hud.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    // Scroll Spy active states
    let currentSectionId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 3. SMOOTH SCROLL & ISLAND 3D FOCUS
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();

        // If it's an island link, notify 3D engine
        if (targetId.startsWith('#island-') && window.flyToCloudverseIsland) {
          const islandKey = targetId.replace('#island-', '');
          window.flyToCloudverseIsland(islandKey);
        } else if (targetId === '#hero' && window.resetCloudverseCamera) {
          window.resetCloudverseCamera();
        }

        // Close mobile drawer if open
        closeMobileDrawer();

        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 4. ISLAND CARD CLICKS
  document.querySelectorAll('.island-card[data-island]').forEach((card) => {
    card.addEventListener('click', function () {
      const islandId = this.getAttribute('data-island');
      const targetSection = document.getElementById(`island-${islandId}`);

      if (window.flyToCloudverseIsland) {
        window.flyToCloudverseIsland(islandId);
      }

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. MOBILE DRAWER TOGGLE
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  function openMobileDrawer() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (drawer && drawer.classList.contains('open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMobileDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileDrawer();
  });

  // 6. RECRUITER MODE TOGGLE
  const recruiterBtn = document.getElementById('recruiter-mode-toggle');
  function toggleRecruiterMode() {
    const isRecruiter = document.body.classList.toggle('recruiter-mode');
    localStorage.setItem('cloudverse-recruiter-mode', isRecruiter ? 'true' : 'false');

    if (recruiterBtn) {
      if (isRecruiter) {
        recruiterBtn.classList.add('recruiter-active');
        recruiterBtn.innerHTML = '<i class="fa-solid fa-briefcase"></i> Recruiter Mode: ON';
        if (window.showToastAlert) {
          window.showToastAlert('⚡ Recruiter Quick-View Enabled: Fast-track scannable mode.');
        }
      } else {
        recruiterBtn.classList.remove('recruiter-active');
        recruiterBtn.innerHTML = '<i class="fa-solid fa-cube"></i> Cloudverse 3D';
        if (window.showToastAlert) {
          window.showToastAlert('🌌 Cloudverse 3D Experience Enabled.');
        }
      }
    }
  }

  if (recruiterBtn) {
    recruiterBtn.addEventListener('click', toggleRecruiterMode);
  }

  // Restore saved recruiter preference
  if (localStorage.getItem('cloudverse-recruiter-mode') === 'true') {
    toggleRecruiterMode();
  }

  // 7. THEME SWITCHER
  const themeBtns = document.querySelectorAll('[data-theme-btn]');
  function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('cloudverse-theme', themeName);
    if (window.showToastAlert) {
      window.showToastAlert(`🎨 Theme shifted to: ${themeName.toUpperCase()}`);
    }
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-btn');
      setTheme(theme);
    });
  });

  const savedTheme = localStorage.getItem('cloudverse-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // 8. ONE-CLICK EMAIL COPY
  const copyEmailBtns = document.querySelectorAll('.copy-email-action');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = 'gaurav25eng@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        if (window.showToastAlert) {
          window.showToastAlert('📋 Email copied to clipboard: gaurav25eng@gmail.com');
        }
      } catch (err) {
        if (window.showToastAlert) {
          window.showToastAlert('✉️ Email: gaurav25eng@gmail.com');
        }
      }
    });
  });

  // 9. RESUME DOWNLOAD TRACKER
  const resumeLinks = document.querySelectorAll('a[download]');
  resumeLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.showToastAlert) {
        window.showToastAlert('📄 Downloading Resume: Gaurav Dubey (Azure DevOps Engineer PDF)');
      }
    });
  });

  // 10. WEB AUDIO AMBIENT DRONE SYNTHESIZER (OPTIONAL SOUND EFFECT)
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isAudioPlaying = false;
  const audioToggleBtn = document.getElementById('ambient-audio-toggle');

  function initAudioDrone() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();

      // Ambient drone oscillator
      oscillator = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(55, audioCtx.currentTime); // 55Hz deep atmospheric note (A1)

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // Low, subtle ambient volume

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      isAudioPlaying = true;
    } catch (e) {
      console.warn('Web Audio Ambient Drone not supported or blocked.');
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        initAudioDrone();
        audioToggleBtn.classList.add('active');
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        if (window.showToastAlert) window.showToastAlert('🔊 Ambient Cloud Soundscape: ON');
      } else if (isAudioPlaying) {
        audioCtx.suspend();
        isAudioPlaying = false;
        audioToggleBtn.classList.remove('active');
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        if (window.showToastAlert) window.showToastAlert('🔇 Ambient Soundscape: MUTED');
      } else {
        audioCtx.resume();
        isAudioPlaying = true;
        audioToggleBtn.classList.add('active');
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        if (window.showToastAlert) window.showToastAlert('🔊 Ambient Soundscape: RESUMED');
      }
    });
  }

  // 11. INITIALIZE ON DOM READY
  document.addEventListener('DOMContentLoaded', () => {
    runTyping();
    handleScroll();

    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Welcome Toast
    setTimeout(() => {
      if (window.showToastAlert) {
        window.showToastAlert('🚀 Welcome to Gaurav Dubey\'s Cloudverse! Explore floating islands & cloud infrastructure.');
      }
    }, 1200);
  });
})();