    <footer class="site-footer">

      <div class="apply-typography">
        <p>
          Copyright &copy;<?php echo date("Y"); ?> Some Podcast. All rights reserved.
        </p>

        <a href="/feed/podcast/">RSS</a>

        <a href="/contact/">Contact</a>
      </div>

    </footer>

  </div>

  <?php wp_footer(); ?>
  
  <script type="module" src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/podcast-player.js?v1.0"></script>
  <script type="module" src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/turbo.js?v1.0"></script>
  <script src="<?php bloginfo('stylesheet_directory'); ?>/javascripts/main.js?v1.0"></script>

</body>

</html>