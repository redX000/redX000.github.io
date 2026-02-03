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
   TERMINAL BOOT SCRIPT (SAFE)
===================== */

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const terminalText = document.getElementById("terminal-text");

    if (!terminal || !terminalText) {
        console.error("Terminal elements not found");
        return;
    }

    const lines = [
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

    let line = 0;
    let char = 0;

    function type() {
        if (line >= lines.length) {
            setTimeout(() => {
                terminal.classList.add("fade-out");
                setTimeout(() => terminal.remove(), 1500);
            }, 800);
            return;
        }

        if (char < lines[line].length) {
            terminalText.textContent += lines[line][char];
            char++;
            setTimeout(type, 30);
        } else {
            terminalText.textContent += "\n";

            // 🔴 GLITCH ACCESS GRANTED
            if (lines[line] === "ACCESS GRANTED") {
                terminalText.classList.add("glitch");
                setTimeout(() => {
                    terminalText.classList.remove("glitch");
                }, 350);
            }

            line++;
            char = 0;
            setTimeout(type, 250);
        }
    }

    setTimeout(type, 500);

    // 🧨 EMERGENCY SKIP (click to continue)
    terminal.addEventListener("click", () => {
        terminal.classList.add("fade-out");
        setTimeout(() => terminal.remove(), 800);
    });
});
/* =====================
   ATTACK CHAIN OBSERVER
===================== */

const attackSection = document.querySelector('.attack-chain');

if (attackSection) {
    const attackObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    attackSection.classList.add('attack-active');
                    attackObserver.unobserve(attackSection); // run once
                }
            });
        },
        { threshold: 0.2 }
    );

    attackObserver.observe(attackSection);
}

