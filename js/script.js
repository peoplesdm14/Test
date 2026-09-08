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
   "url" (optional) makes the tile clickable, opening that brand's
   official website in a new tab.
   ----------------------------------------------------------- */
const brands = [
  { name: "Bilco", category: "rep", logo: "images/brands/bilco.jpg", note: "North Texas Rep", url: "https://www.bilco.com/" },
  { name: "Precision Ladders", category: "rep", logo: "images/brands/precision-ladders.jpg", note: "North Texas Rep", url: "https://precisionladders.com/" },
  { name: "Wilkinson Hi-Rise", category: "supply", logo: "images/brands/wilkinson-hi-rise.jpg", url: "https://www.whrise.com/" },
  { name: "Columbia Chutes", category: "supply", logo: "images/brands/columbia-chutes.jpg", url: "https://columbiachutes.com/" },
  { name: "Hadrian", category: "supply", logo: "images/brands/hadrian.jpg", url: "https://www.hadrian-inc.com/us/en.html" },
  { name: "Bobrick", category: "supply", logo: "images/brands/bobrick.jpg", url: "https://www.bobrick.com/" },
  { name: "ASI", category: "supply", logo: "images/brands/asi.jpg", url: "https://americanspecialties.com/" },
  { name: "Bradley", category: "supply", logo: "images/brands/bradley.png", url: "https://www.bradleycorp.com/" },
  { name: "Inpro", category: "supply", logo: "images/brands/inpro.jpg", url: "https://www.inprocorp.com/" },
  { name: "Larsen's Manufacturing", category: "supply", logo: "images/brands/larsens.jpg", url: "https://www.larsensmfg.com/" },
  { name: "JL Industries", category: "supply", logo: "images/brands/jl-industries.jpg", url: "https://thejlindustries.com/" },
  { name: "Salsbury Industries", category: "supply", logo: "images/brands/salsbury.jpg", url: "https://www.salsburyindustries.com/" },
  { name: "Scranton Products", category: "supply", logo: "images/brands/scranton-products.jpg", url: "https://www.scrantonproducts.com/" },
  { name: "+ More Brands", category: "supply", logo: null }
];

/* ---------------- Brands render ---------------- */
function renderBrands() {
  const repGrid = document.getElementById("brandsRepGrid");
  const supplyGrid = document.getElementById("brandsSupplyGrid");
  if (!repGrid || !supplyGrid) return;

  const tile = (b) => {
    const inner = `
      ${b.logo
        ? `<img src="${b.logo}" alt="${b.name}" loading="lazy">`
        : `<span class="brand-wordmark">${b.name}</span>`}
      ${b.note ? `<span class="brand-tile-note">${b.note}</span>` : ""}
    `;
    return b.url
      ? `<a class="brand-tile" href="${b.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${b.name}'s website">${inner}</a>`
      : `<div class="brand-tile">${inner}</div>`;
  };

  repGrid.innerHTML = brands.filter(b => b.category === "rep").map(tile).join("");
  supplyGrid.innerHTML = brands.filter(b => b.category === "supply").map(tile).join("");

  // Real brand count for the animated stat below the intro (excludes the "+ More Brands" filler tile).
  const countEl = document.getElementById("brandCountStat");
  if (countEl) countEl.dataset.count = String(brands.filter(b => b.logo).length);
}

/* -----------------------------------------------------------
   REVIEWS — real review text from the Blue Sky Sales Google Business
   listing. Names are shown as "Customer" rather than the real reviewer
   name. Add more any time by adding another entry below.
   ----------------------------------------------------------- */
const sampleReviews = [
  { name: "Customer", location: "Google review", rating: 5, text: "We ordered some toilet partitions from them and when we went to pick them up, the man that loaded them for us was the nicest person and talking to him was like talking to my grandfather. They were quick to get us our order and just very easy to work with." },
  { name: "Customer", location: "Google review", rating: 5, text: "Excellent people to work for." },
  { name: "Customer", location: "Google review", rating: 5, text: "Would highly recommend!" },
  { name: "Customer", location: "Google review", rating: 5, text: "Fast reliable service." },
  { name: "Customer", location: "Google review", rating: 5, text: "Helpful people here, very gentle highly recommended thank you guys." }
];

const QUOTE_EMAIL = "wendy@blueskysalesinc.com"; // "Request a Free Estimate" / contact form inquiries go here

/* -----------------------------------------------------------
   "Email Me" on the Line List sends OUT to whatever address a visitor
   types in — the opposite direction from the quote form (which sends IN
   to QUOTE_EMAIL). Web3Forms can't do that; it only relays visitor→owner.
   EmailJS (https://www.emailjs.com) is built for this: sign up, verify
   wendy@blueskysalesinc.com as the sending account, create a template
   with the line list PDF attached, and paste the three IDs below. Until
   then this falls back to opening the visitor's own email app, same
   pattern as WEB3FORMS_ACCESS_KEY above.
   ----------------------------------------------------------- */
const EMAILJS_PUBLIC_KEY = "";
const EMAILJS_SERVICE_ID = "";
const EMAILJS_TEMPLATE_ID = "";

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

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;
  grid.innerHTML = sampleReviews.map(r => `
    <div class="review-card">
      <div class="stars">${starString(r.rating)}</div>
      <p class="review-text">&ldquo;${r.text}&rdquo;</p>
      <p class="reviewer">${r.name}<span>${r.location || ""}</span></p>
    </div>
  `).join("");
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
  const serviceSelect = document.getElementById("cService");
  const revealFields = document.getElementById("contactRevealFields");
  const successScreen = document.getElementById("contactFormSuccess");
  const restartBtn = document.getElementById("contactFormRestart");
  if (!form) return;

  if (serviceSelect && revealFields) {
    serviceSelect.addEventListener("change", () => {
      revealFields.classList.toggle("shown", serviceSelect.value !== "");
    });
  }

  if (restartBtn && successScreen) {
    restartBtn.addEventListener("click", () => {
      successScreen.classList.remove("active");
      form.style.display = "";
      if (revealFields) revealFields.classList.remove("shown");
    });
  }

  const showSuccess = () => {
    form.reset();
    if (revealFields) revealFields.classList.remove("shown");
    if (successScreen) {
      form.style.display = "none";
      successScreen.classList.add("active");
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value || "General Inquiry";
    const qty = form.qty.value.trim();
    const needBy = form.needBy.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    let subject = `New project inquiry from ${name} — ${service}`;
    const extras = [];
    if (qty) extras.push(`Qty: ${qty}`);
    if (needBy) extras.push(`needed by ${needBy}`);
    if (extras.length) subject += ` (${extras.join(", ")})`;

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
            subject,
            from_name: "Blue Sky Sales website",
            name,
            phone: phone || "n/a",
            email,
            "Project Type": service,
            Quantity: qty || "n/a",
            "Needed By": needBy || "n/a",
            message
          })
        });
        const data = await res.json();
        if (data.success) {
          hint.textContent = "";
          showSuccess();
        } else {
          throw new Error(data.message || "Submission failed");
        }
      } catch (err) {
        hint.textContent = "Something went wrong sending that automatically — opening your email app instead.";
        const mailto = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone || "n/a"}\nEmail: ${email}\nProject Type: ${service}\nQuantity: ${qty || "n/a"}\nNeeded By: ${needBy || "n/a"}\n\nDetails:\n${message}`)}`;
        window.location.href = mailto;
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    // Fallback while no Web3Forms key is configured yet.
    const body = [
      `Name: ${name}`,
      `Phone: ${phone || "n/a"}`,
      `Email: ${email}`,
      `Project Type: ${service}`,
      `Quantity: ${qty || "n/a"}`,
      `Needed By: ${needBy || "n/a"}`,
      "",
      "Details:",
      message
    ].join("\n");
    const mailto = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    hint.textContent = "Thanks! Your email app should open with your message ready to send to Blue Sky Sales.";
    form.reset();
    if (revealFields) revealFields.classList.remove("shown");
  });
}

/* -----------------------------------------------------------
   LINE LIST — everything Blue Sky Sales sells, installs, and services.
   Powers the searchable/filterable list in the "Browse Our Full Line
   List" modal. Mirrors documents/blue-sky-sales-line-list.pdf — update
   both if the product lineup changes.
   ----------------------------------------------------------- */
