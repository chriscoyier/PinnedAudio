<?php get_header(); ?>

<?php if (have_posts()) : ?>

  <?php while (have_posts()) : the_post(); ?>

    <main>

      <header id="show-title" class="show-title bar-over">

        <h1>
          <?php the_title(); ?>
        </h1>

        <time datetime="<?php echo the_time('Y-m-j'); ?>" pubdate>
          <?php the_time('F jS Y'); ?>
        </time>

      </header>

      <script>
        window.audioInit = {
          title: "<?php the_title(); ?>",
          src: "<?php echo get_post_meta($post->ID, 'audio_file', true); ?>"
        }
      </script>
      <div id="audio-player-init" data-title="<?php the_title(); ?>" data-src="<?php echo get_post_meta($post->ID, 'audio_file', true); ?>"></div>

      <button class="play-episode-button button">
        Play This Episode
      </button>

      <div class="apply-typography">
        <?php the_content(); ?>
      </div>

      <?php if (has_tag()) { ?>
        <section class="tags">

          <h2>Tags</h2>

          <?php the_tags(""); ?>

        </section>
      <?php } ?>

      <div class="show-nav-grid">
        <?php previous_post_link('%link', '&larr; Prev Episode', TRUE); ?>
        <?php next_post_link('%link', 'Next Episode &rarr;', TRUE); ?>
      </div>

    </main>

  <?php endwhile; ?>

<?php endif; ?>

<?php get_footer(); ?>