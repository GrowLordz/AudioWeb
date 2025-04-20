window.addEventListener("load", () => {
  // Loader screen
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }, 2200);

  // Like button state restore
  const likeBtn = document.querySelector(".like");
  if (localStorage.getItem("spotify_like") === "true") {
    likeBtn.classList.add("active");
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(`${savedTheme}-theme`);
  }
});

// Audio controls
const audio = document.querySelector("audio");
const volumeSlider = document.querySelector(".volume-slider");
const repeatBtn = document.querySelector(".repeat");
const shuffleBtn = document.querySelector(".shuffle");
const likeBtn = document.querySelector(".like");

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

let isRepeating = false;
repeatBtn.addEventListener("click", () => {
  isRepeating = !isRepeating;
  audio.loop = isRepeating;
  repeatBtn.classList.toggle("active", isRepeating);
});

shuffleBtn.addEventListener("click", () => {
  shuffleBtn.classList.toggle("active");
  alert("Fitur shuffle aktif (simulasi) – bisa dikembangkan ke playlist nanti.");
});

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("active");
  const liked = likeBtn.classList.contains("active");
  localStorage.setItem("spotify_like", liked ? "true" : "false");
});

// Particle Effect
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: Math.random() * 0.3 - 0.15,
  dy: Math.random() * 0.3 - 0.15,
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Theme Switcher Toggle dengan animasi muncul berurutan
const mainToggle = document.querySelector('.main-toggle');
const themeOptions = document.querySelector('.theme-options');
const themeButtons = document.querySelectorAll('.theme-btn');

mainToggle.addEventListener('click', () => {
  themeOptions.classList.toggle('active');

  if (themeOptions.classList.contains('active')) {
    themeButtons.forEach((btn, i) => {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        btn.style.transition = 'all 0.3s ease';
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      }, i * 100);
    });
  }
});

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.body.className = "";
    const selected = `${button.dataset.theme}-theme`;
    document.body.classList.add(selected);
    localStorage.setItem("theme", button.dataset.theme);
    themeOptions.classList.remove('active');
  });
});

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,
});
