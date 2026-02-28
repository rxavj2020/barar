document.addEventListener('DOMContentLoaded', () => {
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    const container = document.querySelector('.glass-container');

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Fast follow for cursor dot
        if (cursor) {
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
        }

        // Delayed follow for circle (using GSAP for smoothness if available, else standard)
        if (follower && typeof gsap !== 'undefined') {
            gsap.to(follower, {
                x: x,
                y: y,
                duration: 0.15,
                ease: 'power2.out'
            });
        }
    });

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .service-card, .photo-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('hover');
            if (follower) follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('hover');
            if (follower) follower.classList.remove('hover');
        });
    });

    // Slight parallax effect on the background glowing orbs
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (blob1 && blob2) {
            blob1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
            blob2.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
        }

        if (container) {
            // Very subtle tilt effect on the glass container
            const tiltX = (y - 0.5) * 2; // -1 to 1
            const tiltY = (x - 0.5) * -2; // -1 to 1
            container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            container.style.transition = 'transform 0.1s ease-out';
        }
    });

    // Reset container tilt when mouse leaves
    document.addEventListener('mouseleave', () => {
        if (container) {
            container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            container.style.transition = 'transform 0.5s ease-out';
        }
    });

    // --- GSAP Scroll 3D Effects ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Hero 3D Push-back on Scroll
        gsap.to('.hero', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 50,
            z: -300,
            rotationX: 10,
            opacity: 0,
            transformPerspective: 1000,
            ease: 'none'
        });

        // 2. About Section Image Float
        gsap.to('.photo-card', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            rotationY: 15,
            rotationX: -5,
            y: -30,
            ease: 'none'
        });

        // 3. Timeline Items Stagger Reveal
        const timelineItems = gsap.utils.toArray('.gsap-timeline-item');
        timelineItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // 4. Services Header Fade & Reveal
        gsap.from('.gsap-fade-up', {
            scrollTrigger: {
                trigger: '.services',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // 5. 3D Services Cards Intro
        gsap.from('.gsap-3d-card', {
            scrollTrigger: {
                trigger: '.cards-grid',
                start: 'top 75%',
            },
            y: 100,
            z: -500,
            rotationX: -30,
            rotationY: 10,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            transformPerspective: 1200,
            ease: 'back.out(1.5)'
        });

        // 6. Impact Section Scale & Parallax
        gsap.from('.impact .impact-content', {
            scrollTrigger: {
                trigger: '.impact',
                start: 'top 85%',
            },
            y: 50,
            z: 200,
            opacity: 0,
            duration: 1.2,
            transformPerspective: 1000,
            ease: 'power3.out'
        });
    }
});
