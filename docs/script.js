
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');

    
    const isOpen = menu.classList.contains('open');
    icon.setAttribute('aria-expanded', isOpen);
}




document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const menu = document.querySelector('.menu-links');
        const icon = document.querySelector('.hamburger-icon');
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            icon.classList.remove('open');
            icon.setAttribute('aria-expanded', 'false');
            icon.focus(); 
        }
    }
});




function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    
    document.querySelectorAll('.footer-nav a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', updateActiveNavLink);


document.addEventListener('DOMContentLoaded', function () {
    const animationButton = document.getElementById('animation-toggle');
    if (animationButton) {
        animationButton.addEventListener('click', toggleAnimations);

        
        animationButton.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAnimations();
            }
        });
    }
});


let navHideTimeout;
const IDLE_TIME = 10000; 
const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');

function showNav() {
    desktopNav.classList.remove('hidden');
    desktopNav.classList.add('visible');
    hamburgerNav.classList.remove('hidden');
    hamburgerNav.classList.add('visible');

    
    clearTimeout(navHideTimeout);

    
    navHideTimeout = setTimeout(() => {
        desktopNav.classList.remove('visible');
        desktopNav.classList.add('hidden');
        hamburgerNav.classList.remove('visible');
        hamburgerNav.classList.add('hidden');
    }, IDLE_TIME);
}


document.addEventListener('mousemove', showNav);


document.addEventListener('scroll', showNav);


document.addEventListener('keydown', showNav);


document.addEventListener('touchstart', showNav);


window.addEventListener('load', () => {
    desktopNav.classList.add('visible');
    hamburgerNav.classList.add('visible');
    showNav();
});



document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            
            const serviceID = 'service_8b50d5q';
            const templateID = 'template_xbpoxli';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    
                    contactForm.style.display = 'none';

                    
                    successMessage.style.display = 'block';

                    console.log('SUCCESS!');

                    
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



function openImageFullscreen(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg && imgElement) {
        modal.classList.add('active');
        modalImg.src = imgElement.src;
        modalImg.alt = imgElement.alt;
        document.body.style.overflow = 'hidden'; 
    }
}

function closeImageFullscreen() {
    const modal = document.getElementById('imageModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}


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


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeImageFullscreen();
    }
});


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
