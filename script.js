/* =====================
   PARTICLE BACKGROUND
===================== */
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 34, ${this.opacity})`;
            ctx.fill();
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 0, 34, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    animate();
})();

/* =====================
   PAGE LOAD
===================== */
document.body.style.opacity = "0";
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.style.transition = "opacity 0.6s ease";
        document.body.style.opacity = "1";
    }, 800);
});

/* =====================
   NAVBAR SCROLL
===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 80);
});

/* =====================
   MOBILE NAV
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
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.1 }
);
document.querySelectorAll(".animate").forEach(el => observer.observe(el));

/* =====================
   TYPED TEXT EFFECT
===================== */
(function initTyped() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const strings = [
        'Penetration Testing & Red Teaming',
        'Building Custom Security Tools',
        'OSINT & Threat Intelligence',
        'Bug Bounty Hunter',
        'Ethical Hacking & Exploitation',
        'Network Security Analysis'
    ];

    let strIdx = 0, charIdx = 0, deleting = false;

    function type() {
        const current = strings[strIdx];

        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; type(); }, 2000);
                return;
            }
            setTimeout(type, 60);
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                strIdx = (strIdx + 1) % strings.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 30);
        }
    }

    setTimeout(type, 1500);
})();

/* =====================
   COUNTER ANIMATION
===================== */
(function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 40));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 50);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
})();

/* =====================
   REPORTS TOGGLE
===================== */
document.querySelectorAll(".card.toggle").forEach(card => {
    const header = card.querySelector("h3");
    if (header) {
        header.addEventListener("click", () => {
            document.querySelectorAll(".card.toggle").forEach(other => {
                if (other !== card) other.classList.remove('open');
            });
            card.classList.toggle("open");
        });
    }
});

/* =====================
   TERMINAL BOOT
===================== */
document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const terminalText = document.getElementById("terminal-text");
    const skipButton = document.getElementById("skip-terminal");

    if (!terminal || !terminalText) return;

    const lines = [
        "root@redx:~# ./boot.sh",
        "",
        "[*] Initializing REDX Offensive Framework v2.0...",
        "[+] Loading threat modules..............[OK]",
        "[+] Configuring attack surface..........[OK]",
        "[+] Bypassing perimeter defenses........[OK]",
        "[+] Establishing encrypted C2 channel...[OK]",
        "[+] Enumerating targets.................[OK]",
        "",
        "┌─────────────────────────────────────────┐",
        "│  USER:   yassine.lasraoui               │",
        "│  ROLE:   RED TEAM OPERATOR               │",
        "│  LEVEL:  ████████████████████░ 95%       │",
        "│  STATUS: ACCESS GRANTED                  │",
        "└─────────────────────────────────────────┘",
        "",
        "[*] Launching portfolio interface..."
    ];

    let line = 0, char = 0, skip = false;

    function skipTerminal() {
        skip = true;
        terminal.classList.add("fade-out");
        skipButton.classList.add("hidden");
        setTimeout(() => terminal.remove(), 800);
    }

    function typeLines() {
        if (skip) return;
        if (line >= lines.length) {
            setTimeout(() => {
                terminal.classList.add("fade-out");
                skipButton.classList.add("hidden");
                setTimeout(() => terminal.remove(), 1000);
            }, 600);
            return;
        }

        if (char < lines[line].length) {
            terminalText.textContent += lines[line][char];
            char++;
            setTimeout(typeLines, lines[line].startsWith("[") ? 18 : 12);
        } else {
            terminalText.textContent += "\n";
            line++;
            char = 0;
            setTimeout(typeLines, lines[line - 1] === "" ? 100 : 150);
        }
    }

    setTimeout(typeLines, 300);
    if (skipButton) skipButton.addEventListener("click", skipTerminal);
    terminal.addEventListener("click", skipTerminal);
});

/* =====================
   BACK TO TOP
===================== */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.pageYOffset > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =====================
   SMOOTH SCROLL
===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

/* =====================
   ACTIVE NAV HIGHLIGHTING
===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
});

/* =====================
   LANGUAGE BAR ANIMATION
===================== */
const langObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lang-fill').forEach(bar => {
                bar.style.width = bar.style.width; // trigger animation
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-grid').forEach(el => langObserver.observe(el));

/* =====================
   CONSOLE EASTER EGG
===================== */
console.log('%c🔴 REDX Security Framework', 'color: #ff0022; font-size: 24px; font-weight: bold;');
console.log('%c╔══════════════════════════════════════╗', 'color: #ff0022;');
console.log('%c║  Red Team Portfolio — Yassine Lasraoui  ║', 'color: #ff0022;');
console.log('%c║  github.com/redX000                     ║', 'color: #666;');
console.log('%c╚══════════════════════════════════════╝', 'color: #ff0022;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #b5b5b5;');
