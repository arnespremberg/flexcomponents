<?php

function as_styles() {
    wp_enqueue_style('main_style', get_template_directory_uri() . '/assets/css/index.css', array(), '0.4', 'all');
    // wp_enqueue_style('tablet_style', get_template_directory_uri() . '/assets/css/tablet.css', array(), null, 'all and (min-width: 768px) and (max-width: 991px)');
    // wp_enqueue_style('mobile_style', get_template_directory_uri() . '/assets/css/mobile.css', array(), null, 'all and (max-width: 767px)');
}
add_action('wp_enqueue_scripts', 'as_styles');


function as_admin_style() {
    wp_enqueue_style('admin-styles', get_template_directory_uri().'/assets/css/admin.css');
 }
 
 add_action('admin_enqueue_scripts', 'as_admin_style');