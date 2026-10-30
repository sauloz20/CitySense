<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CitySense | Mapa de Montes Claros</title>

    <link rel="preconnect" href="https://unpkg.com">
    <link rel="preconnect" href="https://tile.openstreetmap.org">

    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
    >

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 40px;
            background: #f3f4ef;
            color: #101c29;
            font-family: Arial, sans-serif;
        }

        .map-header {
            max-width: 1200px;
            margin: 0 auto 24px;
        }

        .map-header span {
            color: #71805b;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .map-header h1 {
            margin: 10px 0;
            font-size: clamp(28px, 4vw, 42px);
        }

        .map-header p {
            color: #66717b;
            line-height: 1.6;
        }

        #citysense-map {
            width: 100%;
            max-width: 1200px;
            height: min(72vh, 720px);
            min-height: 460px;
            margin: 0 auto;
            border: 1px solid #dce1d8;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 18px 50px rgba(16, 28, 41, .10);
            z-index: 1;
        }

        .map-note {
            max-width: 1200px;
            margin: 16px auto 0;
            color: #66717b;
            font-size: 13px;
        }

        @media (max-width: 600px) {
            body {
                padding: 24px 14px;
            }

            #citysense-map {
                min-height: 520px;
                border-radius: 12px;
            }
        }
    </style>
</head>

<body>
    <header class="map-header">
        <span>CitySense · Inteligência urbana colaborativa</span>
        <h1>Mapa de Montes Claros</h1>
        <p>
            Explore a cidade, aproxime o mapa e clique em um ponto
            para consultar suas coordenadas.
        </p>
    </header>

    <div id="citysense-map"></div>

    <p class="map-note">
        Mapa demonstrativo. Os pontos selecionados ainda não representam
        ocorrências reais. © OpenStreetMap contributors.
    </p>

    <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
    ></script>

    <script>
        // Coordenadas aproximadas do centro de Montes Claros - MG.
        const map = L.map('citysense-map', {
            scrollWheelZoom: false
        }).setView([-16.7286, -43.8578], 13);

        // Camada cartográfica do OpenStreetMap.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">' +
                'OpenStreetMap</a> contributors'
        }).addTo(map);

        // Ponto de referência demonstrativo, não é uma ocorrência.
        L.marker([-16.7286, -43.8578])
            .addTo(map)
            .bindPopup('<strong>Montes Claros - MG</strong><br>Ponto central de referência.')
            .openPopup();

        // Clique no mapa para visualizar coordenadas.
        map.on('click', function (event) {
            const latitude = event.latlng.lat.toFixed(6);
            const longitude = event.latlng.lng.toFixed(6);

            L.popup()
                .setLatLng(event.latlng)
                .setContent(
                    '<strong>Local selecionado</strong><br>' +
                    'Latitude: ' + latitude + '<br>' +
                    'Longitude: ' + longitude
                )
                .openOn(map);
        });
    </script>
</body>
</html>
