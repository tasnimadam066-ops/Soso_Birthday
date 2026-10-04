/* ============================================================
   BIRTHDAY UNIVERSE — EASY CUSTOMIZATION
   Edit the values below to personalize the experience.
   ============================================================ */
const CONFIG = {
  name: "Sofia",
  greeting: "Happy Birthday SOSO ✦",
  quote: "You make my heart smile every day. I’m so lucky to have you in my life. ",  
  finalMessage: "May your next chapter be full of light, laughter and beautiful surprises.",
  // Replace these with your own image URLs if you want:
  // "https://example.com/photo1.jpg"
  photos: [
    "birthday-photo.jpeg",
    "Sofia.jpeg",
    "darling.jpeg",
    "hub.jpeg",
    "sofiaa.jpeg",
    "soso.jpeg",
  ]
};

const $ = (id) => document.getElementById(id);
const phases = {
  countdown: $("countdownPhase"),
  reveal: $("revealPhase"),
  main: $("mainPhase"),
  card: $("cardPhase"),
  finale: $("finalePhase")
};

let currentPhotoSet = 0;
let touchStartX = 0;

function showPhase(phase) {
  Object.values(phases).forEach(p => p.classList.remove("active"));
  phase.classList.add("active");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ------------------------- STAR FIELD ------------------------- */
const starsCanvas = $("starsCanvas");
const sctx = starsCanvas.getContext("2d");
let stars = [];

function resizeCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  return dpr;
}

function createStars() {
  stars = Array.from({ length: Math.min(180, Math.floor(innerWidth / 5)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + .2,
    a: Math.random(),
    speed: Math.random() * .015 + .004,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawStars(time = 0) {
  const dpr = window.devicePixelRatio || 1;
  sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  sctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const s of stars) {
    const alpha = .18 + ((Math.sin(time * s.speed + s.phase) + 1) / 2) * .7;
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sctx.fillStyle = `rgba(255,210,238,${alpha})`;
    sctx.fill();
  }
  requestAnimationFrame(drawStars);
}

/* ------------------------- MATRIX RAIN ------------------------- */
const matrixCanvas = $("matrixCanvas");
const mctx = matrixCanvas.getContext("2d");
let matrix = { columns: [], font: 16, dpr: 1 };

const chars = "01アイウエオカキクケコサシスセソ♥✦✧ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function setupMatrix() {
  matrix.dpr = resizeCanvas(matrixCanvas);
  matrix.font = Math.max(13, Math.floor(innerWidth / 70));
  const cols = Math.ceil(innerWidth / matrix.font);
  matrix.columns = Array.from({ length: cols }, () => Math.random() * -innerHeight / matrix.font);
}

function drawMatrix() {
  const dpr = matrix.dpr;
  mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  mctx.fillStyle = "rgba(4,0,8,.09)";
  mctx.fillRect(0, 0, innerWidth, innerHeight);
  mctx.font = `${matrix.font}px monospace`;

  matrix.columns.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * matrix.font;
    const alpha = .25 + Math.random() * .65;
    mctx.fillStyle = `rgba(255, ${30 + Math.floor(Math.random()*90)}, ${130 + Math.floor(Math.random()*100)}, ${alpha})`;
    mctx.shadowBlur = 10;
    mctx.shadowColor = "#ff007f";
    mctx.fillText(char, x, y * matrix.font);

    if (y * matrix.font > innerHeight && Math.random() > .975) matrix.columns[i] = 0;
    matrix.columns[i] += .55 + Math.random() * .8;
  });
  mctx.shadowBlur = 0;
  requestAnimationFrame(drawMatrix);
}

/* ------------------------- REVEAL SEQUENCE ------------------------- */
async function runReveal() {
  showPhase(phases.reveal);
  const words = ["HAPPY", "BIRTHDAY", "TO", CONFIG.name.toUpperCase(), "❤️"];

  for (const word of words) {
    $("revealWord").textContent = word;
    $("revealWord").style.animation = "none";
    void $("revealWord").offsetWidth;
    $("revealWord").style.animation = "wordIn .75s cubic-bezier(.16,1,.3,1) both";
    await sleep(word === "❤️" ? 1000 : 850);
  }

  matrixCanvas.style.opacity = "0";
  showPhase(phases.main);
  await sleep(700);
  $("heroTitle").textContent = `Happy Birthday, ${CONFIG.name}`;

}

/* ------------------------- CARD / PHOTOS ------------------------- */
function updatePhotoSet() {
  const i = currentPhotoSet % CONFIG.photos.length;
  const j = (i + 1) % CONFIG.photos.length;
  $("photo1").src = CONFIG.photos[i];
  $("photo2").src = CONFIG.photos[j];
}

function cyclePhotos(direction = 1) {
  currentPhotoSet = (currentPhotoSet + direction + CONFIG.photos.length) % CONFIG.photos.length;
  const cards = document.querySelectorAll(".polaroid");
  cards.forEach((card, idx) => {
    card.style.opacity = "0";
    card.style.transform = idx === 0 ? "translateX(25px) rotate(-8deg)" : "translateX(-25px) rotate(8deg)";
  });
  setTimeout(() => {
    updatePhotoSet();
    cards.forEach((card, idx) => {
      card.style.opacity = "1";
      card.style.transform = idx === 0 ? "rotate(-5deg)" : "rotate(5deg) translateY(12px)";
    });
  }, 220);
}

