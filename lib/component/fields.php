<?php

function add_COMPONENT_layout($parent) {

    //add your custom fields here
    $fields = array(
        array(
            'key' => 'COMPONENT_content',
            'label' => 'COMPONENT_content',
            'name' => 'COMPONENT_content',
            'type' => 'wysiwyg',
            'parent' => 'flexcomp'
        ),
    );


    //don't edit this code below here unless you know what you're doing
    $layout = array (
        'key' => 'COMPONENT',
        'name' => 'COMPONENT',
        'label' => 'COMPONENT',
        'display' => 'block',
        'sub_fields' => $fields,
        'min' => '',
        'max' => '',
      );
    $parent['layouts'][] = $layout;
    return $parent;
}

add_filter( 'acf/load_field/key=flexcomp_content', 'add_COMPONENT_layout' );