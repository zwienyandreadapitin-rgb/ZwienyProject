// ===================================
// PORTFOLIO - Zwieny Andrea Dapitin
// ===================================

const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");

// ----- Mobile menu -----
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// ----- Navbar shadow + active link on scroll -----
function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 10);

  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", onScroll);
onScroll();

// ----- Scroll reveal animation -----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ----- Photo fallback (if an image file is missing) -----
document.querySelectorAll(".photo-circle img, .certificate img").forEach((img) => {
  const hide = () => {
    if (img.closest(".certificate")) {
      // simple placeholder until you add images/certificate.jpg
      img.src =
        "data:image/svg+xml," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="100%" height="100%" fill="#ece3b8"/><text x="50%" y="50%" text-anchor="middle" font-family="serif" font-size="28" fill="#8a7f55">Certificate</text></svg>'
        );
      return;
    }
    img.style.visibility = "hidden";
    img.parentElement.classList.add("no-img");
  };
  if (img.complete && img.naturalWidth === 0) hide();
  img.addEventListener("error", hide);
  img.addEventListener("load", () => {
    img.style.visibility = "visible";
    img.parentElement.classList.remove("no-img");
  });
});

// ----- Search: jump to a section -----
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const keywords = {
  home: ["home", "welcome", "start"],
  about: ["about", "me", "zwieny", "bsit", "student"],
  skills: ["skill", "skills", "achievement", "certificate", "figma", "canva", "capcut", "award"],
  contact: ["contact", "phone", "email", "location", "message"],
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  const match = Object.keys(keywords).find((id) =>
    keywords[id].some((word) => word.includes(query) || query.includes(word))
  );

  if (match) {
    const target = document.getElementById(match);
    target.scrollIntoView({ behavior: "smooth" });
    target.classList.remove("search-hit");
    void target.offsetWidth; // restart animation
    target.classList.add("search-hit");
    searchInput.value = "";
  } else {
    alert('No results found for "' + query + '"');
  }
});

// ----- Certificate lightbox -----
const certificate = document.getElementById("certificate");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

certificate.addEventListener("click", () => {
  lightboxImg.src = certificate.querySelector("img").src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ----- Contact form validation -----
const contactForm = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  emailInput.classList.toggle("invalid", !emailOk);
  messageInput.classList.toggle("invalid", message === "");

  if (!emailOk) {
    formStatus.textContent = "Please enter a valid email address.";
    return;
  }
  if (message === "") {
    formStatus.textContent = "Please write a message.";
    return;
  }

  formStatus.textContent = "Thank you! Your message has been sent.";
  contactForm.reset();
  setTimeout(() => (formStatus.textContent = ""), 4000);
});

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
