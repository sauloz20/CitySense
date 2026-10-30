document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const mapElement = document.querySelector("#citysense-full-map");

    if (!mapElement || typeof L === "undefined") {
        console.error("CitySense: não foi possível inicializar o mapa.");
        return;
    }

    const $ = (selector) => document.querySelector(selector);

    const categories = {
        roads: {
            name: "Vias públicas",
            color: "#e85d4a",
            icon: "!",
            subtypes: [
                "Buraco pequeno",
                "Buraco de tamanho moderado",
                "Cratera ou buraco de grandes dimensões",
                "Asfalto afundando",
                "Pavimento rachado",
                "Desmoronamento ou erosão da via",
                "Outro problema na via"
            ],
            responsible: "prefeitura"
        },

        lighting: {
            name: "Iluminação pública",
            color: "#e8b83f",
            icon: "!",
            subtypes: [
                "Poste sem iluminação",
                "Lâmpada piscando",
                "Luminária danificada",
                "Vários postes apagados",
                "Outro problema de iluminação"
            ],
            responsible: "prefeitura"
        },

        water: {
            name: "Água e abastecimento",
            color: "#3995dc",
            icon: "!",
            subtypes: [
                "Vazamento de água na rua",
                "Cano aparentemente rompido",
                "Vazamento próximo a um hidrômetro",
                "Falta de abastecimento",
                "Outro problema de abastecimento"
            ],
            responsible: "copasa"
        },

        sewage: {
            name: "Esgoto e saneamento",
            color: "#9265d8",
            icon: "!",
            subtypes: [
                "Esgoto a céu aberto",
                "Retorno de esgoto",
                "Vazamento na rede de esgoto",
                "Tampa de inspeção danificada",
                "Outro problema de saneamento"
            ],
            responsible: "copasa"
        },

        sidewalks: {
            name: "Calçadas e acessibilidade",
            color: "#ed8b45",
            icon: "!",
            subtypes: [
                "Calçada quebrada",
                "Piso irregular",
                "Rampa de acessibilidade danificada",
                "Obstáculo bloqueando a passagem",
                "Outro problema na calçada"
            ],
            responsible: "prefeitura"
        },

        drainage: {
            name: "Drenagem urbana",
            color: "#9265d8",
            icon: "!",
            subtypes: [
                "Bueiro entupido",
                "Bueiro ou tampa danificada",
                "Ponto de alagamento",
                "Canaleta danificada",
                "Outro problema de drenagem"
            ],
            responsible: "prefeitura"
        },

        signs: {
            name: "Sinalização e trânsito",
            color: "#78a94c",
            icon: "!",
            subtypes: [
                "Placa caída ou danificada",
                "Placa ausente",
                "Semáforo aparentemente defeituoso",
                "Sinalização viária apagada",
                "Outro problema de sinalização"
            ],
            responsible: "traffic"
        },

        electrical: {
            name: "Rede elétrica",
            color: "#b94b3e",
            icon: "!",
            subtypes: [
                "Fio ou cabo caído",
                "Fio aparentemente exposto",
                "Estrutura elétrica danificada",
                "Poste danificado",
                "Outro problema na rede elétrica"
            ],
            responsible: "cemig"
        },

        trees: {
            name: "Árvores e arborização",
            color: "#43865a",
            icon: "!",
            subtypes: [
                "Árvore caída",
                "Galho bloqueando a passagem",
                "Galhos próximos à rede elétrica",
                "Árvore aparentemente instável",
                "Outro problema de arborização"
            ],
            responsible: "prefeitura"
        },

        waste: {
            name: "Limpeza urbana",
            color: "#657a53",
            icon: "!",
            subtypes: [
                "Lixo acumulado em área pública",
                "Descarte irregular de resíduos",
                "Entulho na rua ou calçada",
                "Resíduos bloqueando a passagem",
                "Outro problema de limpeza"
            ],
            responsible: "prefeitura"
        }
    };

    const responsibleNames = {
        unknown: "Não identificado pelo cidadão",
        prefeitura: "Prefeitura / órgão municipal",
        cemig: "Cemig / concessionária elétrica",
        copasa: "Copasa / prestador de água e esgoto",
        traffic: "Órgão responsável pelo trânsito",
        other: "Outro órgão ou empresa"
    };

    const map = L.map(mapElement, {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([-16.7286, -43.8578], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap</a> contributors'
    }).addTo(map);

    const occurrenceLayer = L.featureGroup().addTo(map);

    let selectedCategory = null;
    let pendingLocation = null;
    let nextId = 1;
    let toastTimer = null;

    const modal = $("#reportModal");
    const backdrop = modal.querySelector(".report-modal-backdrop");
    const modalCard = modal.querySelector(".report-form-card");
    const form = $("#reportForm");

    const subtypeSelect = $("#reportSubtype");
    const severitySelect = $("#reportSeverity");
    const riskSelect = $("#reportRisk");
    const responsibleSelect = $("#reportResponsible");

    const titleInput = $("#reportTitle");
    const descriptionInput = $("#reportDescription");

    const categoryName = $("#formCategoryName");
    const categoryPin = $("#formCategoryPin");
    const coordinatesOutput = $("#formCoordinates");

    const selectionPanel = $("#reportSelection");
    const selectedCategoryName = $("#selectedCategoryName");
    const instruction = $("#mapInstruction");
    const mapCoordinates = $("#reportMapCoordinates");

    const toast = $("#reportToast");
    const toastTitle = $("#reportToastTitle");
    const toastMessage = $("#reportToastMessage");

    // --------------------------------------------------
    // COORDENADAS
    // --------------------------------------------------

    function formatCoordinates(latlng) {
        return `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    }

    // --------------------------------------------------
    // SELEÇÃO DE CATEGORIA
    // --------------------------------------------------

    function selectCategory(key) {
        if (!categories[key]) return;

        selectedCategory = key;

        document.querySelectorAll(".report-marker-tool").forEach((button) => {
            button.classList.toggle(
                "is-selected",
                button.dataset.category === key
            );
        });

        selectionPanel.hidden = false;
        selectedCategoryName.textContent = categories[key].name;

        instruction.innerHTML =
            "<span>↙</span> Categoria selecionada. Agora clique no local do problema.";

        if (typeof gsap !== "undefined") {
            gsap.fromTo(
                selectionPanel,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }

    function clearCategorySelection() {
        selectedCategory = null;
        selectionPanel.hidden = true;

        document.querySelectorAll(".report-marker-tool").forEach((button) => {
            button.classList.remove("is-selected");
        });

        instruction.innerHTML =
            "<span>↙</span> Selecione uma categoria para começar a registrar.";
    }

    // --------------------------------------------------
    // FORMULÁRIO DINÂMICO
    // --------------------------------------------------

    function populateSubtypes(key) {
        const info = categories[key];

        subtypeSelect.replaceChildren();

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Selecione o tipo de problema";

        subtypeSelect.appendChild(placeholder);

        info.subtypes.forEach((subtype) => {
            const option = document.createElement("option");
            option.value = subtype;
            option.textContent = subtype;

            subtypeSelect.appendChild(option);
        });
    }

    function prepareForm(key, latlng) {
        const info = categories[key];

        selectedCategory = key;
        pendingLocation = L.latLng(latlng.lat, latlng.lng);

        categoryName.textContent = info.name;
        categoryPin.style.setProperty("--pin-color", info.color);

        coordinatesOutput.textContent = formatCoordinates(pendingLocation);

        populateSubtypes(key);

        severitySelect.value = "";
        riskSelect.value = "";
        responsibleSelect.value = "unknown";

        titleInput.value = "";
        descriptionInput.value = "";

        // O órgão sugerido é apenas uma sugestão editável.
        // Não significa que a responsabilidade foi confirmada.
        responsibleSelect.value = info.responsible;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("report-modal-open");

        if (typeof gsap !== "undefined") {
            gsap.killTweensOf([backdrop, modalCard]);

            gsap.set(backdrop, { opacity: 0 });
            gsap.set(modalCard, { opacity: 0, y: 20, scale: 0.98 });

            gsap.to(backdrop, {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out"
            });

            gsap.to(modalCard, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power3.out"
            });
        } else {
            backdrop.style.opacity = "1";
            modalCard.style.opacity = "1";
            modalCard.style.transform = "none";
        }

        window.setTimeout(() => titleInput.focus(), 200);
    }

    function closeForm() {
        if (!modal.classList.contains("is-open")) return;

        const finish = () => {
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

            gsap.to(backdrop, {
                opacity: 0,
                duration: 0.2,
                onComplete: finish
            });
        } else {
            finish();
        }
    }

    // --------------------------------------------------
    // MARCADORES
    // --------------------------------------------------

    function createMarkerIcon(key) {
        const info = categories[key];

        return L.divIcon({
            className: "citysense-report-marker",
            html: `
                <span class="report-pin"
                      style="--pin-color:${info.color}">
                    <span>${info.icon}</span>
                </span>
            `,
            iconSize: [34, 40],
            iconAnchor: [17, 35],
            popupAnchor: [0, -33]
        });
    }

    function addOccurrence(data) {
        const info = categories[data.category];

        const marker = L.marker(data.location, {
            icon: createMarkerIcon(data.category),
            riseOnHover: true
        });

        // Usamos textContent para exibir os dados como texto,
        // evitando interpretar a descrição digitada como HTML.
        const popup = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = data.title;

        const type = document.createElement("div");
        type.textContent = data.subtype;

        const category = document.createElement("div");
        category.textContent = info.name;

        const severity = document.createElement("p");
        severity.textContent =
            `Gravidade: ${data.severityLabel}`;

        const description = document.createElement("p");
        description.textContent = data.description;

        const responsible = document.createElement("p");
        responsible.textContent =
            `Responsável indicado: ${responsibleNames[data.responsible]}`;

        const unverified = document.createElement("small");
        unverified.textContent = "Responsabilidade ainda não verificada.";

        unverified.style.color = "#78847d";

        popup.append(
            title,
            type,
            category,
            severity,
            description,
            responsible,
            unverified
        );

        marker.bindPopup(popup);
        marker.addTo(occurrenceLayer);
        marker.openPopup();

        // Atualiza o mapa e o resumo da localização.
        mapCoordinates.textContent =
            `Último registro: ${formatCoordinates(data.location)}`;

        if (typeof gsap !== "undefined") {
            const markerElement = marker.getElement();

            if (markerElement) {
                gsap.fromTo(
                    markerElement,
                    { scale: 0.4, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.45,
                        ease: "back.out(1.7)"
                    }
                );
            }
        }

        return marker;
    }

    // --------------------------------------------------
    // NOTIFICAÇÕES
    // --------------------------------------------------

    function showToast(title, message) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.add("is-visible");

        if (toastTimer) {
            window.clearTimeout(toastTimer);
        }

        if (typeof gsap !== "undefined") {
            gsap.killTweensOf(toast);

            gsap.fromTo(
                toast,
                { opacity: 0, y: 14 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );

            toastTimer = window.setTimeout(() => {
                gsap.to(toast, {
                    opacity: 0,
                    y: 10,
                    duration: 0.25,
                    onComplete: () => toast.classList.remove("is-visible")
                });
            }, 3500);
        } else {
            toast.style.opacity = "1";
            toast.style.transform = "none";

            toastTimer = window.setTimeout(() => {
                toast.classList.remove("is-visible");
                toast.style.opacity = "0";
            }, 3500);
        }
    }

    // --------------------------------------------------
    // FERRAMENTAS DA LATERAL
    // --------------------------------------------------

    document.querySelectorAll(".report-marker-tool").forEach((button) => {
        button.addEventListener("click", () => {
            selectCategory(button.dataset.category);
        });

        button.addEventListener("dragstart", (event) => {
            selectCategory(button.dataset.category);

            event.dataTransfer.setData(
                "text/citysense-category",
                button.dataset.category
            );

            event.dataTransfer.effectAllowed = "copy";
        });
    });

    // --------------------------------------------------
    // ARRASTAR E SOLTAR NO MAPA
    // --------------------------------------------------

    mapElement.addEventListener("dragover", (event) => {
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "copy";
        }
    });

    mapElement.addEventListener("drop", (event) => {
        event.preventDefault();

        const key = event.dataTransfer.getData("text/citysense-category");

        if (!categories[key]) return;

        const rect = mapElement.getBoundingClientRect();

        const point = L.point(
            event.clientX - rect.left,
            event.clientY - rect.top
        );

        const latlng = map.containerPointToLatLng(point);

        mapCoordinates.textContent = formatCoordinates(latlng);

        prepareForm(key, latlng);
    });

    // --------------------------------------------------
    // CLIQUE NO MAPA
    // --------------------------------------------------

    map.on("click", (event) => {
        if (!selectedCategory) {
            instruction.innerHTML =
                "<span>!</span> Escolha uma categoria na lateral primeiro.";

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

        mapCoordinates.textContent = formatCoordinates(event.latlng);

        prepareForm(selectedCategory, event.latlng);
    });

    // --------------------------------------------------
    // SALVAR NA SESSÃO ATUAL
    // --------------------------------------------------

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!selectedCategory || !pendingLocation) return;

        if (!form.reportValidity()) return;

        const severityLabels = {
            leve: "Leve",
            moderada: "Moderada",
            grave: "Grave",
            critica: "Crítica"
        };

        const occurrence = {
            id: nextId++,
            category: selectedCategory,
            subtype: subtypeSelect.value,
            severity: severitySelect.value,
            severityLabel: severityLabels[severitySelect.value],
            immediateRisk: riskSelect.value,
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            responsible: responsibleSelect.value,
            location: L.latLng(
                pendingLocation.lat,
                pendingLocation.lng
            )
        };

        addOccurrence(occurrence);

        closeForm();
        clearCategorySelection();

        showToast(
            "Ocorrência adicionada",
            "O marcador ficará disponível enquanto esta página estiver aberta."
        );

        pendingLocation = null;
    });

    // --------------------------------------------------
    // CONTROLES DO FORMULÁRIO
    // --------------------------------------------------

    $("#cancelReportForm").addEventListener("click", closeForm);
    $("#closeReportModal").addEventListener("click", closeForm);
    backdrop.addEventListener("click", closeForm);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeForm();
    });

    $("#cancelSelection").addEventListener("click", clearCategorySelection);

    $("#clearReportMarkers").addEventListener("click", () => {
        occurrenceLayer.clearLayers();
        mapCoordinates.textContent = "Marcadores da sessão removidos.";

        showToast(
            "Mapa limpo",
            "Os marcadores desta sessão foram removidos."
        );
    });

    // --------------------------------------------------
    // CARDS EXPLICATIVOS
    // --------------------------------------------------

    document.querySelectorAll("[data-card-category]").forEach((card) => {
        function activateCard() {
            const key = card.dataset.cardCategory;

            selectCategory(key);

            const tool = document.querySelector(
                `.report-marker-tool[data-category="${key}"]`
            );

            if (tool) {
                tool.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        }

        card.addEventListener("click", activateCard);

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activateCard();
            }
        });
    });

    // --------------------------------------------------
    // RISCO IMEDIATO
    // --------------------------------------------------

    riskSelect.addEventListener("change", () => {
        if (riskSelect.value === "sim") {
            showToast(
                "Atenção à segurança",
                "Mantenha distância do perigo e procure o serviço responsável."
            );
        }
    });

    // --------------------------------------------------
    // RESPONSIVIDADE DO LEAFLET
    // --------------------------------------------------

    requestAnimationFrame(() => map.invalidateSize());

    window.addEventListener("resize", () => {
        map.invalidateSize();
    });

    // Referência útil para depuração no navegador.
    window.citySenseReportMap = map;
});