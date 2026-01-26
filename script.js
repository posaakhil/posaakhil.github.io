document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const loader = document.getElementById('loader');

    // --- PRE-LOADER ---
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // --- STICKY NAVBAR ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- HAMBURGER MENU ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- TYPING ANIMATION ---
    const roleAnimSpan = document.getElementById('role-anim');
    if (roleAnimSpan) {
        const roles = [
            'Production Support Engineer',
            'Application Support Engineer',
            'System Operations Engineer',
            'Cloud Support Engineer',
            'DevOps Support Engineer',
            'Technical Support Engineer'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            roleAnimSpan.textContent = currentRole.substring(0, charIndex);
            if (!isDeleting && charIndex < currentRole.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    roleIndex = (roleIndex + 1) % roles.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }

    const domainAnimSpan = document.getElementById('domain-anim');
    if (domainAnimSpan) {
        const domains = [
            'Healthcare Systems',
            'Financial & Banking Platforms',
            'Insurance Tech',
            'E-commerce Infrastructure'
        ];
        let domainIndex = 0;
        let domainCharIndex = 0;
        let isDeletingDomain = false;

        function typeDomains() {
            const currentDomain = domains[domainIndex];
            domainAnimSpan.textContent = currentDomain.substring(0, domainCharIndex);

            if (!isDeletingDomain && domainCharIndex < currentDomain.length) {
                domainCharIndex++;
                setTimeout(typeDomains, 100);
            } else if (isDeletingDomain && domainCharIndex > 0) {
                domainCharIndex--;
                setTimeout(typeDomains, 50);
            } else {
                isDeletingDomain = !isDeletingDomain;
                if (!isDeletingDomain) {
                    domainIndex = (domainIndex + 1) % domains.length;
                }
                setTimeout(typeDomains, 1200);
            }
        }
        typeDomains();
    }

    // --- HERO BACKGROUND ANIMATION ---
    function createAdvancedAnimations() {
        const container = document.getElementById('hero-background-animation');
        if (!container) return;

        // 1. Digital Constellation (Nodes + Lines)
        const nodesCount = 25;
        const nodes = [];
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        container.appendChild(svg);

        for (let i = 0; i < nodesCount; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.transform = `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`;
            node.style.animation = `float ${10 + Math.random() * 20}s ${Math.random() * -30}s ease-in-out infinite`;
            container.appendChild(node);
            nodes.push({ element: node, x, y });
        }

        setInterval(() => {
            // Create a temporary line
            const p1 = nodes[Math.floor(Math.random() * nodes.length)];
            const p2 = nodes[Math.floor(Math.random() * nodes.length)];
            if (p1 === p2) return;

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', p1.x + '%');
            line.setAttribute('y1', p1.y + '%');
            line.setAttribute('x2', p2.x + '%');
            line.setAttribute('y2', p2.y + '%');
            
            svg.appendChild(line);

            setTimeout(() => {
                svg.removeChild(line);
            }, 4000); // Lines fade out via CSS animation and are then removed

        }, 200); // Interval to create new lines

        // 2. Shooting Stars
        function createShootingStars() {
            setInterval(() => {
                const star = document.createElement('div');
                star.classList.add('shooting-star');
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = '-100px'; // Start off-screen
                const duration = 2 + Math.random() * 3;
                star.style.animationDuration = `${duration}s`;
                container.appendChild(star);
                setTimeout(() => {
                    container.removeChild(star);
                }, duration * 1000);
            }, 4000);
        }
        createShootingStars();

        // 3. Parallax Effect
        const heroSection = document.getElementById('hero');
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            const xPos = (clientX / offsetWidth - 0.5) * 40; // Multiplier adjusts effect intensity
            const yPos = (clientY / offsetHeight - 0.5) * 40;
            
            container.style.transform = `translateX(${xPos * -1}px) translateY(${yPos * -1}px)`;
        });
    }
    createAdvancedAnimations();

    // --- SCROLL-SPY & FADE-IN ANIMATIONS ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    let dashboardAnimated = false;

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scroll-spy
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const correspondingLink = document.querySelector(`#nav-menu a[href="#${entry.target.id}"]`);
                    if(correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                });

                // Fade-in effect
                entry.target.classList.add('show');

                // Animate skills
                if (entry.target.id === 'skills') {
                    animateSkills();
                }

                // Animate dashboard
                if (entry.target.id === 'dashboard' && !dashboardAnimated) {
                    animateUptimeCounter();
                    document.getElementById('api-chart-line').style.animationPlayState = 'running';
                    dashboardAnimated = true;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- DASHBOARD UPTIME COUNTER ---
    function animateUptimeCounter() {
        const counter = document.getElementById('uptime-counter');
        if (!counter) return;
        let start = 99.9;
        const end = 99.999;
        const duration = 2000;
        const range = end - start;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = start + progress * range;
            counter.textContent = `${current.toFixed(5)}%`;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    // --- SKILL BAR ANIMATION ---
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const level = parseInt(item.getAttribute('data-level'));
            const skillLevelDiv = item.querySelector('.skill-level');
            const skillLabel = item.querySelector('.skill-label');
            
            if (skillLevelDiv.style.width === `${level}%`) return;

            skillLevelDiv.style.width = level + '%';
            skillLevelDiv.classList.add('animated');

            let labelText = '';
            if(level >= 90) labelText = 'Expert';
            else if (level >= 75) labelText = 'Advanced';
            else if (level >= 60) labelText = 'Proficient';
            else labelText = 'Familiar';
            
            if(skillLabel) {
                skillLabel.textContent = labelText;
            }
        });
    }
});
