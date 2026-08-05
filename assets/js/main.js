(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeColor = document.getElementById('themeColor');
  const navCollapse = document.getElementById('primaryNav');
  const toast = document.getElementById('siteToast');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
  const $ = window.jQuery;
  let scrollTicking = false;
  let toastTimer;

  body.classList.add('enhanced');

  const updateThemeControl = (theme) => {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    themeToggle.setAttribute('aria-pressed', String(!isDark));
    themeIcon.setAttribute('href', isDark ? '#icon-sun' : '#icon-moon');
    themeColor.setAttribute('content', isDark ? '#07101f' : '#f6f8fc');
  };

  const applyTheme = (theme, persist = false) => {
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', theme);
    updateThemeControl(theme);

    if (persist) {
      try {
        localStorage.setItem('jaibir-theme', theme);
      } catch (error) {
        // The visual preference still works if storage is unavailable.
      }
    }
  };

  const currentTheme = root.getAttribute('data-theme') || 'dark';
  updateThemeControl(currentTheme);

  themeToggle.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  const adaptToSystemTheme = (event) => {
    try {
      if (!localStorage.getItem('jaibir-theme')) {
        applyTheme(event.matches ? 'light' : 'dark');
      }
    } catch (error) {
      applyTheme(event.matches ? 'light' : 'dark');
    }
  };

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener('change', adaptToSystemTheme);
  }

  const updateAge = () => {
    const dateOfBirth = new Date(1987, 11, 23);
    const now = new Date();
    let age = now.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = now.getMonth() - dateOfBirth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < dateOfBirth.getDate())) {
      age -= 1;
    }

    document.querySelectorAll('[data-current-age]').forEach((element) => {
      element.textContent = String(age);
    });

    document.querySelectorAll('[data-current-year]').forEach((element) => {
      element.textContent = String(now.getFullYear());
    });
  };

  updateAge();

  const sections = ['about', 'systems', 'experience', 'skills', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActiveNav = () => {
    const marker = window.innerHeight * 0.42;
    let activeId = 'about';

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) {
        activeId = section.id;
      }
    });

    document.querySelectorAll('.navbar .nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };

  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

    progress.style.setProperty('--scroll-progress', `${Math.min(100, Math.max(0, percent))}%`);
    header.classList.toggle('is-scrolled', scrollTop > 12);
    backToTop.classList.toggle('is-visible', scrollTop > 640);
    setActiveNav();
    scrollTicking = false;
  };

  const requestScrollUpdate = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollUI);
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  updateScrollUI();

  const closeMobileNav = () => {
    if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
    }
  };

  if ($) {
    $('.navbar .nav-link').on('click', function () {
      closeMobileNav();
    });

    $('#backToTop').on('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  } else {
    document.querySelectorAll('.navbar .nav-link').forEach((link) => link.addEventListener('click', closeMobileNav));
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  }

  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealAll = () => revealElements.forEach((element) => element.classList.add('is-visible'));

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const showToast = (message) => {
    const toastMessage = toast.querySelector('span');
    toastMessage.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  const copyEmail = document.getElementById('copyEmail');
  copyEmail.addEventListener('click', async () => {
    try {
      await copyText(copyEmail.dataset.email);
      showToast('Email copied to clipboard');
    } catch (error) {
      showToast('Copy unavailable — email is shown above');
    }
  });

  const setAnimationState = () => body.classList.toggle('is-paused', document.hidden);
  document.addEventListener('visibilitychange', setAnimationState);
  setAnimationState();
})();
