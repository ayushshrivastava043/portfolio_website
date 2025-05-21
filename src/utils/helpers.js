// Utility functions
const helpers = {
    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString();
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export helpers
export default helpers;

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stat-number')) {
                animateValue(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all sections and stats
document.querySelectorAll('.section, .stat-number').forEach(element => {
    observer.observe(element);
});

// Animate numbers
function animateValue(element) {
    const final = parseInt(element.textContent);
    const duration = 2000;
    const step = final / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= final) {
            element.textContent = final + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Portfolio Image Loading
document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        background: var(--card-bg-dark);
        color: var(--text-dark);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left: 4px solid #00ffee;
    }
    
    .notification.error {
        border-left: 4px solid #ff4444;
    }
`;
document.head.appendChild(style);

// Dashboard Time and Date
function updateDateTime() {
    const now = new Date();
    const timeDisplay = document.querySelector('.time-display');
    const dateDisplay = document.querySelector('.date-display');
    
    timeDisplay.textContent = now.toLocaleTimeString();
    dateDisplay.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Dashboard Minimize/Maximize
const minimizeBtn = document.querySelector('.minimize-btn');
const dashboardContent = document.querySelector('.dashboard-content');
let isMinimized = false;

minimizeBtn.addEventListener('click', () => {
    isMinimized = !isMinimized;
    dashboardContent.style.display = isMinimized ? 'none' : 'block';
    minimizeBtn.querySelector('i').classList.toggle('fa-minus');
    minimizeBtn.querySelector('i').classList.toggle('fa-plus');
});

// Project Stats Chart
const ctx = document.getElementById('projectChart').getContext('2d');
const projectChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Projects Completed',
            data: [2, 4, 3, 5, 4, 6],
            borderColor: '#00ffee',
            backgroundColor: 'rgba(0, 255, 238, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#fff'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#fff'
                }
            }
        }
    }
});

// Daily Updates Animation
const updateItems = document.querySelectorAll('.update-item');
updateItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 200);
});

// Make widgets draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = element.querySelector('div:first-child');
    
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Make all widgets draggable
document.querySelectorAll('.floating-dashboard, .daily-updates, .project-stats').forEach(makeDraggable);

// Add dynamic images to portfolio
const portfolioImages = [
    'https://source.unsplash.com/random/800x600?ai',
    'https://source.unsplash.com/random/800x600?technology',
    'https://source.unsplash.com/random/800x600?coding'
];

document.querySelectorAll('.portfolio-item img').forEach((img, index) => {
    img.src = portfolioImages[index];
    img.alt = `Project ${index + 1}`;
});

// Add dynamic blog images
const blogImages = [
    'https://source.unsplash.com/random/800x600?blog',
    'https://source.unsplash.com/random/800x600?writing'
];

document.querySelectorAll('.blog-image img').forEach((img, index) => {
    img.src = blogImages[index];
    img.alt = `Blog Post ${index + 1}`;
});

// Video Controls
const videos = document.querySelectorAll('.video-container video');
const iframe = document.querySelector('.video-container iframe');
const playAllBtn = document.querySelector('.play-all-btn');
const pauseAllBtn = document.querySelector('.pause-all-btn');

// Handle video loading
videos.forEach(video => {
    video.addEventListener('loadeddata', () => {
        video.classList.add('loaded');
    });
});

// Play all videos
playAllBtn.addEventListener('click', () => {
    videos.forEach(video => {
        video.play();
    });
    // Play YouTube video if it exists
    if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc + '&autoplay=1';
    }
    playAllBtn.style.display = 'none';
    pauseAllBtn.style.display = 'flex';
});

// Pause all videos
pauseAllBtn.addEventListener('click', () => {
    videos.forEach(video => {
        video.pause();
    });
    // Pause YouTube video if it exists
    if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc.replace('&autoplay=1', '');
    }
    pauseAllBtn.style.display = 'none';
    playAllBtn.style.display = 'flex';
});

// Initialize video controls
pauseAllBtn.style.display = 'none';

// Add hover play/pause functionality
document.querySelectorAll('.video-card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return; // Skip if no video element (YouTube iframe)
    
    card.addEventListener('mouseenter', () => {
        if (pauseAllBtn.style.display === 'none') {
            video.play();
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (pauseAllBtn.style.display === 'none') {
            video.pause();
        }
    });
});

// Add video progress indicator
videos.forEach(video => {
    const container = video.parentElement;
    const progress = document.createElement('div');
    progress.className = 'video-progress';
    container.appendChild(progress);
    
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percent}%`;
    });
});

// Add CSS for video progress
const videoProgressStyle = document.createElement('style');
videoProgressStyle.textContent = `
    .video-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--primary-color);
        width: 0;
        transition: width 0.1s linear;
        z-index: 2;
    }
`;
document.head.appendChild(videoProgressStyle);
