    <footer class="site-footer width-limiter">

      <p>
        Copyright &copy;<?php echo date("Y"); ?> Some Podcast. All rights reserved.
      </p>

      <?php dynamic_sidebar( 'footer_nav' ); ?>

    </footer>

  </div>

  <?php wp_footer(); ?>
  
  <script type="module" src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/podcast-player.js?v1.1"></script>
  <script type="module" src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/turbo.js?v1.1"></script>
  <script src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/main.js?v1.1"></script>

</body>

</html>