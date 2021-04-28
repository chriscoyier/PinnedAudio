<?php get_header(); the_post(); ?>

<main>

  <article id="post-<?php the_ID(); ?>" <?php post_class(''); ?>>

    <header class="page-header">
      <h1>
        <?php the_title(); ?>
      </h1>
    </header>

    <div class="apply-typography">
      <?php the_content(); ?>
    </div>

  </article>

</main>

<?php get_footer(); ?>
