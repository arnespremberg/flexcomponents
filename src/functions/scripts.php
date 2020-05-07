<?php

function flexcomp_scripts() {
    wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.min.js', array(), null, true);

}

add_action('wp_enqueue_scripts', 'flexcomp_scripts', 10);