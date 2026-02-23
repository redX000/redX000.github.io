/* =====================
   PARTICLE BACKGROUND (v1 style)
===================== */
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 70;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
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

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 0, 34, ${0.08 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', () => {
        resize();
        particles = [];
        for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    });
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    animate();
})();

/* =====================
   CINEMATIC INTRO
===================== */
(function initIntro() {
    const intro = document.getElementById('cinematic-intro');
    if (!intro) return;

    // Auto-dismiss after loading bar completes (2.8s)
    setTimeout(() => {
        intro.classList.add('fade-out');
        setTimeout(() => intro.remove(), 1000);
    }, 2800);

    // Click to skip
    intro.addEventListener('click', () => {
        intro.classList.add('fade-out');
        setTimeout(() => intro.remove(), 600);
    });
})();

/* =====================
   PAGE LOAD
===================== */
document.body.style.opacity = "0";
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "1";
    }, 500);
});

/* =====================
   NAVBAR
===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 60);
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
            navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

/* =====================
   SCROLL REVEAL
===================== */
const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.08 }
);
document.querySelectorAll(".animate").forEach(el => observer.observe(el));

/* =====================
   TYPED TEXT
===================== */
(function initTyped() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const strings = [
        'nmap -sC -sV -O target.htb',
        'Threat Intelligence & Counter-Terrorism',
        'sqlmap -u "http://target/id=1" --dbs',
        'Cybercrime Investigation & Digital Forensics',
        'Building Custom Offensive Security Tools',
        'hashcat -m 0 -a 0 hashes.txt rockyou.txt',
        'Red Team Engagement & Adversary Simulation',
        'python3 exploit.py --target 10.10.10.x',
        'OSINT • HUMINT • SIGINT Analysis'
    ];

    let idx = 0, charIdx = 0, deleting = false;

    function type() {
        const current = strings[idx];
        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) { setTimeout(() => { deleting = true; type(); }, 2500); return; }
            setTimeout(type, 40 + Math.random() * 25);
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) { deleting = false; idx = (idx + 1) % strings.length; setTimeout(type, 300); return; }
            setTimeout(type, 20);
        }
    }
    setTimeout(type, 3500); // delay until after intro
})();

/* =====================
   COUNTER ANIMATION
===================== */
(function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 30));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 60);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
})();

/* =====================
   MODULE CARD TOGGLES
===================== */
document.querySelectorAll('.module-card').forEach(card => {
    const head = card.querySelector('.mod-head');
    if (!head) return;

    head.addEventListener('click', () => {
        // Close all other modules in same year
        const year = card.closest('.chain-year');
        if (year) {
            year.querySelectorAll('.module-card').forEach(other => {
                if (other !== card && other.classList.contains('open')) {
                    other.classList.remove('open');
                }
            });
        }
        card.classList.toggle('open');
    });
});

/* =====================
   INTEL CARD TOGGLES
===================== */
document.querySelectorAll('.intel-card').forEach(card => {
    const head = card.querySelector('.intel-head');
    if (!head) return;

    head.addEventListener('click', (e) => {
        // Don't toggle if clicking a link inside
        if (e.target.closest('a')) return;

        document.querySelectorAll('.intel-card').forEach(other => {
            if (other !== card && other.classList.contains('open')) {
                other.classList.remove('open');
            }
        });
        card.classList.toggle('open');
    });
});

/* =====================
   ABOUT ME MODAL
===================== */
(function initModal() {
    const modal = document.getElementById('about-modal');
    const closeBtn = document.getElementById('modal-close');
    const triggers = document.querySelectorAll('.about-trigger');

    if (!modal) return;

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
})();

/* =====================
   LANGUAGE BAR ANIMATION
===================== */
const langObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lang-fill').forEach(bar => {
                setTimeout(() => { bar.style.width = (bar.dataset.width || 0) + '%'; }, 300);
            });
            langObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.lang-grid').forEach(el => langObs.observe(el));

/* =====================
   BACK TO TOP
===================== */
const btt = document.getElementById('back-to-top');
if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.pageYOffset > 300));
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =====================
   SMOOTH SCROLL
===================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const t = document.querySelector(href);
        if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
    });
});

/* =====================
   ACTIVE NAV HIGHLIGHT
===================== */
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-menu a[href^="#"]');
window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    secs.forEach(s => {
        const top = s.offsetTop - 120, h = s.offsetHeight, id = s.id;
        if (y >= top && y < top + h) {
            navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
        }
    });
});

/* =====================
   CONSOLE
===================== */
console.log('%c[REDX] COUNTER-THREAT OPERATIONS', 'color:#ff0022;font-size:20px;font-weight:bold;');
console.log('%c⚠ UNAUTHORIZED ACCESS WILL BE LOGGED AND TRACED', 'color:#ff0022;font-size:12px;');
console.log('%cOperator: Yassine Lasraoui | github.com/redX000', 'color:#666;font-size:11px;');
