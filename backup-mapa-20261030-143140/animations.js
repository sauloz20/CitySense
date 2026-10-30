document.addEventListener("DOMContentLoaded", () => {

    // Verifica se o GSAP foi carregado
    if (!window.gsap) {
        console.error("GSAP não foi carregado.");
        document.querySelector("#pageLoader")?.remove();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Remove a tela de carregamento
    const loader = document.querySelector("#pageLoader");

    if (loader) {
        if (reduceMotion) {
            loader.remove();
        } else {
            const loaderTimeline = gsap.timeline({
                onComplete: () => loader.remove()
            });

            loaderTimeline
                .to(".loader-line span", {
                    scaleX: 1,
                    duration: 0.7,
                    ease: "power2.inOut"
                })
                .to(loader, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut"
                });
        }
    }

    if (reduceMotion) {
        return;
    }

    // HERO: sequência de entrada
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        },
        delay: 0.5
    });

    heroTimeline
        .from(".hero-content .eyebrow", {
            y: 20,
            opacity: 0,
            duration: 0.7
        })
        .from(".hero-title", {
            y: 65,
            opacity: 0,
            duration: 1
        }, "-=0.3")
        .from(".hero-description", {
            y: 25,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".hero-actions", {
            y: 20,
            opacity: 0,
            duration: 0.7
        }, "-=0.4")
        .from(".hero-footer", {
            y: 15,
            opacity: 0,
            duration: 0.7
        }, "-=0.4")
        .from(".map-card", {
            scale: 0.92,
            opacity: 0,
            rotateY: -8,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1");

    // ELEMENTOS FLUTUANTES
    gsap.from(".floating-card", {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.3,
        ease: "back.out(1.5)"
    });

    gsap.to(".floating-card-top", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".floating-card-bottom", {
        y: 9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // MARCADORES DO MAPA
    gsap.from(".map-marker", {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        delay: 1.2,
        ease: "back.out(2)"
    });

    gsap.to(".marker-pulse", {
        scale: 2.5,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        stagger: 0.5,
        ease: "power1.out"
    });

    // SCROLLTRIGGER: REVELAÇÃO DAS SEÇÕES
    gsap.utils.toArray(".reveal").forEach((element) => {

        gsap.from(element, {
            y: 65,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

    });

    // CATEGORIAS: ENTRADA ESCALONADA
    gsap.from(".category-card", {
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.13,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".category-grid",
            start: "top 80%"
        }
    });

    // PROCESSO: ANIMAÇÃO EM SEQUÊNCIA
    gsap.from(".process-item", {
        y: 55,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".process-grid",
            start: "top 82%"
        }
    });

    // DECORAÇÃO DO CTA
    gsap.to(".cta-decoration", {
        rotation: 12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // LINHA DE SCROLL
    gsap.fromTo(".scroll-line",
        { scaleX: 0, transformOrigin: "left" },
        {
            scaleX: 1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        }
    );

    // ATUALIZA POSIÇÃO DOS ELEMENTOS
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

});
