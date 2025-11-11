// ================================================
// Real Estate Template - Main JavaScript
// Version: 1.0
// Author: SmartFusion
// ================================================

(function() {
    'use strict';

    // ================ Mobile Menu Toggle ================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ================ Sticky Header ================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ================ Dark Mode Toggle ================
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateThemeIcon();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
            }
            
            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // ================ Smooth Scroll ================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ================ Property Grid/List Toggle ================
    const gridViewBtn = document.querySelector('.grid-view-btn');
    const listViewBtn = document.querySelector('.list-view-btn');
    const propertyGrid = document.querySelector('.property-grid');

    if (gridViewBtn && listViewBtn && propertyGrid) {
        gridViewBtn.addEventListener('click', () => {
            propertyGrid.classList.remove('list-view');
            propertyGrid.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', () => {
            propertyGrid.classList.remove('grid-view');
            propertyGrid.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }

    // ================ Property Filter ================
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const properties = document.querySelectorAll('.property-item');
            
            properties.forEach(property => {
                if (filterValue === 'all' || property.getAttribute('data-category') === filterValue) {
                    property.style.display = 'block';
                    property.classList.add('fade-in');
                } else {
                    property.style.display = 'none';
                }
            });
        });
    });

    // ================ Property Search ================
    const searchForm = document.querySelector('.property-search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const searchParams = {
                location: formData.get('location'),
                type: formData.get('type'),
                budget: formData.get('budget'),
                bedrooms: formData.get('bedrooms')
            };
            
            // In a real application, this would make an API call
            console.log('Search Parameters:', searchParams);
            
            // Redirect to properties page with search params
            const params = new URLSearchParams(searchParams);
            window.location.href = `properties.html?${params.toString()}`;
        });
    }

    // ================ Property Image Slider ================
    const propertySliders = document.querySelectorAll('.property-slider');
    
    propertySliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev-slide');
        const nextBtn = slider.querySelector('.next-slide');
        let currentSlide = 0;

        function showSlide(n) {
            slides.forEach((slide, index) => {
                slide.style.display = index === n ? 'block' : 'none';
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        showSlide(currentSlide);
    });

    // ================ Number Counter Animation ================
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const valueEl = counter.querySelector('.counter-value') || counter;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                valueEl.textContent = Math.floor(current).toLocaleString('en-IN');
                requestAnimationFrame(updateCounter);
            } else {
                valueEl.textContent = `${target.toLocaleString('en-IN')}+`;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ================ Image Lazy Loading ================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ================ Form Validation ================
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });

    // ================ Password Toggle ================
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ================ Tooltip Initialization ================
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });

    // ================ Back to Top Button ================
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================ Client-side Pagination (Properties) ================
    const propertyGridEl = document.querySelector('.property-grid');
    const paginationEl = document.querySelector('.pagination');
    const resultsCountEl = document.querySelector('.results-count p');
    if (propertyGridEl && paginationEl) {
        const items = Array.from(propertyGridEl.querySelectorAll('.property-item'));
        const prevBtn = paginationEl.querySelector('.page-item:first-child .page-link');
        const nextBtn = paginationEl.querySelector('.page-item:last-child .page-link');
        const pageLinks = Array.from(paginationEl.querySelectorAll('.page-item .page-link'))
            .filter(a => /\d+/.test(a.textContent.trim()));

        const PER_PAGE = 9;
        const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
        let currentPage = 1;

        // Hide page numbers beyond totalPages
        pageLinks.forEach(a => {
            const num = parseInt(a.textContent.trim(), 10);
            const li = a.closest('.page-item');
            if (num > totalPages) {
                li.style.display = 'none';
            }
        });

        function renderPage(page) {
            currentPage = Math.min(Math.max(1, page), totalPages);
            const start = (currentPage - 1) * PER_PAGE;
            const end = start + PER_PAGE;

            items.forEach((item, idx) => {
                item.style.display = (idx >= start && idx < end) ? 'block' : 'none';
            });

            // Update active state on page links
            pageLinks.forEach(a => {
                const li = a.closest('.page-item');
                const num = parseInt(a.textContent.trim(), 10);
                if (num === currentPage) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            });

            // Prev/Next disabled states
            const prevLi = paginationEl.querySelector('.page-item:first-child');
            const nextLi = paginationEl.querySelector('.page-item:last-child');
            if (prevLi && nextLi) {
                if (currentPage === 1) prevLi.classList.add('disabled'); else prevLi.classList.remove('disabled');
                if (currentPage === totalPages) nextLi.classList.add('disabled'); else nextLi.classList.remove('disabled');
            }

            // Update results count text if present
            if (resultsCountEl) {
                const showingTo = Math.min(end, items.length);
                resultsCountEl.innerHTML = `Showing <strong>${start + 1}-${showingTo}</strong> of <strong>${items.length}</strong> properties`;
            }
        }

        // Wire up clicks
        pageLinks.forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const num = parseInt(a.textContent.trim(), 10);
                if (!isNaN(num)) renderPage(num);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', e => {
                e.preventDefault();
                renderPage(currentPage - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', e => {
                e.preventDefault();
                renderPage(currentPage + 1);
            });
        }

        // Initial render
        renderPage(1);
    }

    // ================ Price Range Slider ================
    const priceSlider = document.querySelector('.price-slider');
    
    if (priceSlider) {
        const minPrice = priceSlider.querySelector('.min-price');
        const maxPrice = priceSlider.querySelector('.max-price');
        const minValue = priceSlider.querySelector('.min-value');
        const maxValue = priceSlider.querySelector('.max-value');
        
        if (minPrice && maxPrice) {
            minPrice.addEventListener('input', function() {
                if (minValue) {
                    minValue.textContent = formatPrice(this.value);
                }
            });
            
            maxPrice.addEventListener('input', function() {
                if (maxValue) {
                    maxValue.textContent = formatPrice(this.value);
                }
            });
        }
    }

    // ================ Format Price (Indian Rupees) ================
    function formatPrice(amount) {
        const num = parseInt(amount);
        if (num >= 10000000) {
            return '₹' + (num / 10000000).toFixed(2) + ' Cr';
        } else if (num >= 100000) {
            return '₹' + (num / 100000).toFixed(2) + ' Lakh';
        } else {
            return '₹' + num.toLocaleString('en-IN');
        }
    }

    // ================ Favorite Properties ================
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            const propertyId = this.getAttribute('data-property-id');
            const isFavorite = this.classList.contains('active');
            
            // Save to localStorage
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            if (isFavorite) {
                if (!favorites.includes(propertyId)) {
                    favorites.push(propertyId);
                }
                showNotification('Property added to favorites!');
            } else {
                favorites = favorites.filter(id => id !== propertyId);
                showNotification('Property removed from favorites!');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    // ================ Notification System ================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ================ Initialize on Page Load ================
    window.addEventListener('load', () => {
        // Hide preloader if exists
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }

        // Load favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favoriteButtons.forEach(button => {
            const propertyId = button.getAttribute('data-property-id');
            if (favorites.includes(propertyId)) {
                button.classList.add('active');
            }
        });
    });

    // ================ Export functions for external use ================
    window.RealEstateApp = {
        formatPrice,
        showNotification
    };

})();

