<?php

/*****************************************************************************/
/* --                Custom Post Types for News Entries                   -- */
/*****************************************************************************/

add_action( 'init', 'nds_register_projects' );
function nds_register_projects() {
	$public_pt_args = array(
		'label' => 'Projects',
		'labels' => array(
			'name' => 'Projects',
			'singular' => 'Project',
			'add_new_item' => 'Add Project'
		),
		'public' => true,
		'publicly_queryable' => true,
		'exclude_from_search' => false,
		'show_ui' => true,
		'show_in_menu' => true,
		'menu_position' => 22,
        'show_in_rest' => true,
		'has_archive' => true,
		'rewrite' => true,
		'query_var' => true,
		'supports' => array('title'),
	);
	register_post_type( 'projects', $public_pt_args );
}

/* @TODO can we generate this using wp cli? */