const lineListCategories = [
  { category: "Toilet Partitions", note: "Global Stocking Distributor", items: ["Steel-baked enamel", "Stainless steel", "Plastic laminate", "Phenolic", "Solid plastic"] },
  { category: "Washroom Accessories", note: "Bobrick Stocking Distributor", items: ["Accessories for Physically Handicapped", "Dispensers – Soap, Lotion, Toilet Paper", "Feminine Napkin Dispensers & Waste Receptacle", "Grab Bars, Mirrors, Paper Towel Dispenser & Waste Receptacle", "Hand Dryers"] },
  { category: "Visual Display", items: ["Markerboards", "Tackboards", "Chalkboards", "Directory Boards", "Display Cases", "Dry Erase Wallcovering", "Projection Screens", "TV Mounting Brackets", "Projector Mounts"] },
  { category: "Impact Wall Protection", items: ["Corner Guards", "Bumper Rail/Crash Rail", "Hand Rail", "Door Protection"] },
  { category: "Building Accessories", items: ["Flagpoles", "Banner Poles", "Crowd Control – Post & Panels", "Trash Receptacles", "Ashtrays", "Louvers & Vents"] },
  { category: "Specialty Doors", items: ["Access Doors", "Dock Door Curtains & Dock Bumpers", "Impact Traffic Doors", "Rolling Doors", "Roof Hatches"] },
  { category: "Entrance Mats & Specialized Flooring", items: ["Athletic Flooring", "Floor Grid Systems", "Kitchen Matting"] },
  { category: "Fire Protection Equipment", items: ["Automatic Fire Vents", "Fire Extinguishers", "Fire Extinguisher Cabinets"] },
  { category: "Lockers & Wire Mesh Partitions", items: ["Folding Gates", "Personal Storage Lockers"] },
  { category: "Mail Boxes – Parcel Lockers", items: ["Private Mail Service", "United States Post Office Approved Units", "Mail Chutes"] },
  { category: "Partitions Systems", items: ["Operable Walls", "Room Dividers", "Accordian Doors", "Cubicle Curtain Track & Curtains/IV Track"] },
  { category: "Pneumatic Tube Conveyor", items: ["Air Chute Systems"] },
  { category: "Roofing Accessories", items: ["Fry Reglet & Flashing", "Roof Hatches", "Ladders", "Skylights"] },
  { category: "Signs – Identifying Devices", items: ["Building Directories", "Directory Boards", "Interior/Exterior Signage", "Letters & Plaques"] },
  { category: "Stair Products", items: ["Industrial", "Safety Resurfacer", "Stair Treads & Nosing (Anti-slip)"] },
  { category: "Trash & Linen Chutes", items: ["Trash Chutes", "Linen Chutes", "Chute Doors & Intake Stations"] }
];

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(`(${escapedQuery})`, "ig"), "<mark>$1</mark>");
}

