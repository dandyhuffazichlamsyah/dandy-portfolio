document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS (Animate On Scroll) logic is in index.html,
    // ensuring this script doesn't conflict.

    // Mobile Menu Toggle
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-mobile"]');
    const mobileMenu = document.getElementById('navbar-mobile');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');

            // Icon toggle
            const icon = toggleBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                toggleBtn.querySelector('i').classList.remove('fa-times');
                toggleBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // Contact Form Handling
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const btnOriginalContent = btn.innerHTML; // Store HTML (including icon)

            btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success state
                    btn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
                    btn.classList.add('bg-green-600', 'hover:bg-green-500');
                    btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');

                    form.reset();

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btn.innerHTML = btnOriginalContent;
                        btn.classList.remove('bg-green-600', 'hover:bg-green-500');
                        btn.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
                        btn.disabled = false;
                    }, 3000);

                } else {
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        alert(errorData["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                    btn.innerHTML = btnOriginalContent;
                    btn.disabled = false;
                }
            } catch (error) {
                console.error(error);
                alert('Oops! There was a problem submitting your form');
                btn.innerHTML = btnOriginalContent;
                btn.disabled = false;
            }
        });
    }

    // Optional: Navbar slightly more opaque on scroll
    const glassNav = document.querySelector('.glass-nav');
    if (glassNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                glassNav.classList.add('bg-slate-900/80', 'backdrop-blur-xl');
                glassNav.classList.remove('backdrop-blur-lg'); // Remove default lighter blur if needed
            } else {
                glassNav.classList.remove('bg-slate-900/80', 'backdrop-blur-xl');
                glassNav.classList.add('backdrop-blur-lg');
            }
        });
    }

    // Smooth Scroll for Anchor Links (fixes offset for fixed header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hacker Decode Animation Logic
    const hackTextElement = document.getElementById('hack-text');
    if (hackTextElement) {
        const phrases = ['Public Policy', 'Digital Gov', 'Smart Logistics', 'Systems Logic'];
        let currentPhraseIndex = 0;

        const chars = '!<>-_\\/[]{}—=+*^?#________'; // Random chars for effect

        function resolvePhrase(element, phrase) {
            return new Promise(resolve => {
                let frame = 0;
                const totalFrames = 40; // Duration of scramble
                const originalText = phrase;

                const interval = setInterval(() => {
                    element.innerText = originalText.split('').map((char, index) => {
                        if (index < frame / 3) { // Reveal characters progressively
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');

                    if (frame >= totalFrames + (originalText.length * 3)) { // Ensure enough time
                        clearInterval(interval);
                        element.innerText = originalText;
                        resolve();
                    }
                    frame++;
                }, 40); // 40ms per frame
            });
        }

        async function startLoop() {
            while (true) {
                await resolvePhrase(hackTextElement, phrases[currentPhraseIndex]);
                await new Promise(r => setTimeout(r, 2000)); // Wait 2s visible
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                // Quick scramble out before next word could be added here if desired.
                // For now, we just jump to decrypting the next word which looks cool.
            }
        }

        startLoop();
    }

    // Certificate Modal Logic
    const modal = document.getElementById('certificateModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');
    const downloadLink = document.getElementById('downloadLink');

    if (modal) {
        // Open Modal
        document.querySelectorAll('.view-certificate').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const fileUrl = link.getAttribute('href');
                const fileType = link.getAttribute('data-type');
                const title = link.getAttribute('data-title');

                // Update Title
                modalTitle.innerHTML = `<i class="fas fa-certificate text-primary"></i> <span>${title}</span>`;
                
                // Update Download Link
                downloadLink.href = fileUrl;

                // Clear previous content
                modalBody.innerHTML = '<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary absolute"></div>';

                // Show Modal
                modal.classList.remove('hidden');
                // Trigger reflow
                void modal.offsetWidth;
                modal.classList.remove('opacity-0');
                modal.querySelector('#modalContent').classList.remove('scale-95');
                modal.querySelector('#modalContent').classList.add('scale-100');

                // Load Content
                setTimeout(() => {
                    if (fileType === 'pdf') {
                        modalBody.innerHTML = `<iframe src="${fileUrl}" class="w-full h-full border-0" title="Certificate Viewer"></iframe>`;
                    } else {
                        modalBody.innerHTML = `<img src="${fileUrl}" class="max-w-full max-h-full object-contain" alt="Certificate">`;
                    }
                }, 300); // Small delay for animation
            });
        });

        // Close Modal Function
        const closeModalFunc = () => {
             modal.classList.add('opacity-0');
             modal.querySelector('#modalContent').classList.remove('scale-100');
             modal.querySelector('#modalContent').classList.add('scale-95');
             
             setTimeout(() => {
                 modal.classList.add('hidden');
                 modalBody.innerHTML = ''; // Clear heavy content like iframes
             }, 300);
        };

        closeModal.addEventListener('click', closeModalFunc);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModalFunc();
            }
        });
    }

});
