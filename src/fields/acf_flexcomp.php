<?php

function add_flexcomp_field() {

    acf_add_local_field_group(array(
        'key' => 'flexcomp',
        'title' => 'Flexible Components',
        'fields' => array(
            array(
                'key' => 'flexcomp_content',
                'label' => 'Components',
                'name' => 'flexcomp_content',
                'type' => 'flexible_content',
                'layouts' => array(),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ),
            ),
        ),
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => array(
            1 => 'the_content',
            3 => 'discussion',
            4 => 'comments',
            7 => 'author',
            8 => 'format',
            9 => 'page_attributes',
        ),
        'active' => 1,
    ));
}

add_action('acf/init', 'add_flexcomp_field');