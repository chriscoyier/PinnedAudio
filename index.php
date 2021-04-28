<?php get_header(); ?>

<main>

  <?php $i = 1; while (have_posts()) { the_post(); ?>

    <?php 

      if ($i == 1) {?>
        <script>
          window.audioInit = {
            title: "<?php the_title(); ?>",
            src: "<?php echo get_post_meta( $post->ID, 'audio_file', true ); ?>"
          }
        </script>
      <?php }

      include("components/episode-card.php"); 

      $i++;
    ?>

  <?php } ?>

</main>

<?php get_footer(); ?>
