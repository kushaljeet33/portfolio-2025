
document.addEventListener('DOMContentLoaded', function() {
   
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const backToTopBtn = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contact-form');
    const currentYear = new Date().getFullYear();
    
    initTypingEffect();
    initScrollSpy();
    initSkillBars();
    initPortfolioHover();
    initCurrentYear();
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
    initBackToTop();
    initFormSubmission();
    initIntersectionObserver();
    
    function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        const professions = ['Frontend Developer', 'UI Designer', 'Python Programmer', 'Problem Solver'];
        let index = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentText = professions[index];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % professions.length;
                setTimeout(type, 500);
            } else {
                const typingSpeed = isDeleting ? 100 : 150;
                setTimeout(type, isEnd ? typingSpeed * 2 : typingSpeed);
            }
            
            if (charIndex === currentText.length && !isDeleting) {
                isDeleting = true;
                isEnd = false;
            }
        }
        
        setTimeout(type, 1000);
    }
    
    function initScrollSpy() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.width = width;
            });
        }
    
        skillBars.forEach(bar => {
            bar.style.width = '0';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }
    
    function initPortfolioHover() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('.portfolio-overlay').style.opacity = '1';
                this.querySelector('img').style.transform = 'scale(1.1)';
                
                const overlayChildren = this.querySelectorAll('.portfolio-overlay > *');
                overlayChildren.forEach((child, index) => {
                    child.style.transform = 'translateY(0)';
                    child.style.transitionDelay = `${index * 0.1}s`;
                });
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('.portfolio-overlay').style.opacity = '0';
                this.querySelector('img').style.transform = 'scale(1)';
                

                const overlayChildren = this.querySelectorAll('.portfolio-overlay > *');
                overlayChildren.forEach(child => {
                    child.style.transform = 'translateY(20px)';
                    child.style.transitionDelay = '0s';
                });
            });
        });
    }
    
    function initCurrentYear() {
        document.getElementById('year').textContent = currentYear;
    }
    
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
         
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
    }
    
    function initNavbarScroll() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    

    function initMobileMenu() {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
      
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }
    

    function initBackToTop() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
    }
    
    function initFormSubmission() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
            
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
      
                if (!name || !email || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                
       
                contactForm.reset();
            });
        }
    }
    

    function initIntersectionObserver() {
        const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .section-header, .hero-content > *:not(.greeting)');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                }, 1000);
            });
        }
    }
});