function makeHeartCollage() {
  const container = $("heartCollage");
  container.innerHTML = "";
  const total = Math.min(42, Math.max(24, CONFIG.photos.length * 5));
  const cx = 50, cy = 48;

  // Parametric heart points, scaled to the collage.
  const points = [];
  for (let i = 0; i < total; i++) {
    const t = (Math.PI * 2 * i) / total;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    points.push({ x: cx + x * 1.65, y: cy - y * 1.65 });
  }

  for (let i = 0; i < total; i++) {
    const img = document.createElement("img");
    img.className = "collage-photo";
    img.src = CONFIG.photos[i % CONFIG.photos.length];
    img.alt = "Birthday memory";
    const p = points[i];
    const angle = Math.random() * 18 - 9;
    img.style.left = `${p.x}%`;
    img.style.top = `${p.y}%`;
    img.style.setProperty("--tx", "-50%");
    img.style.setProperty("--ty", "-50%");
    img.style.setProperty("--tr", `${angle}deg`);
    img.style.setProperty("--sx", `${(Math.random()-.5)*500}px`);
    img.style.setProperty("--sy", `${(Math.random()-.5)*500}px`);
    img.style.setProperty("--sr", `${Math.random()*90-45}deg`);
    img.style.setProperty("--delay", `${i * 0.035}s`);
    container.appendChild(img);
  }
}

/* ------------------------- FLOW ------------------------- */
async function startExperience() {
  $("heroTitle").textContent = "Happy Birthday";
  $("heroSubtitle").textContent = "I made a tiny universe just for you.";
  $("editableGreeting").textContent = CONFIG.greeting;
  $("quoteText").textContent = CONFIG.quote;
  $("finalMessage").textContent = CONFIG.finalMessage;


  showPhase(phases.countdown);
  matrixCanvas.style.opacity = "1";
  $("countdown").textContent = "3";

  await sleep(950);
  $("countdown").textContent = "2";
  $("countdown").style.animation = "none";
  void $("countdown").offsetWidth;
  $("countdown").style.animation = "countdownPulse .9s ease both";

  await sleep(950);
  $("countdown").textContent = "1";
  $("countdown").style.animation = "none";
  void $("countdown").offsetWidth;
  $("countdown").style.animation = "countdownPulse .9s ease both";

  await sleep(950);
  runReveal();
}

$("envelopeButton").addEventListener("click", () => {
  showPhase(phases.card);
  setTimeout(() => $("photoCard").classList.add("open"), 80);
});

$("openCard").addEventListener("click", () => {
  $("photoCard").classList.add("open");
});

$("closeCard").addEventListener("click", () => {
  $("photoCard").classList.remove("open");
  setTimeout(() => showPhase(phases.main), 650);
});

$("finishCard").addEventListener("click", () => {
  $("photoCard").classList.remove("open");
  setTimeout(() => {
    showPhase(phases.finale);
    $("heartCanvas").style.opacity = "1";
    makeHeartCollage();
  }, 700);
});

$("prevPhoto").addEventListener("click", (e) => {
  e.stopPropagation();
  cyclePhotos(-1);
});
$("nextPhoto").addEventListener("click", (e) => {
  e.stopPropagation();
  cyclePhotos(1);
});

$("photoStage").addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

$("photoStage").addEventListener("touchend", e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 40) cyclePhotos(dx < 0 ? 1 : -1);
}, { passive: true });

$("photoStage").addEventListener("click", e => {
  if (e.target.closest(".photo-nav")) return;
  cyclePhotos(1);
});

$("restartButton").addEventListener("click", () => {
  currentPhotoSet = 0;
  updatePhotoSet();
  $("photoCard").classList.remove("open");
  $("heartCanvas").style.opacity = "0";
  matrixCanvas.style.opacity = "1";
  startExperience();
});

/* ------------------------- HEART PARTICLE GLOW ------------------------- */
const heartCanvas = $("heartCanvas");
const hctx = heartCanvas.getContext("2d");
let heartParticles = [];

function setupHeartParticles() {
  const dpr = resizeCanvas(heartCanvas);
  heartParticles = Array.from({ length: 75 }, () => ({
    x: Math.random() * innerWidth,
    y: innerHeight + Math.random() * 100,
    vy: -(Math.random() * .5 + .2),
    size: Math.random() * 2 + 1,
    a: Math.random() * .5 + .15
  }));
  heartCanvas.dataset.dpr = dpr;
}

function drawHeartParticles() {
  const dpr = Number(heartCanvas.dataset.dpr || 1);
  hctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  hctx.clearRect(0, 0, innerWidth, innerHeight);
  heartParticles.forEach(p => {
    p.y += p.vy;
    if (p.y < -10) {
      p.y = innerHeight + 10;
      p.x = Math.random() * innerWidth;
    }
    hctx.beginPath();
    hctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    hctx.fillStyle = `rgba(255,70,170,${p.a})`;
    hctx.shadowBlur = 12;
    hctx.shadowColor = "#ff008f";
    hctx.fill();
  });
  hctx.shadowBlur = 0;
  requestAnimationFrame(drawHeartParticles);
}

/* ------------------------- INIT ------------------------- */
function resizeAll() {
  resizeCanvas(starsCanvas);
  setupMatrix();
  setupHeartParticles();
  createStars();
}

window.addEventListener("resize", resizeAll);

resizeAll();
drawStars();
drawMatrix();
drawHeartParticles();
updatePhotoSet();
startExperience();
