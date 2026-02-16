// ===== MENU TOGGLE =====
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');

    // Update ARIA attributes
    const isOpen = menu.classList.contains('open');
    icon.setAttribute('aria-expanded', isOpen);
}

// ===== KEYBOARD NAVIGATION =====

// Close menu with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const menu = document.querySelector('.menu-links');
        const icon = document.querySelector('.hamburger-icon');
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            icon.classList.remove('open');
            icon.setAttribute('aria-expanded', 'false');
            icon.focus(); // Return focus to button
        }
    }
});



// ===== ACTIVE NAV INDICATOR =====
function updateActiveNavLink() {
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-links a');

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Update active link styling based on current page
    navLinks.forEach(link => {
        link.classList.remove('active');

        // Get the href attribute
        const href = link.getAttribute('href');

        // Check if this link matches the current page
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Update active link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Initialize animation control button
document.addEventListener('DOMContentLoaded', function () {
    const animationButton = document.getElementById('animation-toggle');
    if (animationButton) {
        animationButton.addEventListener('click', toggleAnimations);

        // Keyboard support for animation toggle
        animationButton.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAnimations();
            }
        });
    }
});

// ===== STICKY NAV WITH AUTO-HIDE ON IDLE =====
let navHideTimeout;
const IDLE_TIME = 10000; // 10 seconds
const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');

function showNav() {
    desktopNav.classList.remove('hidden');
    desktopNav.classList.add('visible');
    hamburgerNav.classList.remove('hidden');
    hamburgerNav.classList.add('visible');

    // Clear existing timeout
    clearTimeout(navHideTimeout);

    // Set new timeout to hide nav after idle time
    navHideTimeout = setTimeout(() => {
        desktopNav.classList.remove('visible');
        desktopNav.classList.add('hidden');
        hamburgerNav.classList.remove('visible');
        hamburgerNav.classList.add('hidden');
    }, IDLE_TIME);
}

// Show nav on mouse move
document.addEventListener('mousemove', showNav);

// Show nav on scroll
document.addEventListener('scroll', showNav);

// Show nav on keypress
document.addEventListener('keydown', showNav);

// Show nav on touch (for mobile)
document.addEventListener('touchstart', showNav);

// Initialize nav as visible on page load
window.addEventListener('load', () => {
    desktopNav.classList.add('visible');
    hamburgerNav.classList.add('visible');
    showNav();
});


// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Explicit JavaScript Validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Change button text to indicate loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // EmailJS Service ID and Template ID
            const serviceID = 'service_8b50d5q';
            const templateID = 'template_xbpoxli';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Hide the form
                    contactForm.style.display = 'none';

                    // Show success message
                    successMessage.style.display = 'block';

                    console.log('SUCCESS!');

                    // Reset form after 5 seconds and show it again
                    setTimeout(function () {
                        contactForm.reset();
                        contactForm.style.display = 'flex';
                        successMessage.style.display = 'none';
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 5000);
                }, (error) => {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again later.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});


// ===== FULLSCREEN IMAGE VIEWER =====
function openImageFullscreen(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg && imgElement) {
        modal.classList.add('active');
        modalImg.src = imgElement.src;
        modalImg.alt = imgElement.alt;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeImageFullscreen() {
    const modal = document.getElementById('imageModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeImageFullscreen();
            }
        });
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeImageFullscreen();
    }
});

// Helper function for Email Validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
