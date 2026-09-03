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
  { image: "images/jobs/fixed-ladder-install.jpg", title: "Fixed Access Ladder Installation", caption: "Roof access ladder install, McKinney, TX." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Kitchen, roof, slab, addition — whatever you finished last." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Before/after pairs work great here too." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Mesquite, Garland, Balch Springs, Sunnyvale..." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Commercial build-outs count too." },
  { image: "images/jobs/placeholder.svg", title: "Add A Job Photo", caption: "Keep going — as many jobs as you've got." }
];

/* -----------------------------------------------------------
   BRANDS — manufacturers Blue Sky Sales represents and supplies.
   To use a real logo instead of the text placeholder:
     1. Drop the logo file into /images/brands/ (e.g. images/brands/bilco.svg)
     2. Set that brand's "logo" field below to the file path.
   Leave "logo" as null to keep the styled text placeholder.
   ----------------------------------------------------------- */
const brands = [
  { name: "Wilkinson Hi-Rise", category: "rep", logo: "images/brands/wilkinson-hi-rise.jpg" },
  { name: "Columbia Chutes", category: "rep", logo: "images/brands/columbia-chutes.jpg" },
  { name: "Bilco", category: "rep", logo: "images/brands/bilco.jpg", note: "North Texas Rep" },
  { name: "Precision Ladders", category: "rep", logo: "images/brands/precision-ladders.jpg" },
  { name: "Hadrian", category: "supply", logo: "images/brands/hadrian.jpg" },
  { name: "Bobrick", category: "supply", logo: "images/brands/bobrick.jpg" },
  { name: "ASI", category: "supply", logo: "images/brands/asi.jpg" },
  { name: "Bradley", category: "supply", logo: "images/brands/bradley.png" },
  { name: "Inpro", category: "supply", logo: "images/brands/inpro.jpg" },
  { name: "Larsen's Manufacturing", category: "supply", logo: "images/brands/larsens.jpg" },
  { name: "JL Industries", category: "supply", logo: "images/brands/jl-industries.jpg" },
  { name: "Salsbury Industries", category: "supply", logo: "images/brands/salsbury.jpg" },
  { name: "Scranton Products", category: "supply", logo: "images/brands/scranton-products.jpg" },
  { name: "+ More Brands", category: "supply", logo: null }
];

/* ---------------- Brands render ---------------- */
function renderBrands() {
  const repGrid = document.getElementById("brandsRepGrid");
  const supplyGrid = document.getElementById("brandsSupplyGrid");
  if (!repGrid || !supplyGrid) return;

  const tile = (b) => `
    <div class="brand-tile">
      ${b.logo
        ? `<img src="${b.logo}" alt="${b.name}" loading="lazy">`
        : `<span class="brand-wordmark">${b.name}</span>`}
      ${b.note ? `<span class="brand-tile-note">${b.note}</span>` : ""}
    </div>
  `;

  repGrid.innerHTML = brands.filter(b => b.category === "rep").map(tile).join("");
  supplyGrid.innerHTML = brands.filter(b => b.category === "supply").map(tile).join("");
}

/* -----------------------------------------------------------
   REVIEWS — pulled from the Blue Sky Sales Google Business listing.
   Each entry: name, location, rating (1-5), text.
   Add more any time, or add new ones the same way from the review form.
   ----------------------------------------------------------- */
const sampleReviews = [
  { name: "Amanda Burnett", location: "Google review", rating: 5, text: "We ordered some toilet partitions from them and when we went to pick them up, the man that loaded them for us was the nicest person and talking to him was like talking to my grandfather. They were quick to get us our order and just very easy to work with." },
  { name: "Deborah Long", location: "Google review", rating: 5, text: "Excellent people to work for." },
  { name: "Summer Ames", location: "Google review", rating: 5, text: "Would highly recommend!" },
  { name: "Familyistic Our Life", location: "Google review", rating: 5, text: "Fast reliable service." },
  { name: "Arturo Garcia", location: "Google review", rating: 5, text: "Helpful people here, very gentle highly recommended thank you guys." }
];

const OWNER_EMAIL = "peoplesdm14@gmail.com"; // reviews submitted via the review form go here
const QUOTE_EMAIL = "wendy@blueskysalesinc.com"; // "Request a Free Estimate" / contact form inquiries go here

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

/* ---------------- Contact form: silent send ----------------
   Quote requests submit silently in the background (no email app
   popup) via Web3Forms, a free service that relays the submission
   straight to QUOTE_EMAIL. This needs a one-time, no-password setup:
     1. Go to https://web3forms.com and enter wendy@blueskysalesinc.com.
     2. Web3Forms emails that inbox an access key instantly.
     3. Paste the key into WEB3FORMS_ACCESS_KEY below.
   Until a key is set, the form automatically falls back to opening
   the visitor's email app instead (same as before), so it always works.
   ----------------------------------------------------------- */
const WEB3FORMS_ACCESS_KEY = "";

function initContactForm() {
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("contactFormHint");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    if (WEB3FORMS_ACCESS_KEY) {
      submitBtn.disabled = true;
      hint.textContent = "Sending...";
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New project inquiry from ${name} — ${service}`,
            from_name: "Blue Sky Sales website",
            name,
            phone: phone || "n/a",
            email,
            "Project Type": service,
            message
          })
        });
        const data = await res.json();
        if (data.success) {
          hint.textContent = "Thanks! Your request has been sent to Blue Sky Sales — we'll follow up within one business day.";
          form.reset();
        } else {
          throw new Error(data.message || "Submission failed");
        }
      } catch (err) {
        hint.textContent = "Something went wrong sending that automatically — opening your email app instead.";
        const mailto = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(`New project inquiry from ${name} — ${service}`)}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone || "n/a"}\nEmail: ${email}\nProject Type: ${service}\n\nDetails:\n${message}`)}`;
        window.location.href = mailto;
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    // Fallback while no Web3Forms key is configured yet.
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
    const mailto = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    const decimals = el.dataset.count.includes(".") ? el.dataset.count.split(".")[1].length : 0;
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      el.textContent = (target * progress).toFixed(decimals);
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
  renderBrands();
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
