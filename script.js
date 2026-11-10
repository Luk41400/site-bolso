/**
 * Família Bolsonaro: Guia Informativo e Interativo 2026
 * Interações, tema claro/escuro, animações de scroll, contadores e filtros
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initScrollAnimations();
  initCounters();
  initLiveSearch();
  initFilters();
  initBackToTop();
  initMobileMenu();
  initCardInteractions();
});

/* ==========================================================================
   1. Alternador de Tema (Dark / Light) com Persistência
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('site-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('site-theme', activeTheme);
    updateThemeIcon(activeTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`; // Lua
  } else {
    icon.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `; // Sol
  }
}

/* ==========================================================================
   2. Barra de Progresso de Leitura
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   3. Animações de Scroll (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Contadores Animados (CountUp)
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 1200;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${Math.floor(current)}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   5. Busca em Tempo Real (Perfis, Tabela e Fontes)
   ========================================================================== */
function initLiveSearch() {
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const profiles = document.querySelectorAll('.profile-card');
  const tableRows = document.querySelectorAll('#table-body tr');
  const searchResultsCount = document.getElementById('search-count');

  if (!searchInput) return;

  // Atalho de teclado '/'
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchInput.blur();
      filterItems('');
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (clearBtn) {
      clearBtn.style.display = query ? 'flex' : 'none';
    }
    filterItems(query);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      filterItems('');
      searchInput.focus();
    });
  }

  function filterItems(query) {
    let matchedProfiles = 0;

    // Filtra cards de perfil
    profiles.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = !query || text.includes(query);
      card.style.display = match ? 'flex' : 'none';
      if (match) matchedProfiles++;
    });

    // Filtra linhas da tabela
    tableRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const match = !query || text.includes(query);
      row.style.display = match ? '' : 'none';
    });

    // Feedback de contagem
    if (searchResultsCount) {
      if (query) {
        searchResultsCount.textContent = `${matchedProfiles} membro(s) encontrado(s)`;
        searchResultsCount.style.display = 'block';
      } else {
        searchResultsCount.style.display = 'none';
      }
    }
  }
}

/* ==========================================================================
   6. Filtros por Categoria no Quadro Geral
   ========================================================================== */
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const profileCards = document.querySelectorAll('.profile-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      profileCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Botão Voltar ao Topo
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. Menu Mobile
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Fechar ao clicar em um link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   9. Interações dos Cards (Copiar link, Copiar Resumo, Expansão)
   ========================================================================== */
function initCardInteractions() {
  // Copiar resumo
  document.querySelectorAll('.copy-summary-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.profile-card');
      if (!card) return;
      const title = card.querySelector('.profile-name')?.textContent || '';
      const role = card.querySelector('.profile-role')?.textContent || '';
      const summary = card.querySelector('.profile-bio')?.textContent || '';
      const textToCopy = `${title} (${role})\n${summary}\nFonte: Família Bolsonaro 2026 - Guia Informativo`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Resumo de ${title} copiado!`);
      }).catch(() => {
        showToast('Não foi possível copiar o texto.');
      });
    });
  });

  // Accordion de detalhes
  document.querySelectorAll('.toggle-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.profile-card');
      if (!card) return;
      const detailsSection = card.querySelector('.profile-extra-details');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (detailsSection) {
        if (isExpanded) {
          detailsSection.classList.remove('expanded');
          detailsSection.style.maxHeight = '0px';
          btn.setAttribute('aria-expanded', 'false');
          const textSpan = btn.querySelector('.btn-text');
          if (textSpan) textSpan.textContent = 'Ver detalhes completos';
          const chevron = btn.querySelector('.chevron-icon');
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        } else {
          detailsSection.classList.add('expanded');
          detailsSection.style.maxHeight = (detailsSection.scrollHeight + 60) + 'px';
          btn.setAttribute('aria-expanded', 'true');
          const textSpan = btn.querySelector('.btn-text');
          if (textSpan) textSpan.textContent = 'Ocultar detalhes';
          const chevron = btn.querySelector('.chevron-icon');
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
}

/* ==========================================================================
   10. Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'site-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
