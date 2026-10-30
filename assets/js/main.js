document.addEventListener("DOMContentLoaded", () => {

    // Ano automático no rodapé
    const year = document.querySelector("#currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Menu mobile
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector("#navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

    }

    // Efeito de profundidade nos cards
    const cards = document.querySelectorAll("[data-tilt]");

    cards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            if (!window.gsap || event.pointerType === "touch") {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 900,
                duration: 0.35,
                ease: "power2.out",
                overwrite: true
            });

        });

        card.addEventListener("pointerleave", () => {

            if (!window.gsap) return;

            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "power3.out"
            });

        });

    });

});
