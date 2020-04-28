<?php

function my_mce_buttons_2( $buttons ) {	
	/**
	 * Add in a core button that's disabled by default
	 */
	$buttons[] = 'superscript';

	return $buttons;
}
add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );