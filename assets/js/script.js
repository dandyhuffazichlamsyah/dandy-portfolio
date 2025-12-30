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


});
