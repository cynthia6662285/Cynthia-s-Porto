const projects = {
  zeta: {
    type: "WEB PROJECT · SYSTEM ANALYSIS",
    title: "ZETA E-Procurement",
    description: "Sistem pengadaan barang dan jasa berbasis web yang saya rancang dengan fokus pada analisis kebutuhan, alur proses bisnis, struktur database, dan komunikasi API.",
    details: [
      ["Peran", "System Analyst"],
      ["Fokus", "Requirement analysis, use case & activity diagram, database design"],
      ["Teknologi", "Laravel, PHP, Blade, JavaScript, CSS, REST API, JWT Authentication"],
      ["Perancangan", "StarUML, MySQL Workbench"]
    ],
    github: "https://github.com/cynthia6662285"
  },
  keuanganku: {
    type: "WEB PROJECT · SYSTEM ANALYSIS",
    title: "Keuanganku",
    description: "Project personal finance untuk pencatatan dan pengelolaan keuangan pribadi, saya kerjakan dari analisis kebutuhan sampai jadi aplikasi yang bisa dipakai.",
    details: [
      ["Peran", "System Analyst & Developer"],
      ["Fokus", "Use case, activity diagram, alur proses sistem"],
      ["Teknologi", "Laravel, MySQL"],
      ["Perancangan", "StarUML, MySQL Workbench"]
    ],
    github: "https://github.com/cynthia6662285"
  },
  mobile: {
    type: "MOBILE PROJECT · SYSTEM ANALYSIS",
    title: "ZETA Mobile E-Tender",
    description: "Aplikasi mobile pendamping ZETA E-Procurement, supaya proses tender tetap bisa dipantau dari genggaman tanpa harus buka laptop.",
    details: [
      ["Peran", "System Analyst & Mobile Developer"],
      ["Fokus", "Kebutuhan fungsional, alur aplikasi berdasarkan sistem e-procurement"],
      ["Teknologi", "Ionic, Angular, TypeScript, HTML, SCSS, JavaScript, REST API"],
      ["Perancangan", "Struktur data & komunikasi ke backend"]
    ],
    github: "https://github.com/cynthia6662285"
  },
  organic: {
    type: "MOBILE PROJECT · MACHINE LEARNING",
    title: "OrganicTech",
    description: "Aplikasi mobile yang bisa menebak seberapa segar sayuran hanya dari fotonya. Memadukan deteksi objek dengan analisis parameter warna untuk menghasilkan persentase kesegaran.",
    details: [
      ["Peran", "System Analyst & Mobile Developer"],
      ["Alur", "Camera → MobileNet → Canvas → Rule-Based Analysis → Result → Firestore"],
      ["Teknologi", "Ionic, Angular, TypeScript, SCSS, Capacitor, TensorFlow.js, MobileNet, Firebase"],
      ["Fitur", "Scan, riwayat, dashboard, data referensi, pengaturan"],
      ["Penyimpanan", "Firebase Firestore, riwayat scan diisolasi per Device ID"]
    ],
    github: "https://github.com/cynthia6662285"
  },
  visualearn: {
    type: "GEMASTIK 2026 · USER EXPERIENCE DESIGN",
    title: "VisuaLearn",
    description: "Rancangan aplikasi pendamping kuliah untuk mahasiswa Tuli, digarap bersama tim Vandrafcy Tech untuk GEMASTIK XIX 2026. Proyek ini berupa riset pengguna dan high-fidelity prototype, bukan implementasi aplikasi production. Jadi, belum ada repository GitHub-nya, tapi proposal lengkapnya bisa diunduh di bawah ini.",
    details: [
      ["Peran", "Tim Vandrafcy Tech · User Experience Design"],
      ["Metode", "Human-Centred Design — user research, journey mapping, affinity mapping, co-design, 2 iterasi usability testing"],
      ["Fitur utama", "Transkripsi real-time, mode fokus, kamus istilah, penandaan bagian, koreksi transkripsi, ringkasan AI yang dapat diverifikasi, riwayat sesi"],
      ["Tools", "Figma, draw.io, Google Stitch"],
      ["Acuan", "WCAG 2.2, ISO 9241-210:2019, SDG 4 & SDG 10"]
    ],
    files: [
      { label: "Unduh Proposal (DOCX)", href: "assets/Proposal_GEMASTIK2026_Visualearn_Vandrafcy_Tech.docx" }
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalDescription = document.getElementById("modalDescription");
const modalDetails = document.getElementById("modalDetails");
const modalActions = document.getElementById("modalActions");

function buildActions(p) {
  const parts = [];
  if (p.github) {
    parts.push(`<a class="button button-dark" href="${p.github}" target="_blank" rel="noopener">Lihat GitHub <span>↗</span></a>`);
  }
  if (p.files) {
    p.files.forEach(f => {
      parts.push(`<a class="button button-dark" href="${f.href}" download>${f.label} <span class="file-icon">↓</span></a>`);
    });
  }
  parts.push(`<button class="text-link" data-close>Tutup</button>`);
  return parts.join("");
}

function openProject(key) {
  const p = projects[key];
  if (!p) return;
  modalType.textContent = p.type;
  modalTitle.textContent = p.title;
  modalDescription.textContent = p.description;
  modalDetails.innerHTML = p.details.map(row => `<div class="detail-row"><strong>${row[0]}</strong><span>${row[1]}</span></div>`).join("");
  modalActions.innerHTML = buildActions(p);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
document.querySelectorAll(".project-open").forEach(btn => {
  btn.addEventListener("click", () => openProject(btn.closest(".project").dataset.project));
});
document.addEventListener("click", e => {
  if (e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const navWrap = document.querySelector(".nav-wrap");
const navHeight = () => navWrap.offsetHeight || 76;
const darkSections = [...document.querySelectorAll(".projects")];

function updateNavTheme() {
  navWrap.classList.toggle("is-scrolled", window.scrollY > 20);
  const h = navHeight();
  const overDark = darkSections.some(section => {
    const rect = section.getBoundingClientRect();
    return rect.top < h && rect.bottom > 0;
  });
  navWrap.classList.toggle("on-dark", overDark);
}
window.addEventListener("scroll", updateNavTheme, { passive: true });
window.addEventListener("resize", updateNavTheme);
updateNavTheme();

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];
if (sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = navAnchors.find(a => a.getAttribute("href") === `#${entry.target.id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  sections.forEach(s => navObserver.observe(s));
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    formStatus.textContent = "Lengkapi dulu semua kolomnya, ya.";
    return;
  }
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:cynthiajuniartien666@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "Membuka aplikasi email kamu…";
});

const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));