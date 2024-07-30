document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Active Navigation
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
        });
    });

    // Contact Form Validation
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (e) {
        let messages = [];

        if (nameInput.value === '' || nameInput.value == null) {
            messages.push('Name is required');
        }

        if (emailInput.value === '' || emailInput.value == null) {
            messages.push('Email is required');
        } else if (!validateEmail(emailInput.value)) {
            messages.push('Email is not valid');
        }

        if (messageInput.value === '' || messageInput.value == null) {
            messages.push('Message is required');
        }

        if (messages.length > 0) {
            e.preventDefault();
            errorMessage.innerText = messages.join(', ');
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
});

