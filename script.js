// SPA Router
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentPage = 'home';
        
        // Handle navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigate(page);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const page = window.location.hash.slice(1) || 'home';
            this.loadContent(page);
        });

        // Initial load
        const initialPage = window.location.hash.slice(1) || 'home';
        this.navigate(initialPage);
    }

    async navigate(page) {
        if (this.currentPage === page) return;
        
        this.currentPage = page;
        window.location.hash = page;
        await this.loadContent(page);
    }

    async loadContent(page) {
        const mainContent = document.getElementById('main-content');
        const template = document.getElementById(`${page}-template`);
        
        if (!template) {
            console.error(`Template for ${page} not found`);
            return;
        }

        // Show loading animation
        mainContent.innerHTML = '<div class="loader"></div>';

        // Simulate loading delay for smooth transitions
        await new Promise(resolve => setTimeout(resolve, 300));

        // Clone and insert template content
        const content = template.content.cloneNode(true);
        mainContent.innerHTML = '';
        mainContent.appendChild(content);
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggleBtn = document.querySelector('.theme-toggle');
        this.toggleIcon = this.toggleBtn.querySelector('i');
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleIcon();

        // Handle theme toggle
        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        this.toggleIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Form Handler
class FormHandler {
    constructor() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Create loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader"></span> Sending...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Router
    new Router(['home', 'about', 'projects', 'contact']);
    
    // Initialize Theme Manager
    new ThemeManager();
    
    // Initialize Form Handler
    new FormHandler();

    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
