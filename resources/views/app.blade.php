<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galih Rizky Pradana | Portfolio</title>

    {{-- SEO --}}
    <meta name="description" content="Galih Rizky Pradana — Informatics graduate building Laravel and React applications, REST APIs, and deployment-ready systems for real business workflows. Full-Stack Developer and IT Engineer candidate in Klaten, Indonesia.">
    <meta name="author" content="Galih Rizky Pradana">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ url('/') }}">

    {{-- Open Graph --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Galih Rizky Pradana | Portfolio">
    <meta property="og:title" content="Galih Rizky Pradana | IT Engineer & Full-Stack Developer">
    <meta property="og:description" content="Building Laravel and React applications, practical REST APIs, and deployment-ready systems for real business workflows.">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:image" content="{{ url('og-image.png') }}">
    <meta property="og:locale" content="id_ID">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Galih Rizky Pradana | IT Engineer & Full-Stack Developer">
    <meta name="twitter:description" content="Building Laravel and React applications, practical REST APIs, and deployment-ready systems for real business workflows.">
    <meta name="twitter:image" content="{{ url('og-image.png') }}">

    {{-- Theme / Icons --}}
    <meta name="theme-color" content="#020617">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
    <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">

    {{-- Paint the saved theme before React mounts so light mode does not flash dark --}}
    <script>
        (function () {
            try {
                var saved = localStorage.getItem('darkMode');
                var dark = saved === null
                    ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    : JSON.parse(saved);
                document.documentElement.style.backgroundColor = dark ? '#020617' : '#f5efdf';
                document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
            } catch (e) {}
        })();
    </script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="text-slate-300 antialiased relative overflow-x-hidden">
    <div id="root"></div>
</body>
</html>