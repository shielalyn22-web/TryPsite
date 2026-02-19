/* ========================================
   Creative Portfolio — JavaScript
   ======================================== */

// ── Scroll Progress Bar ──────────────────
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
});

// ── Navbar: glass effect on scroll ───────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ── Active Nav Link on Scroll ─────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ── Smooth Scroll ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ── Typewriter Effect ─────────────────────
const roles = [
    'Creative Developer',
    'UI/UX Enthusiast',
    'Full-Stack Builder',
    'Problem Solver',
    'Web Designer'
];

const typewriterEl = document.getElementById('typewriter');
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typeTimeout;

function typeWrite() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            typeTimeout = setTimeout(typeWrite, 1800);
            return;
        }
    } else {
        typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex  = (roleIndex + 1) % roles.length;
            typeTimeout = setTimeout(typeWrite, 400);
            return;
        }
    }

    const speed = isDeleting ? 60 : 90;
    typeTimeout = setTimeout(typeWrite, speed);
}

typeWrite();

// ── Scroll Reveal (IntersectionObserver) ──
const revealEls = document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-up, .skill-card'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Contact Form: inline success ──────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Animate button
    const btn = contactForm.querySelector('button[type="submit"]');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    btn.disabled = true;
    btnSpan.textContent = 'Sending...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btnSpan.textContent = originalText;
        btn.style.opacity = '1';
        formSuccess.classList.add('show');

        // Hide success after 5s
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }, 1200);
});

// ── Skill bar: re-trigger on hover if needed ──
// (bars animate via CSS when .revealed is added by observer)

// ── Tilt effect on skill cards ────────────
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) *  6;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
