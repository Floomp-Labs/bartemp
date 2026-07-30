const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const events = document.querySelectorAll("[data-event]");

function setHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMobileNav() {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  mobileNav.hidden = true;
  document.body.style.overflow = "";
}

function openMobileNav() {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
  mobileNav.hidden = false;
  document.body.style.overflow = "hidden";
}

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  if (expanded) closeMobileNav();
  else openMobileNav();
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

events.forEach((event) => {
  const trigger = event.querySelector(".event-trigger");
  trigger?.addEventListener("click", () => {
    const isOpen = event.classList.contains("is-open");

    events.forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".event-trigger")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      event.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

const revealTargets = document.querySelectorAll(
  ".section-inner, .vibe-strip, .events-board, .visit-grid"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((el) => observer.observe(el));

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
