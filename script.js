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
   NAVIGATION BAR SCROLL EFFECT
===================== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

/* =====================
   MOBILE NAVIGATION TOGGLE
===================== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

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
   EXPAND / COLLAPSE REPORTS (CLICK)
===================== */
document.querySelectorAll(".card.toggle").forEach(card => {
  const header = card.querySelector("h3");
  if (header) {
    header.addEventListener("click", () => {
      // Close other open cards
      document.querySelectorAll(".card.toggle").forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('open')) {
          otherCard.classList.remove('open');
        }
      });
      
      // Toggle current card
      card.classList.toggle("open");
    });
  }
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
const attackSection = document.querySelector('.attack-chain');

if (attackSection) {
    const attackObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    attackSection.classList.add('attack-active');
                    attackObserver.unobserve(attackSection);
                }
            });
        },
        { threshold: 0.2 }
    );

    attackObserver.observe(attackSection);
}

/* =====================
   TERMINAL BOOT SCRIPT
===================== */
document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const terminalText = document.getElementById("terminal-text");
    const skipButton = document.getElementById("skip-terminal");

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
    let skipRequested = false;

    function skipTerminal() {
        skipRequested = true;
        terminal.classList.add("fade-out");
        skipButton.classList.add("hidden");
        setTimeout(() => terminal.remove(), 800);
    }

    function type() {
        if (skipRequested) return;
        
        if (line >= lines.length) {
            setTimeout(() => {
                terminal.classList.add("fade-out");
                skipButton.classList.add("hidden");
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

    // Skip button
    if (skipButton) {
        skipButton.addEventListener("click", skipTerminal);
    }

    // Click anywhere to skip
    terminal.addEventListener("click", skipTerminal);
});

/* =====================
   BACK TO TOP BUTTON
===================== */
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =====================
   SMOOTH SCROLL FOR ANCHOR LINKS
===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* =====================
   ACTIVE NAV LINK HIGHLIGHTING
===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavLink() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

/* =====================
   CONSOLE EASTER EGG
===================== */
console.log('%c🔴 REDX Security Framework', 'color: #ff0022; font-size: 20px; font-weight: bold;');
console.log('%cRed Team Portfolio - Yassine Lasraoui', 'color: #b5b5b5; font-size: 14px;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #ff0022; font-size: 12px;');
