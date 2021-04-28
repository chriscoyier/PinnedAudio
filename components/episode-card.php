<div class="episode-card">

  <div class="episode-date-and-title">

    <time datetime="<?php echo the_time('Y-m-j'); ?>" pubdate>
      <?php the_time('F jS, Y'); ?>
    </time>
    
    <h3>
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </h3>

    <?php the_excerpt(); ?>

  </div>

</div>