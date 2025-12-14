// ===== MODIFIKASI: Partikel lebih banyak (25), beragam bentuk & warna =====
function createFloatingDots() {
  const body = document.body;
  const colors = ['#ffd166', '#ff4d6d', '#4db8e6', '#ff8fac', '#f9c74f'];
  const shapes = ['★', '●', '◆', '✦', '♥'];
  
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.top = Math.random() * 100 + 'vh';
    
    const size = (3 + Math.random() * 8) + 'px';
    dot.style.width = size;
    dot.style.height = size;
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.style.background = color;
    dot.style.color = color;
    
    if (Math.random() > 0.6) {
      dot.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      dot.style.background = 'transparent';
      dot.style.fontSize = size;
      dot.style.lineHeight = size;
    }
    
    dot.style.animationDuration = (10 + Math.random() * 20) + 's';
    dot.style.animationDelay = Math.random() * 5 + 's';
    
    body.appendChild(dot);
  }
}

// === Scroll Reveal: CEPAT & RESPONSIF ===
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
        if (delay <= 0) {
          entry.target.classList.add('active');
        } else {
          const quickDelay = Math.min(delay, 250);
          setTimeout(() => {
            entry.target.classList.add('active');
          }, quickDelay);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

// === Navigasi Halaman - Kembali ke Halaman 1 ===
function showPage1() {
  document.getElementById('page2').style.display = 'none';
  document.getElementById('page1').style.display = 'block';
  window.scrollTo(0, 0);
}

// === Animasi Tombol Dukung - Transisi ke Halaman Poster ===
function initSupportButton() {
  const btn = document.getElementById('supportBtn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 600);

    const symbols = ['★', '✿', '😎', '🎉', '✨', '💫'];
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + window.scrollX + rect.width / 2;
    const centerY = rect.top + window.scrollY + rect.height / 2;

    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = centerX + 'px';
      p.style.top = centerY + 'px';
      p.style.color = Math.random() > 0.6 ? '#ff4d6d' : '#ffd166';
      p.style.fontSize = (16 + Math.random() * 10) + 'px';
      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 150;
      const dur = 800 + Math.random() * 600;

      p.animate([
        { opacity: 0, transform: 'translate(0,0) scale(0)' },
        { opacity: 1, transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(1)` },
        { opacity: 0, transform: `translate(${Math.cos(angle) * dist * 1.4}px, ${Math.sin(angle) * dist * 1.4}px) scale(1.5)` }
      ], {
        duration: dur,
        easing: 'cubic-bezier(0, 0.9, 0.57, 1)',
        fill: 'forwards'
      });

      setTimeout(() => p.remove(), dur);
    }

    setTimeout(() => {
      document.getElementById('page1').style.display = 'none';
      const page2 = document.getElementById('page2');
      page2.style.display = 'block';
      page2.classList.add('show');
      window.scrollTo(0, 0);
    }, 400);
  });
}

// ===== FUNGSI BARU: Mulai Pengalaman & Mainkan Musik =====
function initStartButton() {
  const startBtn = document.getElementById('startBtn');
  const cheerMusic = document.getElementById('cheerMusic');
  const startSection = document.getElementById('startSection');
  const page1 = document.getElementById('page1');

  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    // Coba putar musik
    cheerMusic.volume = 0.5;
    const playPromise = cheerMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        // Silent catch — aman di browser modern
      });
    }

    // Sembunyikan tombol mulai
    startSection.style.display = 'none';
    
    // Tampilkan halaman utama
    page1.style.display = 'block';
    
    // Jalankan fitur interaktif
    initScrollReveal();
    initSupportButton();
  });
}

// ===== Jalankan saat DOM siap =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createFloatingDots();
    initStartButton();
  });
} else {
  createFloatingDots();
  initStartButton();
}