// Main JavaScript for Dhawal's Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Dhawal ka hath toota.. haha website loaded successfully!');
    
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add click handlers for contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('9772534339')) {
                // Open phone dialer
                window.open('tel:9772534339');
            } else if (text.includes('@')) {
                // Open email client
                window.open('mailto:dhawalyashshrivastava@gmail.com');
            } else if (text.includes('WhatsApp')) {
                // Open WhatsApp
                window.open('https://wa.me/9772534339?text=Hi%20Dhawal!%20I%20want%20to%20participate%20in%20the%20painting%20competition!');
            }
        });
    });

    // Add hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects for tech tags
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            if (text.includes('9772534339')) {
                window.open('tel:9772534339');
            } else if (text.includes('dhawalyashshrivastava@gmail.com')) {
                window.open('mailto:dhawalyashshrivastava@gmail.com');
            } else if (text.includes('WhatsApp')) {
                window.open('https://wa.me/9772534339?text=Hi%20Dhawal!%20I%20want%20to%20participate%20in%20the%20painting%20competition!');
            } else if (text.includes('Call Now')) {
                window.open('tel:9772534339');
            } else if (text.includes('Registration Form') || text.includes('Submit Entry')) {
                // Open Google Forms
                window.open('https://forms.google.com', '_blank');
            }
        });
    });

    // Add typing effect to the hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add particle effect to the hero section
    createParticles();

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add a fun easter egg - click on Dhawal's name
    const authorName = document.querySelector('.author-info h2');
    if (authorName) {
        let clickCount = 0;
        authorName.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                alert('🎨 Dhawal ka hath toota.. haha! 🤜🏻🫸🏻 = 💀');
                clickCount = 0;
            }
        });
    }

    // Check if the real image is available and replace placeholder
    const placeholderImage = document.querySelector('.placeholder-image');
    if (placeholderImage) {
        const realImage = new Image();
        realImage.onload = function() {
            // Real image loaded successfully, replace placeholder
            const heroImage = document.querySelector('.hero-image');
            heroImage.innerHTML = `<img src="IMG_9449.jpg" alt="Dhawal with broken hand - Boxing Career">`;
        };
        realImage.onerror = function() {
            // Image not found, keep placeholder
            console.log('IMG_9449.jpg not found, showing placeholder');
        };
        realImage.src = 'IMG_9449.jpg';
    }
});

// Create particle effect
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00ffee';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        heroSection.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// Add a fun loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: #00ffee;">
            <div style="font-size: 2rem; margin-bottom: 20px;">🎨</div>
            <div style="font-size: 1.2rem;">Loading Dhawal's Website...</div>
            <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.7;">🤜🏻🫸🏻 = 💀</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1000);
}); 