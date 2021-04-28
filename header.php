<!doctype html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?php wp_title(''); ?></title>

  <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>?v=2.3">

  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎧</text></svg>">
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <div class="audio-player-wrap" data-turbo-permanent>
    <podcast-player id="audio-player" data-turbo-permanent>
      <audio data-turbo-permanent controls="controls" preload="none" width="100%" id="audio-player-audio-element" src="https://chtbl.com/track/643D/cdn.simplecast.com/audio/167887a0-ac00-4cf9-bc69-b5ca845997db/episodes/4b433590-bcf8-4c82-bc85-3ef9d641c407/audio/3e3cf533-e392-4bdb-adeb-6efef2b1fea9/default_tc.mp3"></audio>
    </podcast-player>
  </div>

  <div id="page-wrap">

    <header class="site-header">

      <div class="width-limiter">

        <h1>
          <a href="/">
            Pinned Audio WordPress Theme
            <?php # bloginfo('title'); ?>
          </a>
        </h1>
        <div class="about-show">
          Used for sites that want a persistent audio player, simply.
          <?php # bloginfo('description'); ?>
        </div>


      </div>

    </header>
    
    <nav id="main-nav" class="main-nav mobile-is-closed">
      <ul class="width-limiter">
        <li class="main-nav-episodes">
          Nav
        </li>
        <li class="main-nav-search">
          <a href="https://www.google.com/search?q=site:shoptalkshow.com%20fun" class="jetpack-search-filter__link">
            <span class="sr-only">Search</span>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0726 10.4326C12.4801 10.4326 10.4 12.5451 10.4 15.1053C10.4 17.6978 12.5125 19.7779 15.0726 19.7779C17.6651 19.7779 19.7453 17.6654 19.7453 15.1053C19.744 12.544 17.664 10.4326 15.0726 10.4326Z"></path>
              <path d="M16.0327 0.447479C7.42401 0.447479 0.447693 7.4238 0.447693 16.0324C0.447693 24.6398 7.42401 31.6161 16.0314 31.6161C24.64 31.6161 31.6163 24.6398 31.6163 16.0324C31.6163 7.4238 24.64 0.447479 16.0327 0.447479ZM23.6163 24.0324C23.3926 24.2562 23.0401 24.385 22.6563 24.385C22.2726 24.385 21.9526 24.2575 21.6963 24.0324L18.7526 21.0887L18.4651 21.2487C17.4088 21.825 16.2576 22.145 15.0724 22.145C11.1998 22.145 8.06509 19.0087 8.06509 15.1376C8.06509 11.265 11.2013 8.13023 15.0724 8.13023C18.9451 8.13023 22.0798 11.2665 22.0798 15.1376C22.0798 16.5138 21.6961 17.8251 20.9273 18.9776L20.7348 19.2976L23.6473 22.2101C23.8711 22.4664 24.0311 22.7864 24.0311 23.1376C23.9998 23.4563 23.8723 23.7763 23.616 24.0326L23.6163 24.0324Z"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
