document.addEventListener('DOMContentLoaded', () => {
    initStatsCounter();
});

function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const rawText = element.innerText;
        const targetNumber = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
        const hasUnit = rawText.includes('طن');
        
        let currentCount = 0;
        const duration = 2000; 
        const frameRate = 1000 / 60; 
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetNumber / totalFrames;
        let frame = 0;

        const counterInterval = setInterval(() => {
            frame++;
            currentCount += increment;
            
            if (frame >= totalFrames) {
                element.innerText = targetNumber.toLocaleString('en-US') + (hasUnit ? ' طن' : '');
                clearInterval(counterInterval);
            } else {
                element.innerText = Math.floor(currentCount).toLocaleString('en-US') + (hasUnit ? ' طن' : '');
            }
        }, frameRate);
    };

    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
}
