document.addEventListener('DOMContentLoaded', () => {
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    const container = document.querySelector('.glass-container');

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
});
