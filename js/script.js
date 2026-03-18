// Initialize AOS
AOS.init({ 
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Particles
particlesJS('particles-js', {
    particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: '#629692' },
        shape: { type: "circle" },
        opacity: { value: 0.1, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 150, color: '#629692', opacity: 0.05, width: 1 },
        move: { enable: true, speed: 0.6, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 0.1 } },
            push: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

// Dynamic Experience Years
function updateExperienceYears() {
    const startDate = new Date('2025-01-01');
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    
    if (months < 0) years--;
    years = Math.max(1, years);
    
    document.getElementById('experienceYears').textContent = years;
}

updateExperienceYears();
setInterval(updateExperienceYears, 86400000);

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');

    // Active link highlighting
    let winScroll = window.scrollY;
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        let top = section.offsetTop - 100;
        let bottom = top + section.offsetHeight;
        let id = section.getAttribute('id');
        
        if (winScroll >= top && winScroll < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Show/hide theme toggle based on scroll position
    const heroSection = document.getElementById('home');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    if (window.scrollY < heroBottom - 100) {
        themeToggle.classList.remove('hidden');
    } else {
        themeToggle.classList.add('hidden');
    }
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form Validation Function
function validateForm() {
    let isValid = true;
    
    // Get form elements
    const name = document.getElementById('user_name');
    const email = document.getElementById('user_email');
    const phone = document.getElementById('number');
    const message = document.getElementById('message');
    
    // Get error spans
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    
    // Reset classes and errors
    [name, email, phone, message].forEach(field => {
        field.classList.remove('error', 'valid');
    });
    
    // Validate Name (min 3 characters)
    if (name.value.trim().length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        name.classList.add('error');
        isValid = false;
    } else {
        nameError.textContent = '';
        name.classList.add('valid');
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        email.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        email.classList.add('valid');
    }
    
    // Validate Phone (Egyptian numbers - 11 digits starting with 01)
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        phoneError.textContent = 'Please enter a valid Egyptian phone number (11 digits starting with 01)';
        phone.classList.add('error');
        isValid = false;
    } else {
        phoneError.textContent = '';
        phone.classList.add('valid');
    }
    
    // Validate Message (min 10 characters)
    if (message.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        message.classList.add('error');
        isValid = false;
    } else {
        messageError.textContent = '';
        message.classList.add('valid');
    }
    
    return isValid;
}

// Real-time validation feedback
document.getElementById('user_name').addEventListener('input', validateForm);
document.getElementById('user_email').addEventListener('input', validateForm);
document.getElementById('number').addEventListener('input', validateForm);
document.getElementById('message').addEventListener('input', validateForm);

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Run validation
    if (!validateForm()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    
    successAlert.style.display = 'none';
    errorAlert.style.display = 'none';
    
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    btnText.textContent = 'Sending...';
    
    const userName = document.getElementById('user_name').value;
    const userEmail = document.getElementById('user_email').value;
    const userPhone = document.getElementById('number').value;
    const userMessage = document.getElementById('message').value;
    
    const templateParams = {
        to_email: "indexwork732@gmail.com",
        from_name: userName,
        from_email: userEmail,
        subject: `New Message from ${userName} - Portfolio`,
        message: `Name: ${userName}\nEmail: ${userEmail}\nPhone: ${userPhone}\nMessage: ${userMessage}`,
        user_name: userName,
        user_email: userEmail,
        user_phone: userPhone,
        user_message: userMessage
    };
    
    emailjs.send('service_mk3n8jp', 'template_aub8lve', templateParams)
        .then(function() {
            successAlert.style.display = 'block';
            document.getElementById('contactForm').reset();
            
            // Remove validation classes
            document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
                field.classList.remove('valid', 'error');
            });
            
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
            btnText.textContent = 'Send Message';
            
            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 5000);
        })
        .catch(function() {
            errorAlert.style.display = 'block';
            
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
            btnText.textContent = 'Send Message';
            
            setTimeout(() => {
                errorAlert.style.display = 'none';
            }, 5000);
        });
});