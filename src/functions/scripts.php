<?php

function as_scripts() {
    wp_enqueue_script('lazysizes', get_template_directory_uri() . '/assets/js/vendor/lazysizes.js', array(), null, false);
    wp_enqueue_script('slick', get_template_directory_uri() . '/assets/js/vendor/slick.js', array('jquery'), null, true);
    wp_enqueue_script('AS_main', get_template_directory_uri() . '/assets/js/index.js', array('jquery'), null, true);

}

add_action('wp_enqueue_scripts', 'as_scripts');