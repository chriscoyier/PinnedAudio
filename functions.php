<?php
function pa_widgets_init() {

	register_sidebar( array(
		'name'          => 'Main Navigation Bar',
		'id'            => 'main_nav'
	) );

  register_sidebar( array(
		'name'          => 'Footer Nav',
		'id'            => 'footer_nav'
	) );

}
add_action( 'widgets_init', 'pa_widgets_init' );
?>