# CitySense

![PHP](https://img.shields.io/badge/linguagem-PHP-blue)

Protótipo acadêmico de plataforma colaborativa para visualizar e registrar ocorrências de infraestrutura urbana em Montes Claros (MG). A versão deste repositório apresenta uma página inicial, mapa interativo e formulário de ocorrências.

## Tecnologias e requisitos

- PHP e servidor local, como Apache/XAMPP ou o servidor embutido do PHP.
- HTML, CSS e JavaScript.
- Leaflet e OpenStreetMap para mapas; GSAP e ScrollTrigger para animações.
- Navegador moderno e conexão com a internet para fontes, bibliotecas e mapas externos.

## Execução local

Clone o repositório e inicie o servidor na pasta do projeto:

```sh
git clone https://github.com/sauloz20/CitySense.git
cd CitySense
php -S localhost:8000
```

Acesse `http://localhost:8000/`. No XAMPP, também é possível colocar a pasta em `htdocs`, iniciar o Apache e abrir a URL correspondente.

## Estado da implementação

O mapa e o formulário funcionam como demonstração no navegador. Os marcadores adicionados não possuem persistência no servidor nesta versão e podem desaparecer ao recarregar a página. A existência de arquivos vazios de configuração e páginas não indica que banco de dados, contas ou painel administrativo estejam implementados.

## Estrutura

```text
index.php             Página inicial
pages/mapa.php        Mapa e formulário de ocorrências
mapa-teste.php        Página de teste do mapa
assets/css/           Estilos utilizados pela interface
assets/js/            Interações, animações e mapas
config/ e includes/   Arquivos ainda vazios
pages/                Página do mapa e páginas ainda vazias
backup-*/             Cópias históricas mantidas no repositório
css/ e js/            Arquivos ainda vazios
```

Os diretórios de backup e arquivos vazios foram preservados para revisão posterior.
