/**
 * Главный скрипт сайта-портфолио (прототип)
 * Разработано строго по канонам landing-skill:
 * - Рендерит данные из изолированного projects.js
 * - Никаких тяжелых зависимостей (чистый, быстрый JS)
 * - Плавная фильтрация и анимации без скачков верстки
 */

document.addEventListener("DOMContentLoaded", () => {
  initProjects();
  initFilter();
  initScrollAnimations();
});

// 1. Инициализация и рендер проектов
function initProjects() {
  const container = document.getElementById("projects-container");
  if (!container || typeof PROJECTS_DATA === "undefined") return;

  renderProjects(PROJECTS_DATA);
  updateFilterCounts();
}

// 2. Рендер списка карточек
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  if (projects.length === 1) {
    container.classList.add("single-item");
  } else {
    container.classList.remove("single-item");
  }

  if (projects.length === 0) {
    container.classList.remove("single-item");
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 56px 24px; background: var(--bg-card); border: 1px dashed var(--border-light); border-radius: var(--radius-lg);">
        <p style="font-weight: 700; color: var(--text-primary); margin-bottom: 6px; font-size: 1.1rem;">Проекты в этой категории скоро появятся</p>
        <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto; line-height: 1.55;">
          Сейчас в портфолио опубликован личный флагманский проект — AI-бот QNutriAI. Веб-проекты готовятся к публикации.
        </p>
      </div>
    `;
    return;
  }

  const botIconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>`;
  const siteIconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

  container.innerHTML = projects.map(item => `
    <article class="project-card" data-category="${item.category}">
      <div class="card-header">
        <div class="card-top-meta">
          <span class="category-tag ${item.category === 'bots' ? 'tag-bot' : 'tag-site'}">
            ${item.category === 'bots' ? botIconSvg : siteIconSvg}
            <span>${item.categoryLabel}</span>
          </span>
          <span class="card-badge">${item.badge}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
      </div>

      <div class="case-story">
        <div class="story-item">
          <span class="story-label">Задача</span>
          <p class="story-text">${item.task}</p>
        </div>
        <div class="story-item">
          <span class="story-label">Решение</span>
          <p class="story-text">${item.solution}</p>
        </div>
        <div class="story-item result">
          <span class="story-label">Результат</span>
          <p class="story-text">${item.result}</p>
        </div>
      </div>

      <div class="metrics-row">
        ${item.metrics.map(m => `
          <div class="metric-item">
            <span class="metric-value">${m.value}</span>
            <span class="metric-label">${m.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="card-footer">
        <div class="tags-wrap">
          ${item.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
        <a href="${item.demoLink}" target="_blank" rel="noopener noreferrer" class="card-action-btn">
          <span>${item.demoLinkLabel}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `).join('');
}

// 3. Подсчет количества проектов по категориям
function updateFilterCounts() {
  if (typeof PROJECTS_DATA === "undefined") return;

  const countAll = PROJECTS_DATA.length;
  const countBots = PROJECTS_DATA.filter(p => p.category === "bots").length;
  const countSites = PROJECTS_DATA.filter(p => p.category === "sites").length;

  const elAll = document.getElementById("count-all");
  const elBots = document.getElementById("count-bots");
  const elSites = document.getElementById("count-sites");

  if (elAll) elAll.textContent = countAll;
  if (elBots) elBots.textContent = countBots;
  if (elSites) elSites.textContent = countSites;
}

// 4. Интерактивная плавная фильтрация
function initFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length || typeof PROJECTS_DATA === "undefined") return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      
      const container = document.getElementById("projects-container");
      if (container) {
        container.style.opacity = "0.4";
        container.style.transform = "translateY(6px)";
        container.style.transition = "all 0.18s ease";

        setTimeout(() => {
          if (filterValue === "all") {
            renderProjects(PROJECTS_DATA);
          } else {
            const filtered = PROJECTS_DATA.filter(p => p.category === filterValue);
            renderProjects(filtered);
          }
          container.style.opacity = "1";
          container.style.transform = "translateY(0)";
        }, 180);
      }
    });
  });
}

// 5. Мягкие появления секций при скролле (Observer)
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const animatedElements = document.querySelectorAll(".principle-card, .contact-box, .section-head");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  animatedElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
  });
}
