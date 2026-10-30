<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#101c29">

    <meta name="description" content="Registre e explore ocorrências urbanas em Montes Claros com o CitySense.">

    <title>Mapa de Ocorrências | CitySense</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    >

    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossorigin=""
    >

    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/map.css">
    <link rel="stylesheet" href="../assets/css/map-report.css">
</head>

<body class="map-page">

<header class="map-page-header">
    <a href="../index.php#inicio" class="brand">
        <span class="brand-icon">C</span>
        <span>city<span>sense</span></span>
    </a>

    <nav aria-label="Navegação principal">
        <a href="../index.php#inicio">Início</a>
        <a href="../index.php#sobre">Sobre</a>
        <a href="../index.php#categorias">Ocorrências</a>
        <a href="../index.php#funcionamento">Como funciona</a>
        <a href="mapa.php" class="active">Mapa</a>
    </nav>
</header>

<main class="map-page-main report-page-main">

    <!-- INTRODUÇÃO -->

    <section class="map-page-intro report-intro">
        <div>
            <span class="map-page-eyebrow">
                CITYSENSE / INTELIGÊNCIA URBANA
            </span>

            <h1>
                Sua cidade.<br>
                Seu <span>olhar.</span>
            </h1>

            <p>
                Identifique problemas urbanos, indique sua localização
                e ajude a construir uma visão mais completa de Montes Claros.
            </p>
        </div>

        <div class="map-page-status">
            <span></span>
            MAPA INTERATIVO
        </div>
    </section>

    <!-- ÁREA PRINCIPAL -->

    <section class="report-workspace">

        <!-- LATERAL DE CATEGORIAS -->

        <aside class="report-tools">

            <span class="report-step">PASSO 01 / CATEGORIA</span>

            <div class="report-tools-heading">
                <h2>O que você encontrou?</h2>

                <p>
                    Escolha o tipo de problema. Depois, clique no mapa
                    ou arraste a categoria até o local correto.
                </p>
            </div>

            <div class="report-marker-list">

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="roads"
                    draggable="true"
                >
                    <span class="report-pin pin-roads"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Vias públicas</strong>
                        <small>Buracos, crateras e asfalto</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="lighting"
                    draggable="true"
                >
                    <span class="report-pin pin-lighting"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Iluminação pública</strong>
                        <small>Postes apagados ou defeituosos</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="water"
                    draggable="true"
                >
                    <span class="report-pin pin-water"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Água e abastecimento</strong>
                        <small>Vazamentos e canos rompidos</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="sewage"
                    draggable="true"
                >
                    <span class="report-pin pin-sewage"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Esgoto e saneamento</strong>
                        <small>Esgoto exposto ou retorno</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="sidewalks"
                    draggable="true"
                >
                    <span class="report-pin pin-sidewalks"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Calçadas</strong>
                        <small>Pisos quebrados e acessibilidade</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="drainage"
                    draggable="true"
                >
                    <span class="report-pin pin-drainage"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Drenagem urbana</strong>
                        <small>Bueiros e pontos de alagamento</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="signs"
                    draggable="true"
                >
                    <span class="report-pin pin-signs"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Sinalização e trânsito</strong>
                        <small>Placas, semáforos e sinalização</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="electrical"
                    draggable="true"
                >
                    <span class="report-pin pin-electrical"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Rede elétrica</strong>
                        <small>Cabos e estruturas danificadas</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="trees"
                    draggable="true"
                >
                    <span class="report-pin pin-trees"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Árvores e arborização</strong>
                        <small>Árvores caídas ou galhos perigosos</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

                <button
                    type="button"
                    class="report-marker-tool"
                    data-category="waste"
                    draggable="true"
                >
                    <span class="report-pin pin-waste"><span>!</span></span>
                    <span class="report-tool-copy">
                        <strong>Limpeza urbana</strong>
                        <small>Lixo acumulado e descarte irregular</small>
                    </span>
                    <span class="report-tool-plus">+</span>
                </button>

            </div>

            <div class="report-tool-tip">
                <span class="report-tip-icon">↗</span>
                <p>
                    <strong>Dica:</strong> você também pode selecionar uma
                    categoria e depois clicar diretamente no mapa.
                </p>
            </div>

            <div class="report-selection" id="reportSelection" hidden>
                <span class="report-selection-label">CATEGORIA SELECIONADA</span>
                <strong id="selectedCategoryName"></strong>

                <button type="button" id="cancelSelection">
                    Cancelar seleção
                </button>
            </div>

        </aside>

        <!-- MAPA -->

        <div class="report-map-panel">

            <div class="report-map-toolbar">
                <div>
                    <span class="report-map-live-dot"></span>
                    <strong>Montes Claros <span>— MG</span></strong>
                </div>

                <span class="report-map-provider">OPENSTREETMAP</span>
            </div>

            <div class="report-map-instruction" id="mapInstruction">
                <span>↙</span>
                Selecione uma categoria para começar a registrar.
            </div>

            <div
                id="citysense-full-map"
                class="report-map-canvas"
                aria-label="Mapa interativo para registro de ocorrências"
            ></div>

            <div class="report-map-footer">
                <span id="reportMapCoordinates">
                    Selecione um ponto no mapa para ver as coordenadas.
                </span>

                <button type="button" id="clearReportMarkers">
                    Limpar marcadores da sessão
                </button>
            </div>

        </div>

    </section>

    <!-- GUIA DE CATEGORIAS -->

    <section class="report-legend-section">

        <div class="report-section-heading">
            <div>
                <span class="map-page-eyebrow">GUIA DE IDENTIFICAÇÃO</span>

                <h2>
                    Cada problema tem<br>
                    sua <span>categoria.</span>
                </h2>

                <p>
                    Entenda o que registrar em cada categoria e conheça
                    exemplos de ocorrências que podem ser comunicadas.
                </p>
            </div>

            <span class="report-legend-count">10 CATEGORIAS</span>
        </div>

        <div class="report-category-grid">

            <article class="report-category-card" data-card-category="roads" tabindex="0" role="button" aria-label="Selecionar categoria Vias públicas">
                <div class="report-card-top">
                    <span class="report-pin pin-roads"><span>!</span></span>
                    <span class="report-card-index">01 / VIAS</span>
                </div>
                <h3>Vias públicas</h3>
                <p>Buracos, crateras, rachaduras, afundamentos e pavimento danificado.</p>
                <div class="report-card-example"><i></i> Buraco pequeno ou cratera</div>
            </article>

            <article class="report-category-card" data-card-category="lighting" tabindex="0" role="button" aria-label="Selecionar categoria Iluminação pública">
                <div class="report-card-top">
                    <span class="report-pin pin-lighting"><span>!</span></span>
                    <span class="report-card-index">02 / LUZ</span>
                </div>
                <h3>Iluminação pública</h3>
                <p>Postes apagados, luzes intermitentes e luminárias danificadas.</p>
                <div class="report-card-example"><i></i> Poste sem iluminação</div>
            </article>

            <article class="report-category-card" data-card-category="water" tabindex="0" role="button" aria-label="Selecionar categoria Água e abastecimento">
                <div class="report-card-top">
                    <span class="report-pin pin-water"><span>!</span></span>
                    <span class="report-card-index">03 / ÁGUA</span>
                </div>
                <h3>Água e abastecimento</h3>
                <p>Vazamentos, canos rompidos e outros problemas visíveis de abastecimento.</p>
                <div class="report-card-example"><i></i> Vazamento na rua</div>
            </article>

            <article class="report-category-card" data-card-category="sewage" tabindex="0" role="button" aria-label="Selecionar categoria Esgoto e saneamento">
                <div class="report-card-top">
                    <span class="report-pin pin-sewage"><span>!</span></span>
                    <span class="report-card-index">04 / ESGOTO</span>
                </div>
                <h3>Esgoto e saneamento</h3>
                <p>Extravasamento, retorno de esgoto e esgoto exposto em áreas públicas.</p>
                <div class="report-card-example"><i></i> Esgoto a céu aberto</div>
            </article>

            <article class="report-category-card" data-card-category="sidewalks" tabindex="0" role="button" aria-label="Selecionar categoria Calçadas">
                <div class="report-card-top">
                    <span class="report-pin pin-sidewalks"><span>!</span></span>
                    <span class="report-card-index">05 / CALÇADAS</span>
                </div>
                <h3>Calçadas e acessibilidade</h3>
                <p>Pisos quebrados, obstáculos, rampas danificadas e barreiras de circulação.</p>
                <div class="report-card-example"><i></i> Calçada quebrada</div>
            </article>

            <article class="report-category-card" data-card-category="drainage" tabindex="0" role="button" aria-label="Selecionar categoria Drenagem urbana">
                <div class="report-card-top">
                    <span class="report-pin pin-drainage"><span>!</span></span>
                    <span class="report-card-index">06 / DRENAGEM</span>
                </div>
                <h3>Drenagem urbana</h3>
                <p>Bueiros entupidos, drenagem danificada e locais com alagamentos recorrentes.</p>
                <div class="report-card-example"><i></i> Bueiro obstruído</div>
            </article>

            <article class="report-category-card" data-card-category="signs" tabindex="0" role="button" aria-label="Selecionar categoria Sinalização">
                <div class="report-card-top">
                    <span class="report-pin pin-signs"><span>!</span></span>
                    <span class="report-card-index">07 / TRÂNSITO</span>
                </div>
                <h3>Sinalização e trânsito</h3>
                <p>Placas danificadas, semáforos defeituosos e sinalização ausente.</p>
                <div class="report-card-example"><i></i> Placa caída</div>
            </article>

            <article class="report-category-card" data-card-category="electrical" tabindex="0" role="button" aria-label="Selecionar categoria Rede elétrica">
                <div class="report-card-top">
                    <span class="report-pin pin-electrical"><span>!</span></span>
                    <span class="report-card-index">08 / ENERGIA</span>
                </div>
                <h3>Rede elétrica</h3>
                <p>Cabos rompidos, fios expostos e estruturas elétricas visivelmente danificadas.</p>
                <div class="report-card-example"><i></i> Cabo caído na via</div>
            </article>

            <article class="report-category-card" data-card-category="trees" tabindex="0" role="button" aria-label="Selecionar categoria Arborização">
                <div class="report-card-top">
                    <span class="report-pin pin-trees"><span>!</span></span>
                    <span class="report-card-index">09 / ÁRVORES</span>
                </div>
                <h3>Árvores e arborização</h3>
                <p>Árvores caídas, galhos bloqueando a passagem e situações de risco aparente.</p>
                <div class="report-card-example"><i></i> Galho bloqueando a rua</div>
            </article>

            <article class="report-category-card" data-card-category="waste" tabindex="0" role="button" aria-label="Selecionar categoria Limpeza urbana">
                <div class="report-card-top">
                    <span class="report-pin pin-waste"><span>!</span></span>
                    <span class="report-card-index">10 / LIMPEZA</span>
                </div>
                <h3>Limpeza urbana</h3>
                <p>Acúmulo de resíduos em áreas públicas e descarte irregular de lixo.</p>
                <div class="report-card-example"><i></i> Descarte irregular</div>
            </article>

        </div>
    </section>