/* ---------------- Line list modal ---------------- */
function initLineListModal() {
  const trigger = document.getElementById("lineListTrigger");
  const modal = document.getElementById("lineListModal");
  const grid = document.getElementById("lineListGrid");
  const chipsEl = document.getElementById("lineListChips");
  const searchInput = document.getElementById("lineListSearch");
  const emptyState = document.getElementById("lineListEmpty");
  const clearBtn = document.getElementById("lineListClear");
  const emailCapture = document.getElementById("lineListEmailCapture");
  const sentNote = document.getElementById("lineListSentNote");
  if (!trigger || !modal || !grid || !chipsEl || !searchInput) return;

  let activeCategory = null;
  let built = false;
  let sentNoteTimer = null;

  function buildLineListEmail() {
    const subject = "Blue Sky Sales, Inc. - Line List";
    const bodyLines = [
      "Thank you for your interest in Blue Sky Sales, Inc.",
      "",
      "Attached is your requested copy of our full line list, covering everything we sell, install, and service.",
      "",
      "If you have any questions or would like a quote, we're happy to help.",
      "",
      "Blue Sky Sales, Inc.",
      "(972) 288-7766 · wendy@blueskysalesinc.com",
      "806 Dalworth Dr, Mesquite, TX 75149"
    ];
    return { subject, body: bodyLines.join("\n") };
  }

  function showEmailButton() {
    emailCapture.innerHTML = `<button type="button" class="btn btn-outline btn-sm" id="lineListEmailBtn">✉ Email Me</button>`;
    document.getElementById("lineListEmailBtn").addEventListener("click", showEmailForm);
  }

  function showEmailForm() {
    emailCapture.innerHTML = `
      <form class="ll-email-form" id="lineListEmailForm">
        <input type="email" id="lineListEmailInput" placeholder="you@company.com" required>
        <button type="submit" class="btn btn-primary btn-sm">Send</button>
        <button type="button" class="ll-email-cancel" id="lineListEmailCancel" aria-label="Cancel">✕</button>
      </form>
    `;
    const form = document.getElementById("lineListEmailForm");
    const input = document.getElementById("lineListEmailInput");
    input.focus();

    document.getElementById("lineListEmailCancel").addEventListener("click", showEmailButton);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const toEmail = input.value.trim();
      if (!toEmail) return;

      const { subject, body } = buildLineListEmail();

      if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        // Real silent send: EmailJS relays this straight to `toEmail` with
        // the line list PDF attached inside the template — no popup, no
        // mailto. (Requires the EmailJS SDK script tag once keys are set.)
        try {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: toEmail,
            subject,
            message: body
          }, EMAILJS_PUBLIC_KEY);
        } catch (err) {
          window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
      } else {
        // Fallback while no EmailJS keys are configured yet: opens the
        // visitor's own email app pre-addressed to what they typed.
        window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      showEmailButton();
      clearTimeout(sentNoteTimer);
      sentNote.textContent = `✓ Sent to ${toEmail}`;
      sentNote.classList.add("show");
      sentNoteTimer = setTimeout(() => sentNote.classList.remove("show"), 4000);
    });
  }

  function renderChips() {
    const allChip = `<button type="button" class="ll-chip active" data-category="">All Categories</button>`;
    const chips = lineListCategories.map(c =>
      `<button type="button" class="ll-chip" data-category="${escapeHtml(c.category)}">${escapeHtml(c.category)}</button>`
    ).join("");
    chipsEl.innerHTML = allChip + chips;
    chipsEl.querySelectorAll(".ll-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        activeCategory = chip.dataset.category || null;
        chipsEl.querySelectorAll(".ll-chip").forEach(c => c.classList.toggle("active", c === chip));
        renderResults();
      });
    });
  }

  function renderResults() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    const cardsHtml = lineListCategories.map(cat => {
      if (activeCategory && cat.category !== activeCategory) return "";

      const categoryMatches = !query || cat.category.toLowerCase().includes(query);
      const items = categoryMatches
        ? cat.items
        : cat.items.filter(item => item.toLowerCase().includes(query));

      if (!items.length) return "";
      visibleCount++;

      const itemsHtml = items.map(item => `<li>${highlight(item, query)}</li>`).join("");
      return `
        <div class="ll-card">
          <h3 class="ll-card-title">${highlight(cat.category, query)}</h3>
          ${cat.note ? `<span class="ll-card-note">${escapeHtml(cat.note)}</span>` : ""}
          <ul>${itemsHtml}</ul>
        </div>
      `;
    }).join("");

    grid.innerHTML = cardsHtml;
    emptyState.hidden = visibleCount !== 0;
    grid.hidden = visibleCount === 0;
  }

  const open = () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (!built) {
      renderChips();
      renderResults();
      showEmailButton();
      built = true;
    }
    searchInput.focus();
  };
  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  trigger.addEventListener("click", open);
  modal.querySelectorAll("[data-pdf-close]").forEach(el => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });

  searchInput.addEventListener("input", renderResults);
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      activeCategory = null;
      chipsEl.querySelectorAll(".ll-chip").forEach(c => c.classList.toggle("active", !c.dataset.category));
      renderResults();
    });
  }
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

/* ---------------- Scroll reveal ---------------- */
function initScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Grid items fade/slide in with a slight stagger per card.
  const grids = document.querySelectorAll(
    ".services-grid, .gallery-grid, .reviews-grid, .brands-grid, .leadership-grid, .mission-grid"
  );
  grids.forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.classList.add("reveal");
      child.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
    });
  });

  // Section headers and a few standalone blocks fade in on their own.
  document.querySelectorAll(
    ".section > .wrap > .eyebrow, .section > .wrap > h2, .section > .wrap > .section-sub, " +
    ".about-media-box, .about-copy, .mini-stat:not(.mini-stat-inline), .line-list-cta, " +
    ".cta-band-inner, .contact-grid > *"
  ).forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
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
  initContactForm();
  initLineListModal();
  initNav();
  initStatCounters();
  initScrollReveal();
  initBackToTop();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
