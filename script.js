gsap.registerPlugin(ScrollTrigger);

// Function to animate elements
function animateElement(selector) {
    document.querySelectorAll(selector).forEach(element => {
        gsap.set(element, { opacity: 0, y: 50 }); // Ensure initial state is hidden

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 97%", // Start animation when element is 85% in view
                once: true
            },
            opacity: 1,
            y: 0,
            duration: 0.5,    // Slower animation for smoothness
            ease: "power2.out" // Even smoother easing
        });
    });
}

// Animate paragraphs, images, and video
animateElement('.paragraph span');
animateElement('.image-container');
animateElement('.video-container');

// Split paragraphs into words
document.querySelectorAll('.paragraph').forEach(para => {
    const words = para.textContent.trim().split(' ');
    para.innerHTML = words.map(word => 
        `<span class="inline-block opacity-0 translate-y-8">${word}&nbsp;</span>`
    ).join('');
});

// Animate each paragraph independently
document.querySelectorAll('.paragraph').forEach(para => {
    const words = para.querySelectorAll('span');
    
    gsap.set(words, { opacity: 0, y: 8 }); // Ensure initial state is hidden

    gsap.to(words, {
        scrollTrigger: {
            trigger: para,
            start: "bottom 99%", // Start animation when paragraph is 85% in view
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.5,    // Slower animation for smoothness
        stagger: 0.01,    // Slower stagger for smoothness
        ease: "power3.out" // Even smoother easing
    });
});

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (!isTouchDevice()) {
    const lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        lerp: 0.1,
    });

    const scrollPosition = sessionStorage.getItem('scrollPosition') || 0;

    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });

    window.addEventListener('load', () => {
        window.scrollTo(0, scrollPosition);
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
        console.log(e);
    });
} 