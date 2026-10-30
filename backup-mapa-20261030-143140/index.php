<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#101c29">

    <meta name="description" content="CitySense: inteligência urbana colaborativa para uma cidade melhor.">

    <title>CitySense — Inteligência urbana colaborativa</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

    <div class="page-loader" id="pageLoader">
        <div class="loader-brand">CITY<span>SENSE</span></div>
        <div class="loader-line"><span></span></div>
    </div>

    <header class="navbar">
        <a href="#" class="brand">
            <span class="brand-icon">C</span>
            <span>city<span>sense</span></span>
        </a>

        <nav class="nav-links" id="navLinks">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#categorias">Ocorrências</a>
            <a href="#funcionamento">Como funciona</a>
        </nav>

        <a href="#mapa" class="nav-button">
            Explorar plataforma
            <span>↗</span>
        </a>

        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">
            <span></span>
            <span></span>
        </button>
    </header>

    <main>

        <!-- HERO -->
        <section class="hero" id="inicio">

            <div class="hero-content">

                <div class="eyebrow hero-reveal">
                    <span class="status-dot"></span>
                    INTELIGÊNCIA URBANA COLABORATIVA
                </div>

                <h1 class="hero-title">
                    Uma cidade melhor começa com
                    <span>informação<span class="title-period">.</span></span>
                </h1>

                <p class="hero-description">
                    Conectamos pessoas, informações e tecnologia
                    para identificar problemas urbanos e construir
                    uma cidade melhor para todos.
                </p>

                <div class="hero-actions">
                    <a href="#mapa" class="button-primary">
                        Explorar mapa
                        <span>↗</span>
                    </a>

                    <a href="#sobre" class="button-secondary">
                        Conheça o CitySense
                        <span>↓</span>
                    </a>
                </div>

                <div class="hero-footer">
                    <div class="avatar-stack">
                        <span>CS</span>
                        <span>MC</span>
                        <span>+</span>
                    </div>

                    <p>
                        Tecnologia a serviço<br>
                        da comunidade.
                    </p>
                </div>

            </div>

            <!-- MAPA ILUSTRATIVO -->
            <div class="hero-visual">

                <div class="map-card">

                    <div class="map-topbar">
                        <div>
                            <span class="map-overline">VISÃO URBANA</span>
                            <h3>Montes Claros <span>· MG</span></h3>
                        </div>

                        <div class="live-indicator">
                            <span></span>
                            DEMONSTRAÇÃO
                        </div>
                    </div>

                    <div class="map-canvas">

                        <svg class="map-drawing" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">

                            <g class="map-roads">
                                <path d="M-20 100 L620 410"/>
                                <path d="M-20 230 L620 100"/>
                                <path d="M40 -20 L300 520"/>
                                <path d="M210 -20 L420 520"/>
                                <path d="M450 -20 L160 520"/>
                                <path d="M-20 370 L620 270"/>
                                <path d="M100 -20 L600 500"/>
                                <path d="M-20 30 L620 480"/>
                                <path d="M300 -20 L50 520"/>
                            </g>

                            <g class="map-blocks">
                                <path d="M70 70 L160 105 L135 175 L45 140 Z"/>
                                <path d="M240 75 L340 55 L370 125 L265 150 Z"/>
                                <path d="M410 170 L510 140 L545 220 L445 250 Z"/>
                                <path d="M90 280 L185 245 L215 330 L120 365 Z"/>
                                <path d="M320 310 L410 275 L445 360 L350 395 Z"/>
                            </g>

                            <g class="map-route">
                                <path d="M90 370 C140 320 170 350 220 270 S310 210 350 245 S420 160 500 115"/>
                            </g>

                        </svg>

                        <div class="map-grid-overlay"></div>

                        <div class="map-marker marker-one">
                            <span class="marker-pulse"></span>
                            <span class="marker-center"></span>
                            <div class="marker-tooltip">Via danificada</div>
                        </div>

                        <div class="map-marker marker-two">
                            <span class="marker-pulse"></span>
                            <span class="marker-center"></span>
                            <div class="marker-tooltip">Iluminação pública</div>
                        </div>

                        <div class="map-marker marker-three">
                            <span class="marker-pulse"></span>
                            <span class="marker-center"></span>
                            <div class="marker-tooltip">Drenagem urbana</div>
                        </div>

                        <div class="map-location">
                            <span></span>
                            Montes Claros
                        </div>

                        <div class="map-coordinate">16°43' S · 43°51' W</div>

                    </div>

                    <div class="map-bottom">
                        <div>
                            <span class="map-bottom-dot"></span>
                            <span>MAPA CONCEITUAL</span>
                        </div>

                        <span>INTELIGÊNCIA URBANA / 001</span>
                    </div>

                </div>

                <div class="floating-card floating-card-top">
                    <span class="floating-icon">↗</span>
                    <div>
                        <strong>Olhar coletivo</strong>
                        <small>Uma cidade conectada</small>
                    </div>
                </div>

                <div class="floating-card floating-card-bottom">
                    <span class="floating-icon">◎</span>
                    <div>
                        <strong>Informação localizada</strong>
                        <small>Ocorrências por região</small>
                    </div>
                </div>

            </div>

            <div class="hero-scroll">
                <span>ROLE PARA DESCOBRIR</span>
                <div class="scroll-line"></div>
            </div>

            <div class="hero-index">01 — 04</div>

        </section>

        <!-- SOBRE -->
        <section class="about section-padding" id="sobre">

            <div class="section-heading">
                <span class="section-label">01 / O PROPÓSITO</span>
                <span class="section-side-label">TECNOLOGIA + COMUNIDADE</span>
            </div>

            <div class="about-grid">

                <h2 class="section-title reveal">
                    A cidade fala.<br>
                    <span>Precisamos ouvir.</span>
                </h2>

                <div class="about-description reveal">
                    <p>
                        Problemas na infraestrutura urbana fazem parte
                        do cotidiano de milhares de pessoas. Muitas vezes,
                        porém, essas informações ficam dispersas e não
                        recebem o acompanhamento necessário.
                    </p>

                    <p>
                        O CitySense nasce para aproximar a população
                        dessas informações, permitindo registrar,
                        visualizar e acompanhar ocorrências urbanas
                        de maneira organizada.
                    </p>

                    <a href="#funcionamento" class="text-link">
                        Descubra como funciona <span>↗</span>
                    </a>
                </div>

            </div>

            <div class="about-bottom">
                <span>UMA NOVA FORMA DE ENXERGAR A CIDADE.</span>
                <span>MONTE CLAROS — MINAS GERAIS</span>
            </div>

        </section>

        <!-- CATEGORIAS -->
        <section class="categories section-padding" id="categorias">

            <div class="section-heading">
                <span class="section-label">02 / O QUE MONITORAMOS</span>
                <span class="section-side-label">INFRAESTRUTURA URBANA</span>
            </div>

            <div class="categories-heading">
                <h2 class="section-title reveal">
                    Cada detalhe importa<span class="title-period">.</span>
                </h2>

                <p class="reveal">
                    Identifique diferentes situações que impactam
                    a mobilidade, a segurança e a qualidade de vida.
                </p>
            </div>

            <div class="category-grid">

                <article class="category-card" data-tilt>
                    <div class="category-number">01 / VIAS</div>
                    <div class="category-icon">⌁</div>
                    <h3>Buracos e vias</h3>
                    <p>Problemas no pavimento, buracos e danos nas ruas.</p>
                    <span class="category-arrow">↗</span>
                </article>

                <article class="category-card" data-tilt>
                    <div class="category-number">02 / MOBILIDADE</div>
                    <div class="category-icon">⌗</div>
                    <h3>Calçadas</h3>
                    <p>Calçadas danificadas e dificuldades de acessibilidade.</p>
                    <span class="category-arrow">↗</span>
                </article>

                <article class="category-card" data-tilt>
                    <div class="category-number">03 / DRENAGEM</div>
                    <div class="category-icon">≋</div>
                    <h3>Drenagem urbana</h3>
                    <p>Alagamentos, obstruções e problemas de escoamento.</p>
                    <span class="category-arrow">↗</span>
                </article>

                <article class="category-card" data-tilt>
                    <div class="category-number">04 / SINALIZAÇÃO</div>
                    <div class="category-icon">⊕</div>
                    <h3>Sinalização</h3>
                    <p>Placas danificadas e sinalização urbana inadequada.</p>
                    <span class="category-arrow">↗</span>
                </article>

            </div>

        </section>

        <!-- FUNCIONAMENTO -->
        <section class="process section-padding" id="funcionamento">

            <div class="section-heading">
                <span class="section-label">03 / COMO FUNCIONA</span>
                <span class="section-side-label">SIMPLES E COLABORATIVO</span>
            </div>

            <h2 class="section-title reveal">
                Da identificação à <span>transformação.</span>
            </h2>

            <div class="process-grid">

                <article class="process-item reveal">
                    <span class="process-number">01</span>
                    <div class="process-line"></div>
                    <h3>Identifique</h3>
                    <p>Encontre um problema de infraestrutura na sua região.</p>
                </article>

                <article class="process-item reveal">
                    <span class="process-number">02</span>
                    <div class="process-line"></div>
                    <h3>Registre</h3>
                    <p>Informe o ocorrido e sua localização na plataforma.</p>
                </article>

                <article class="process-item reveal">
                    <span class="process-number">03</span>
                    <div class="process-line"></div>
                    <h3>Acompanhe</h3>
                    <p>Visualize as informações e acompanhe o andamento.</p>
                </article>

                <article class="process-item reveal">
                    <span class="process-number">04</span>
                    <div class="process-line"></div>
                    <h3>Transforme</h3>
                    <p>Contribua para uma cidade mais organizada e consciente.</p>
                </article>

            </div>

        </section>

        <!-- MAPA / CTA -->
        <section class="map-cta section-padding" id="mapa">

            <div class="cta-content reveal">
                <span class="section-label">04 / SUA CIDADE, SEU OLHAR</span>

                <h2>
                    Uma cidade melhor<br>
                    começa com <span>você.</span>
                </h2>

                <p>
                    Faça parte de uma comunidade que observa,
                    registra e acompanha os desafios urbanos.
                </p>

                <a href="#inicio" class="button-primary">
                    Conheça o CitySense
                    <span>↗</span>
                </a>
            </div>

            <div class="cta-decoration" aria-hidden="true">
                <span class="cta-circle circle-one"></span>
                <span class="cta-circle circle-two"></span>
                <span class="cta-circle circle-three"></span>
                <span class="cta-center">CS</span>
            </div>

        </section>

    </main>

    <footer class="footer">
        <a href="#inicio" class="brand footer-brand">
            <span class="brand-icon">C</span>
            <span>city<span>sense</span></span>
        </a>

        <p>Inteligência urbana colaborativa.</p>

        <span class="footer-copy">
            © <span id="currentYear"></span> CitySense. Projeto acadêmico.
        </span>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/animations.js"></script>

</body>
</html>
