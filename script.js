/* =====================
   SCROLL REVEAL
===================== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".animate").forEach(el => observer.observe(el));

/* =====================
   TERMINAL TYPING INTRO
===================== */
const title = document.querySelector(".hero h1");
if (title) {
  const text = title.innerText;
  title.innerText = "";
  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      title.innerText += text.charAt(i);
      i++;
      setTimeout(typeEffect, 70);
    }
  }
  setTimeout(typeEffect, 400);
}

/* =====================
   EXPAND / COLLAPSE REPORTS
===================== */
document.querySelectorAll(".card.toggle").forEach(card => {
  const header = card.querySelector("h3");
  header.style.cursor = "pointer";

  header.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});

/* =====================
   GLITCH EFFECT (SUBTLE)
===================== */
document.querySelectorAll(".glitch").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("glitch-active");
    setTimeout(() => el.classList.remove("glitch-active"), 300);
  });
});

