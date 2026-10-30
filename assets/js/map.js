document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector("#citysense-full-map");

    if (!element || typeof L === "undefined") {
        console.error("CitySense: mapa ou Leaflet não encontrado.");
        return;
    }

    const center = [-16.7286, -43.8578];

    const map = L.map(element, {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView(center, 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap</a> contributors'
    }).addTo(map);

    element.citySenseMap = map;

    const categories = {
        roads: {
            name: "Buraco ou dano na via",
            color: "#e85d4a"
        },
        lighting: {
            name: "Iluminação pública",
            color: "#e8b83f"
        },
        water: {
            name: "Vazamento de água",
            color: "#3995dc"
        },
        sidewalks: {
            name: "Calçada danificada",
            color: "#ed8b45"
        },
        drainage: {
            name: "Drenagem ou alagamento",
            color: "#9265d8"
        },
        signs: {
            name: "Sinalização danificada",
            color: "#78a94c"
        }
    };

    let selectedCategory = null;
    let pendingLocation = null;
    let nextId = 1;

    const markers = L.featureGroup().addTo(map);

    const selectionBox = document.querySelector("#reportSelection");
    const selectedName = document.querySelector("#selectedCategoryName");
    const coordinateOutput = document.querySelector("#reportMapCoordinates");
    const instruction = document.querySelector("#mapInstruction");

    const modal = document.querySelector("#reportModal");
    const modalBackdrop = modal.querySelector(".report-modal-backdrop");
    const modalCard = modal.querySelector(".report-form-card");
    const form = document.querySelector("#reportForm");

    const formCategoryName = document.querySelector("#formCategoryName");
    const formCategoryPin = document.querySelector("#formCategoryPin");
    const formCoordinates = document.querySelector("#formCoordinates");

    const titleInput = document.querySelector("#reportTitle");
    const descriptionInput = document.querySelector("#reportDescription");

    const toast = document.querySelector("#reportToast");

    function formatCoordinates(latlng) {
        return `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    }

    function setSelectedCategory(category) {
        selectedCategory = category;

        document.querySelectorAll(".report-marker-tool").forEach((button) => {
            button.classList.toggle(
                "is-selected",
                button.dataset.category === category
            );
        });

        if (category && categories[category]) {
            selectionBox.hidden = false;
            selectedName.textContent = categories[category].name;

            instruction.innerHTML =
                "<span>↙</span> Agora clique no mapa para posicionar o marcador.";
        } else {
            selectionBox.hidden = true;

            instruction.innerHTML =
                "<span>↙</span> Selecione uma categoria e marque o local no mapa.";
        }
    }

    function openReportForm(category, latlng) {
        if (!categories[category] || !latlng) return;

        selectedCategory = category;
        pendingLocation = L.latLng(latlng.lat, latlng.lng);

        const info = categories[category];

        formCategoryName.textContent = info.name;
        formCategoryPin.style.setProperty("--pin-color", info.color);
        formCoordinates.textContent = formatCoordinates(pendingLocation);

        titleInput.value = "";
        descriptionInput.value = "";

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("report-modal-open");

        if (typeof gsap !== "undefined") {
            gsap.killTweensOf([modalBackdrop, modalCard]);

            gsap.to(modalBackdrop, {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out"
            });

            gsap.fromTo(
                modalCard,
                {
                    opacity: 0,
                    y: 22,
                    scale: 0.98
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out"
                }
            );
        } else {
            modalBackdrop.style.opacity = "1";
            modalCard.style.opacity = "1";
            modalCard.style.transform = "none";
        }

        window.setTimeout(() => titleInput.focus(), 180);
    }

    function closeReportForm() {
        if (!modal.classList.contains("is-open")) return;

        const finishClose = () => {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("report-modal-open");
        };

        if (typeof gsap !== "undefined") {
            gsap.to(modalCard, {
                opacity: 0,
                y: 12,
                scale: 0.99,
                duration: 0.2,
                ease: "power2.in"
            });

            gsap.to(modalBackdrop, {
                opacity: 0,
                duration: 0.2,
                onComplete: finishClose
            });
        } else {
            finishClose();
        }
    }

    function showToast() {
        toast.classList.add("is-visible");

        if (typeof gsap !== "undefined") {
            gsap.killTweensOf(toast);

            gsap.fromTo(
                toast,
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    ease: "power3.out"
                }
            );

            gsap.delayedCall(3.5, () => {
                gsap.to(toast, {
                    opacity: 0,
                    y: 10,
                    duration: 0.25,
                    onComplete: () => {
                        toast.classList.remove("is-visible");
                    }
                });
            });
        } else {
            toast.style.opacity = "1";
            toast.style.transform = "none";

            window.setTimeout(() => {
                toast.classList.remove("is-visible");
            }, 3500);
        }
    }

    function makeMarkerIcon(color, isNew = false) {
        return L.divIcon({
            className: "citysense-report-marker" + (isNew ? " marker-new" : ""),
            html: `
                <span class="report-pin" style="--pin-color:${color}">
                    <span>!</span>
                </span>
            `,
            iconSize: [34, 40],
            iconAnchor: [17, 35],
            popupAnchor: [0, -33]
        });
    }

    function addOccurrence(data) {
        const info = categories[data.category];

        if (!info) return;

        const marker = L.marker(data.latlng, {
            icon: makeMarkerIcon(info.color, true),
            riseOnHover: true
        });

        const popup = document.createElement("div");
        const heading = document.createElement("strong");
        const category = document.createElement("div");
        const description = document.createElement("p");
        const coordinates = document.createElement("small");

        heading.textContent = data.title;
        category.textContent = info.name;
        description.textContent = data.description;
        coordinates.textContent = formatCoordinates(data.latlng);

        description.style.margin = "7px 0";
        coordinates.style.color = "#78847d";

        popup.append(heading, category, description, coordinates);
        marker.bindPopup(popup);

        marker.addTo(markers);
        marker.openPopup();

        if (typeof gsap !== "undefined") {
            const markerElement = marker.getElement();

            if (markerElement) {
                gsap.fromTo(
                    markerElement,
                    {
                        opacity: 0,
                        scale: 0.5
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.35,
                        ease: "back.out(1.7)"
                    }
                );
            }
        }

        coordinateOutput.textContent =
            `Último local marcado: ${formatCoordinates(data.latlng)}`;

        return marker;
    }

    // Seleção de categoria: clique ou toque.
    document.querySelectorAll(".report-marker-tool").forEach((button) => {
        button.addEventListener("click", () => {
            setSelectedCategory(button.dataset.category);
        });

        // Permite arrastar a ferramenta da lateral para o mapa.
        button.addEventListener("dragstart", (event) => {
            const payload = {
                category: button.dataset.category
            };

            event.dataTransfer.setData(
                "application/x-citysense-marker",
                JSON.stringify(payload)
            );

            event.dataTransfer.effectAllowed = "copy";
            setSelectedCategory(button.dataset.category);
        });
    });

    // Permite soltar uma categoria sobre o mapa.
    element.addEventListener("dragover", (event) => {
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "copy";
        }
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault();

        const raw = event.dataTransfer.getData(
            "application/x-citysense-marker"
        );

        if (!raw) return;

        try {
            const payload = JSON.parse(raw);
            const rect = element.getBoundingClientRect();

            const point = L.point(
                event.clientX - rect.left,
                event.clientY - rect.top
            );

            const latlng = map.containerPointToLatLng(point);

            openReportForm(payload.category, latlng);
        } catch (error) {
            console.error("Não foi possível posicionar o marcador.", error);
        }
    });

    // Clique no mapa: funciona também em dispositivos móveis.
    map.on("click", (event) => {
        if (!selectedCategory) {
            instruction.innerHTML =
                "<span>!</span> Escolha uma categoria na lateral antes de marcar o local.";

            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    instruction,
                    { x: -3 },
                    {
                        x: 3,
                        duration: 0.07,
                        repeat: 3,
                        yoyo: true,
                        clearProps: "x"
                    }
                );
            }

            return;
        }

        openReportForm(selectedCategory, event.latlng);
    });

    // Confirmação do formulário: cria um marcador temporário.
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!selectedCategory || !pendingLocation) return;

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!title || !description) {
            form.reportValidity();
            return;
        }

        addOccurrence({
            id: nextId++,
            category: selectedCategory,
            title,
            description,
            latlng: pendingLocation
        });

        closeReportForm();
        setSelectedCategory(null);
        showToast();
    });

    document.querySelector("#cancelReportForm").addEventListener(
        "click",
        closeReportForm
    );

    document.querySelector("#closeReportModal").addEventListener(
        "click",
        closeReportForm
    );

    modalBackdrop.addEventListener("click", closeReportForm);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeReportForm();
    });

    document.querySelector("#cancelSelection").addEventListener(
        "click",
        () => setSelectedCategory(null)
    );

    document.querySelector("#clearReportMarkers").addEventListener(
        "click",
        () => {
            markers.clearLayers();
            coordinateOutput.textContent = "Nenhum local selecionado";
            showToast();
        }
    );

    // Cards da legenda selecionam a categoria correspondente.
    document.querySelectorAll("[data-card-category]").forEach((card) => {
        card.addEventListener("click", () => {
            const category = card.dataset.cardCategory;

            setSelectedCategory(category);

            const tool = document.querySelector(
                `.report-marker-tool[data-category="${category}"]`
            );

            if (tool) {
                tool.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }

            if (typeof gsap !== "undefined") {
                gsap.fromTo(
                    card,
                    { y: -3 },
                    {
                        y: 0,
                        duration: 0.35,
                        ease: "power2.out"
                    }
                );
            }
        });
    });

    // Corrige o tamanho do Leaflet depois da montagem do layout.
    requestAnimationFrame(() => map.invalidateSize());

    window.addEventListener("resize", () => {
        map.invalidateSize();
    });

    window.citySenseReportMap = map;
});