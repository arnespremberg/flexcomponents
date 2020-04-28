<?php

// 1. customize ACF path
add_filter("acf/settings/path", "my_acf_settings_path");
function my_acf_settings_path( $path ) {
    // update path
    $path = get_stylesheet_directory() . "/inc/plugins/acf/";
    return $path;
}

// 2. customize ACF dir
add_filter("acf/settings/dir", "my_acf_settings_dir");
function my_acf_settings_dir( $dir ) {
    // update path
    $dir = get_stylesheet_directory_uri() . "/inc/plugins/acf/";
    return $dir;
}

// 3. Include ACF
include_once( get_stylesheet_directory() . "/inc/plugins/acf/acf.php" );