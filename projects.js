// База данных проектов
// Текущий проект: личный флагманский AI-бот QNutriAI
// Дополнительные проекты можно легко добавлять в этот массив в том же формате.

const PROJECTS_DATA = [
  {
    id: 1,
    category: "bots",
    categoryLabel: "Telegram-бот + Mini App",
    title: "QNutriAI — Умный фитнес-бот и Mini App для подсчета калорий и КБЖУ с ИИ",
    badge: "Личный проект • Production",
    task: "Классический подсчет калорий в мобильных приложениях отнимает слишком много времени: нужно взвешивать каждый ингредиент, искать его в огромных базах и вручную вбивать граммы.",
    solution: "Разработал Telegram-бота на Python (aiogram 3) с интерактивным Telegram Mini App на борту. Интегрировал ИИ-сканер блюд по фото и тексту, расчет индивидуальной нормы BMR/TDEE по формуле Миффлина-Сан Жеора, трекер воды и кольцевой дашборд прогресса.",
    result: "Работающий инструмент: пользователь отправляет фото тарелки или пишет «2 яйца и тост с авокадо», а нейросеть за секунды определяет КБЖУ и заносит блюдо в дневник без рутины.",
    tags: ["Python 3.10+", "aiogram 3", "Telegram Mini App", "aiohttp", "aiosqlite (SQLite)", "ИИ-распознавание (Vision)", "JavaScript", "HTML5 / CSS3"],
    metrics: [
      { label: "Ввод данных", value: "По фото / тексту" },
      { label: "Скорость оценки", value: "~3–5 сек" },
      { label: "Формат", value: "Bot + Mini App" }
    ],
    demoLink: "https://t.me/QNutriAIbot",
    demoLinkLabel: "Запустить @QNutriAIbot",
    previewType: "bot",
    accentTone: "sky"
  }
];

// Экспорт для модулей или глобальный объект
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS_DATA };
}
