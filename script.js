// Scroll-trigger animation using Intersection Observer

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

// Observe all animated elements
document.querySelectorAll(".animate").forEach(el => {
    observer.observe(el);
});