</main>

<!-- MODAL DE NOVA OCORRÊNCIA -->

<div class="report-modal" id="reportModal" aria-hidden="true">
    <div class="report-modal-backdrop"></div>

    <section
        class="report-form-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reportFormHeading"
    >
        <button
            type="button"
            class="report-modal-close"
            id="closeReportModal"
            aria-label="Fechar formulário"
        >&times;</button>

        <span class="map-page-eyebrow">NOVO REGISTRO / CITYSENSE</span>

        <h2 id="reportFormHeading">
            Vamos identificar<br>
            esse <span>problema.</span>
        </h2>

        <p class="report-form-intro">
            Informe o que você observou. Os dados abaixo são uma demonstração
            local e ainda não serão enviados a nenhum órgão.
        </p>

        <div class="report-form-category">
            <span class="report-pin" id="formCategoryPin"><span>!</span></span>
            <div>
                <small>CATEGORIA SELECIONADA</small>
                <strong id="formCategoryName">Vias públicas</strong>
            </div>
        </div>

        <form id="reportForm">

            <label for="reportSubtype">Qual é o problema específico?</label>
            <select id="reportSubtype" required>
                <option value="">Selecione o tipo de problema</option>
            </select>

            <label for="reportSeverity">Qual é a gravidade aparente?</label>
            <select id="reportSeverity" required>
                <option value="">Selecione a gravidade</option>
                <option value="leve">Leve — impacto pequeno</option>
                <option value="moderada">Moderada — dificulta o uso</option>
                <option value="grave">Grave — risco ou obstrução importante</option>
                <option value="critica">Crítica — perigo imediato aparente</option>
            </select>

            <label for="reportRisk">Existe risco imediato para pessoas ou veículos?</label>
            <select id="reportRisk" required>
                <option value="">Selecione uma opção</option>
                <option value="nao">Não percebi risco imediato</option>
                <option value="talvez">Não tenho certeza</option>
                <option value="sim">Sim, existe risco aparente</option>
            </select>

            <label for="reportTitle">Título do registro</label>
            <input
                id="reportTitle"
                type="text"
                maxlength="100"
                placeholder="Ex.: Cratera perto da praça"
                required
            >

            <label for="reportDescription">O que você observou?</label>
            <textarea
                id="reportDescription"
                maxlength="1000"
                placeholder="Descreva o problema e como ele afeta o local..."
                required
            ></textarea>

            <label for="reportResponsible">Quem você acredita que seja responsável?</label>
            <select id="reportResponsible" required>
                <option value="unknown">Não sei identificar</option>
                <option value="prefeitura">Prefeitura / órgão municipal</option>
                <option value="cemig">Cemig / concessionária elétrica</option>
                <option value="copasa">Copasa / prestador de água e esgoto</option>
                <option value="traffic">Órgão responsável pelo trânsito</option>
                <option value="other">Outro órgão ou empresa</option>
            </select>

            <div class="report-form-location">
                <span>⌖</span>
                <div>
                    <small>LOCALIZAÇÃO DO MAPA</small>
                    <strong id="formCoordinates">Coordenadas selecionadas no mapa</strong>
                </div>
            </div>

            <div class="report-form-actions">
                <button
                    type="button"
                    class="report-button-secondary"
                    id="cancelReportForm"
                >
                    Cancelar
                </button>

                <button type="submit" class="report-button-primary">
                    Adicionar ao mapa <span>↗</span>
                </button>
            </div>

            <p class="report-form-disclaimer">
                O órgão escolhido representa uma indicação do cidadão,
                não uma confirmação de responsabilidade.
            </p>

        </form>
    </section>
</div>

<!-- NOTIFICAÇÃO -->

<div class="report-toast" id="reportToast" role="status" aria-live="polite">
    <span>✓</span>
    <div>
        <strong id="reportToastTitle">Ocorrência adicionada</strong>
        <small id="reportToastMessage">O marcador foi adicionado ao mapa desta sessão.</small>
    </div>
</div>

<footer class="map-page-footer">
    <span>© 2026 CitySense — Projeto acadêmico.</span>
    <span>Mapa: OpenStreetMap contributors.</span>
</footer>

<script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    crossorigin=""
></script>

<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

<!-- Lógica exclusiva da página de registros -->
<script src="../assets/js/map-report.js"></script>
<script src="../assets/js/map-page.js"></script>

</body>
</html>