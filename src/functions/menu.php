<?php

    function register_menus() {
    register_nav_menus(
        array(
        'header_menu' => __( 'Header Menu' ),
        )
    );}
    add_action( 'init', 'register_menus' );

    /* @TODO can this be generated? */