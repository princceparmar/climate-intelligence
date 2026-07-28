document.addEventListener('DOMContentLoaded', () => {
  const updateClock = () => {
    const now = new Date();
    const dateText = now.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeText = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const dateEl = document.getElementById('current-date');
    const timeEl = document.getElementById('current-time');
    const lastUpdatedEl = document.getElementById('last-updated');

    if (dateEl) dateEl.textContent = dateText;
    if (timeEl) timeEl.textContent = timeText;
    if (lastUpdatedEl) {
      lastUpdatedEl.textContent = `Last updated: ${dateText} · ${timeText}`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  const toggleBtn = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (toggleBtn && navbarCollapse) {
    toggleBtn.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    }
  });

  const charts = document.querySelectorAll('[data-chart]');
  charts.forEach((canvas) => {
    const chartType = canvas.dataset.chart;
    const labels = JSON.parse(canvas.dataset.labels || '[]');
    const values = JSON.parse(canvas.dataset.values || '[]');
    const color = canvas.dataset.color || '#4fd1c5';

    if (canvas.getContext && labels.length && values.length) {
      new Chart(canvas, {
        type: chartType,
        data: {
          labels,
          datasets: [{
            label: canvas.dataset.label || 'Trend',
            data: values,
            borderColor: color,
            backgroundColor: `${color}33`,
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: { color: '#9cb4c8' },
              grid: { color: 'rgba(255,255,255,0.08)' }
            },
            x: {
              ticks: { color: '#9cb4c8' },
              grid: { color: 'rgba(255,255,255,0.07)' }
            }
          }
        }
      });
    }
  });
});
