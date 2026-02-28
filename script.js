const revealNodes = [...document.querySelectorAll('.reveal')];
const toggleButtons = [...document.querySelectorAll('.toggle-btn')];
const planCards = [...document.querySelectorAll('.plan-card')];
const priceFormatter = new Intl.NumberFormat('es-AR');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16 },
);

revealNodes.forEach((node) => observer.observe(node));

function applyBilling(mode) {
  const monthly = mode === 'month';

  toggleButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.billing === mode);
  });

  planCards.forEach((card) => {
    const value = monthly ? card.dataset.month : card.dataset.year;
    const target = card.querySelector('[data-price]');
    if (target) {
      const numeric = Number(value);
      target.textContent = Number.isFinite(numeric) ? priceFormatter.format(numeric) : value || '-';
    }
  });
}

toggleButtons.forEach((btn) => {
  btn.addEventListener('click', () => applyBilling(btn.dataset.billing || 'month'));
});

applyBilling('month');
