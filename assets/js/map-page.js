document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
        console.warn("GSAP não foi carregado.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        gsap.set([
            ".report-intro",
            ".report-workspace",
            ".report-category-card",
            ".map-page-footer"
        ], {
            clearProps: "all"
        });

        return;
    }

    // Entrada da página
    const intro = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    intro
        .from(".map-page-header", {
            y: -20,
            opacity: 0,
            duration: 0.65
        })
        .from(".report-intro > div", {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12
        }, "-=0.3")
        .from(".report-workspace", {
            y: 22,
            opacity: 0,
            duration: 0.8
        }, "-=0.25")
        .from(".report-map-toolbar", {
            y: -10,
            opacity: 0,
            duration: 0.4
        }, "-=0.4");

    // Ferramentas laterais
    gsap.from(".report-marker-tool", {
        x: -16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.07,
        delay: 0.65,
        ease: "power2.out"
    });

    // Entrada dos cards explicativos ao rolar a página
    gsap.from(".report-section-heading", {
        scrollTrigger: {
            trigger: ".report-legend-section",
            start: "top 85%",
            once: true
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    });

    gsap.from(".report-category-card", {
        scrollTrigger: {
            trigger: ".report-category-grid",
            start: "top 85%",
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out"
    });

    // Hover dos cards
    document.querySelectorAll(".report-category-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -5,
                duration: 0.25,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Feedback visual dos alfinetes laterais
    document.querySelectorAll(".report-marker-tool").forEach((button) => {
        const pin = button.querySelector(".report-pin");

        button.addEventListener("mouseenter", () => {
            gsap.to(pin, {
                y: -2,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(pin, {
                y: 0,
                duration: 0.25,
                ease: "power2.out"
            });
        });
    });

    // Formulário e backdrop são animados pelo map.js.
    // O ScrollTrigger é utilizado somente na seção explicativa.
});