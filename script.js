/* =====================
   MATRIX RAIN BACKGROUND
===================== */
(function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アカサタナハマヤラワ0123456789ABCDEF{}[]<>/\\|';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 0, 34, 0.15)';
        ctx.font = fontSize + 'px JetBrains Mono';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        resize();
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
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
    }, 600);
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
        'msfconsole -x "use exploit/multi/handler"',
        'Building Custom Offensive Security Tools',
        'hashcat -m 0 -a 0 hashes.txt rockyou.txt',
        'OSINT • HUMINT • SIGINT Analysis',
        'python3 exploit.py --target 10.10.10.x',
        'Red Team Engagement & Adversary Simulation'
    ];

    let idx = 0, charIdx = 0, deleting = false;

    function type() {
        const current = strings[idx];
        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; type(); }, 2500);
                return;
            }
            setTimeout(type, 40 + Math.random() * 30);
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % strings.length;
                setTimeout(type, 300);
                return;
            }
            setTimeout(type, 20);
        }
    }
    setTimeout(type, 2000);
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
   MODULE TOGGLES (TRAINING)
===================== */
document.querySelectorAll('.toggle-module').forEach(card => {
    const header = card.querySelector('.module-header');
    if (header) {
        header.addEventListener('click', () => {
            // Close others in same group
            const parent = card.closest('.chain-modules');
            if (parent) {
                parent.querySelectorAll('.toggle-module').forEach(other => {
                    if (other !== card) other.classList.remove('open');
                });
            }
            card.classList.toggle('open');
        });
    }
});

/* =====================
   INTEL REPORT TOGGLES
===================== */
document.querySelectorAll(".intel-card.toggle").forEach(card => {
    const header = card.querySelector("h3");
    if (header) {
        header.addEventListener("click", () => {
            document.querySelectorAll(".intel-card.toggle").forEach(other => {
                if (other !== card) other.classList.remove('open');
            });
            card.classList.toggle("open");
        });
    }
});

/* =====================
   LANGUAGE BAR ANIMATION
===================== */
const langObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lang-fill').forEach(bar => {
                const width = bar.dataset.width || 0;
                setTimeout(() => { bar.style.width = width + '%'; }, 200);
            });
            langObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.lang-grid').forEach(el => langObs.observe(el));

/* =====================
   TERMINAL BOOT
===================== */
document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const text = document.getElementById("terminal-text");
    const skip = document.getElementById("skip-terminal");
    if (!terminal || !text) return;

    const lines = [
        "root@redx:~# ./init_framework.sh --mode=aggressive",
        "",
        "╔══════════════════════════════════════════════════╗",
        "║     ██████╗ ███████╗██████╗ ██╗  ██╗            ║",
        "║     ██╔══██╗██╔════╝██╔══██╗╚██╗██╔╝            ║",
        "║     ██████╔╝█████╗  ██║  ██║ ╚███╔╝             ║",
        "║     ██╔══██╗██╔══╝  ██║  ██║ ██╔██╗             ║",
        "║     ██║  ██║███████╗██████╔╝██╔╝ ██╗            ║",
        "║     ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝            ║",
        "║                                                  ║",
        "║     COUNTER-THREAT OPERATIONS FRAMEWORK          ║",
        "╚══════════════════════════════════════════════════╝",
        "",
        "[*] Loading offensive modules............[OK]",
        "[*] Initializing threat detection........[OK]",
        "[*] Establishing C2 infrastructure.......[OK]",
        "[*] Bypassing perimeter defenses.........[OK]",
        "[*] Deploying reconnaissance agents......[OK]",
        "[*] Arming exploitation framework.......[OK]",
        "",
        "OPERATOR:   Yassine Lasraoui",
        "CALLSIGN:   REDX-000",
        "CLEARANCE:  ████████████████████████ [MAXIMUM]",
        "STATUS:     ACCESS GRANTED",
        "",
        "[*] Launching operator interface..."
    ];

    let lineIdx = 0, charIdx = 0, stopped = false;

    function skipAll() {
        stopped = true;
        terminal.classList.add("fade-out");
        skip.classList.add("hidden");
        setTimeout(() => terminal.remove(), 600);
    }

    function typeLines() {
        if (stopped) return;
        if (lineIdx >= lines.length) {
            setTimeout(() => { skipAll(); }, 500);
            return;
        }
        if (charIdx < lines[lineIdx].length) {
            text.textContent += lines[lineIdx][charIdx];
            charIdx++;
            const delay = lines[lineIdx].startsWith("║") ? 6 : lines[lineIdx].startsWith("[") ? 14 : 10;
            setTimeout(typeLines, delay);
        } else {
            text.textContent += "\n";
            lineIdx++;
            charIdx = 0;
            setTimeout(typeLines, lines[lineIdx - 1] === "" ? 80 : 100);
        }
    }

    setTimeout(typeLines, 200);
    if (skip) skip.addEventListener("click", skipAll);
    terminal.addEventListener("click", skipAll);
});

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
   ACTIVE NAV
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
