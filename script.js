/* =====================
   TERMINAL BOOT SEQUENCE
===================== */
document.body.style.opacity = "0";

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = "1";
  }, 1200);
});

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

/* =====================
   SEQUENTIAL MODULE SLIDE-IN
===================== */
document.querySelectorAll(".animate").forEach(section => {
  const modules = section.querySelectorAll(".module");

  if (modules.length) {
    const moduleObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            modules.forEach((mod, index) => {
              setTimeout(() => {
                mod.style.opacity = "1";
                mod.style.transform = "translateX(0)";
              }, index * 180);
            });
            moduleObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    moduleObserver.observe(section);
  }
});

/* =====================
   TERMINAL BOOT SCRIPT
===================== */

const terminalLines = [
    "Initializing REDX Offensive Framework...",
    "Loading threat modules........[OK]",
    "Injecting payloads.............[OK]",
    "Bypassing perimeter defenses...[OK]",
    "Enumerating attack surface.....[OK]",
    "Establishing C2 channel........[OK]",
    "",
    "User: yassine",
    "Role: RED TEAM OPERATOR",
    "",
    "ACCESS GRANTED",
    "",
    "Launching portfolio interface..."
];

const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminal-text");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (lineIndex >= terminalLines.length) {
        setTimeout(() => {
            terminal.classList.add("fade-out");
        }, 800);
        return;
    }

    const line = terminalLines[lineIndex];

    if (charIndex < line.length) {
        terminalText.textContent += line.charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, 35);
    } else {
        terminalText.textContent += "\n";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 300);
    }
}

window.addEventListener("load", () => {
    setTimeout(typeLine, 500);
});

