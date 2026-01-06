/* ====================================================
   CYBERPUNK TERMINAL - Interactive JavaScript
   Ultra-Futuristic Portfolio Experience
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // CURSOR TRAIL EFFECT
    // ============================================
    const cursorMain = document.querySelector('.cursor-main');
    const trailContainer = document.getElementById('cursor-trail-container');

    if (cursorMain && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const trail = [];
        const trailLength = 20;

        // Create trail elements
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.opacity = (1 - i / trailLength) * 0.5;
            dot.style.transform = `scale(${1 - i / trailLength})`;
            document.body.appendChild(dot);
            trail.push({ el: dot, x: 0, y: 0 });
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Main cursor with lag
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursorMain.style.left = cursorX + 'px';
            cursorMain.style.top = cursorY + 'px';
            cursorMain.style.transform = 'translate(-50%, -50%)';

            // Trail animation
            let prevX = mouseX;
            let prevY = mouseY;

            trail.forEach((dot, i) => {
                const speed = 0.35 - (i * 0.01);
                dot.x += (prevX - dot.x) * speed;
                dot.y += (prevY - dot.y) * speed;

                dot.el.style.left = dot.x + 'px';
                dot.el.style.top = dot.y + 'px';
                dot.el.style.transform = `translate(-50%, -50%) scale(${1 - i / trailLength})`;

                prevX = dot.x;
                prevY = dot.y;
            });

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover states
        const interactiveEls = document.querySelectorAll('a, button, .card-cyber, .tag-cyber, input, textarea');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => cursorMain.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorMain.classList.remove('hover'));
        });
    }

    // ============================================
    // INTERACTIVE TERMINAL
    // ============================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalInput && terminalOutput) {
        const commands = {
            'help': `Available commands:
  whoami     - About me
  skills     - My technical skills
  projects   - View my work
  contact    - Get in touch
  social     - Social links
  clear      - Clear terminal`,

            'whoami': `┌──────────────────────────────────────┐
│  DANDY HUFFAZ ICHLAMSYAH             │
│  ──────────────────────────────────  │
│  > Systems Architect                  │
│  > Public Administration Expert       │
│  > Software Developer                 │
│  ──────────────────────────────────  │
│  Bridging technology and governance   │
│  through innovative digital solutions │
└──────────────────────────────────────┘`,

            'skills': `[TECHNICAL SKILLS]
├── Languages: Python, JavaScript, SQL
├── Frameworks: React, Node.js, FastAPI
├── AI/ML: TensorFlow, Scikit-learn
├── Tools: Git, Docker, Linux
└── Cloud: AWS, Google Cloud

[DOMAIN EXPERTISE]
├── Public Policy & Administration
├── Digital Government Systems
├── Logistics & Operations
└── Data Analysis`,

            'projects': `[FEATURED PROJECTS]
┌─ 01. Digital Gov Platform
│  └─ Streamlining public services
├─ 02. AI Policy Analyzer
│  └─ ML-powered document analysis
├─ 03. Smart Logistics System
│  └─ Real-time operations dashboard
└─ 04. Research Publications
   └─ Academic contributions

Type 'scroll' to explore projects section ↓`,

            'contact': `[CONTACT INFO]
├── Email: dandyichlamsyah@gmail.com
├── LinkedIn: /in/dandy-huffaz-ichlamsyah
└── GitHub: /dandyhuffazichlamsyah

Or scroll down to the contact form ↓`,

            'social': `[SOCIAL LINKS]
├── LinkedIn → linkedin.com/in/dandy-huffaz-ichlamsyah-563211190
├── GitHub   → github.com/dandyhuffazichlamsyah
└── Email    → dandyichlamsyah@gmail.com`,

            'clear': 'CLEAR',

            'scroll': 'SCROLL_TO_PROJECTS',

            'sudo': 'Nice try! 🔒 Access denied.',

            'ls': `drwxr-xr-x  about/
drwxr-xr-x  projects/
drwxr-xr-x  skills/
drwxr-xr-x  contact/
-rw-r--r--  CV-Dandy.pdf`,

            'cat CV-Dandy.pdf': 'Binary file. Use "download cv" to get a copy.',

            'download cv': 'Initiating download...',

            'hello': 'Hello there! 👋 Type "help" for available commands.',

            'hi': 'Hey! 👋 Type "help" to see what I can do.',
        };

        const defaultResponse = (cmd) => `Command not found: ${cmd}
Type 'help' to see available commands.`;

        function addLine(content, isCommand = false) {
            const line = document.createElement('div');
            line.className = 'terminal-line';

            if (isCommand) {
                line.innerHTML = `<span class="terminal-prompt">visitor@dandy:~$</span> <span class="terminal-command">${content}</span>`;
            } else {
                line.innerHTML = `<pre class="terminal-output">${content}</pre>`;
            }

            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        function processCommand(cmd) {
            const trimmedCmd = cmd.trim().toLowerCase();
            addLine(cmd, true);

            if (trimmedCmd === '') return;

            const response = commands[trimmedCmd] || defaultResponse(trimmedCmd);

            if (response === 'CLEAR') {
                terminalOutput.innerHTML = '';
                return;
            }

            if (response === 'SCROLL_TO_PROJECTS') {
                addLine('Scrolling to projects...');
                setTimeout(() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
                return;
            }

            if (trimmedCmd === 'download cv') {
                addLine(response);
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = 'assets/docs/CV-Dandy.pdf';
                    link.download = 'CV-Dandy.pdf';
                    link.click();
                    addLine('Download started! ✓');
                }, 500);
                return;
            }

            setTimeout(() => {
                addLine(response);
            }, 100);
        }

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                processCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });

        // Focus terminal on click
        document.querySelector('.terminal')?.addEventListener('click', () => {
            terminalInput.focus();
        });

        // Initial message
        setTimeout(() => {
            addLine('Welcome to Dandy\'s Terminal Portfolio');
            addLine('Type "help" for available commands.\n');
        }, 500);
    }

    // ============================================
    // HOLOGRAPHIC TEXT MOUSE TRACKING
    // ============================================
    const holoElements = document.querySelectorAll('.holo-interactive');

    if (holoElements.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);

            holoElements.forEach(el => {
                el.style.setProperty('--holo-angle', `${angle + 90}deg`);
            });
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-mobile"]');
    const mobileMenu = document.getElementById('navbar-mobile');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                const icon = toggleBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const animateElements = document.querySelectorAll('[data-animate]');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        animateObserver.observe(el);
    });

    // ============================================
    // SMOOTH SCROLL WITH OFFSET
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const btnOriginal = btn.innerHTML;

            btn.innerHTML = '<span>TRANSMITTING...</span>';
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.innerHTML = '<span style="color: var(--holo-1);">✓ TRANSMITTED</span>';
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = btnOriginal;
                        btn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Failed');
                }
            } catch (error) {
                btn.innerHTML = '<span style="color: #ff5f56;">✗ ERROR</span>';
                setTimeout(() => {
                    btn.innerHTML = btnOriginal;
                    btn.disabled = false;
                }, 2000);
            }
        });
    }

    // ============================================
    // CERTIFICATE MODAL
    // ============================================
    const modal = document.getElementById('certificateModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');
    const downloadLink = document.getElementById('downloadLink');

    if (modal) {
        document.querySelectorAll('.view-certificate').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const fileUrl = link.getAttribute('href');
                const fileType = link.getAttribute('data-type');
                const title = link.getAttribute('data-title');

                modalTitle.innerHTML = `<span class="text-holo-1">&gt;</span> ${title}`;
                downloadLink.href = fileUrl;
                modalBody.innerHTML = '<div class="text-holo-1">Loading...</div>';

                modal.classList.remove('hidden');
                modal.classList.add('flex');

                setTimeout(() => {
                    if (fileType === 'pdf') {
                        modalBody.innerHTML = `<iframe src="${fileUrl}" class="w-full h-full border-0"></iframe>`;
                    } else {
                        modalBody.innerHTML = `<img src="${fileUrl}" class="max-w-full max-h-full object-contain" alt="${title}">`;
                    }
                }, 300);
            });
        });

        const closeModalFunc = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modalBody.innerHTML = '';
        };

        closeModal?.addEventListener('click', closeModalFunc);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalFunc();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModalFunc();
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const nav = document.querySelector('.nav-cyber');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });
    }

    // ============================================
    // GLITCH ON HOVER (for elements with data-text)
    // ============================================
    document.querySelectorAll('.glitch').forEach(el => {
        if (!el.dataset.text) {
            el.dataset.text = el.textContent;
        }
    });

});
