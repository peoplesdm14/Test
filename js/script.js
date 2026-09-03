/* ============================================================
   BLUE SKY SALES, INC. — site data & behavior
   ============================================================ */

/* -----------------------------------------------------------
   JOB PHOTOS — "Our Work" gallery
   To add a completed job:
     1. Drop the photo file into /images/jobs/  (e.g. images/jobs/smith-kitchen.jpg)
     2. Add an entry below with the image path, a title, and a caption.
   New entries can go anywhere in the array — the newest doesn't need
   to be last. Remove the placeholder entries once you have real photos.
   ----------------------------------------------------------- */
const jobPhotos = [
  { image: "images/jobs/placeholder.svg", title: "Add Your First Job Photo", caption: "Replace this card — see instructions below the gallery." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Kitchen, roof, slab, addition — whatever you finished last." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Before/after pairs work great here too." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Mesquite, Garland, Balch Springs, Sunnyvale..." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Commercial build-outs count too." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Keep going — as many jobs as you've got." }
];

/* -----------------------------------------------------------
   SAMPLE REVIEWS — replace with your real customer reviews.
   Each entry: name, location, rating (1-5), text.
   ----------------------------------------------------------- */
const sampleReviews = [
  { name: "Sample Customer", location: "Mesquite, TX", rating: 5, text: "This is a placeholder review. Swap the entries in sampleReviews (js/script.js) for your real customer feedback." },
  { name: "Sample Customer", location: "Garland, TX", rating: 5, text: "Another placeholder — great spot to feature a customer quote about a finished remodel or roof job." },
  { name: "Sample Customer", location: "Balch Springs, TX", rating: 4, text: "Placeholder review. Real reviews submitted through the form below will be emailed to Blue Sky Sales for approval and can be added right here." }
];

const OWNER_EMAIL = "peoplesdm14@gmail.com";

/* ---------------- Gallery render ---------------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = jobPhotos.map(job => `
    <div class="gallery-card">
      <figure><img src="${job.image}" alt="${job.title}" loading="lazy"></figure>
      <div class="gallery-caption">
        <h4>${job.title}</h4>
        <p>${job.caption}</p>
      </div>
    </div>
  `).join("");
}

/* ---------------- Reviews render ---------------- */
function starString(rating) {
  const r = Math.max(1, Math.min(5, Number(rating) || 5));
  return "★★★★★☆☆☆☆☆".slice(5 - r, 10 - r);
}

function getStoredReviews() {
  try {
    return JSON.parse(localStorage.getItem("bss_pending_reviews") || "[]");
  } catch (e) {
    return [];
  }
}

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;
  const pending = getStoredReviews();

  const sampleHtml = sampleReviews.map(r => `
    <div class="review-card">
      <div class="stars">${starString(r.rating)}</div>
      <p class="review-text">&ldquo;${r.text}&rdquo;</p>
      <p class="reviewer">${r.name}<span>${r.location || ""}</span></p>
    </div>
  `).join("");

  const pendingHtml = pending.map(r => `
    <div class="review-card pending">
      <div class="stars">${starString(r.rating)}</div>
      <p class="review-text">&ldquo;${r.text}&rdquo;</p>
      <p class="reviewer">${r.name}<span>${r.location || ""}</span></p>
    </div>
  `).join("");

  grid.innerHTML = sampleHtml + pendingHtml;
}

/* ---------------- Star rating widget ---------------- */
function initStarRating() {
  const widget = document.getElementById("starRating");
  const hidden = document.getElementById("revRating");
  if (!widget || !hidden) return;

  function paint(rating) {
    widget.querySelectorAll("span").forEach(s => {
      s.classList.toggle("active", Number(s.dataset.star) <= rating);
    });
  }

  paint(Number(widget.dataset.rating));

  widget.querySelectorAll("span").forEach(star => {
    star.addEventListener("click", () => {
      const rating = Number(star.dataset.star);
      widget.dataset.rating = rating;
      hidden.value = rating;
      paint(rating);
    });
    star.addEventListener("mouseenter", () => paint(Number(star.dataset.star)));
  });
  widget.addEventListener("mouseleave", () => paint(Number(widget.dataset.rating)));
}

/* ---------------- Review form: save locally + email owner ---------------- */
function initReviewForm() {
  const form = document.getElementById("reviewForm");
  const hint = document.getElementById("reviewFormHint");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const location = form.location.value.trim();
    const rating = Number(form.rating.value) || 5;
    const text = form.review.value.trim();
    if (!name || !text) return;

    const entry = { name, location, rating, text, date: new Date().toISOString() };
    const stored = getStoredReviews();
    stored.push(entry);
    localStorage.setItem("bss_pending_reviews", JSON.stringify(stored));
    renderReviews();

    const subject = `New website review from ${name} (${rating}★)`;
    const body = [
      `Name: ${name}`,
      `Location: ${location || "n/a"}`,
      `Rating: ${rating} / 5`,
      "",
      "Review:",
      text
    ].join("\n");
    const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    form.reset();
    initStarRating();
    hint.textContent = "Thanks! Your review was added below and your email app should open so you can send it to us directly.";
  });
}

/* ---------------- Contact form: mailto ---------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("contactFormHint");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    const subject = `New project inquiry from ${name} — ${service}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone || "n/a"}`,
      `Email: ${email}`,
      `Project Type: ${service}`,
      "",
      "Details:",
      message
    ].join("\n");
    const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    hint.textContent = "Thanks! Your email app should open with your message ready to send to Blue Sky Sales.";
    form.reset();
  });
}

/* ---------------- Mobile nav ---------------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------- Animated stat counters ---------------- */
function initStatCounters() {
  const stats = document.querySelectorAll(".stat-num");
  if (!stats.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.count) || 0;
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(el => observer.observe(el));
}

/* ---------------- Back to top ---------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
}

/* ---------------- Init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderReviews();
  initStarRating();
  initReviewForm();
  initContactForm();
  initNav();
  initStatCounters();
  initBackToTop();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
