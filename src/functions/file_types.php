<?php

function my_myme_types($mime_types){
    $mime_types['svg'] = 'image/svg+xml'; //Adding svg extension
    $mime_types['vcf'] = 'text/x-vcard'; //Adding VCard files
    return $mime_types;
}
add_filter('upload_mimes', 'my_myme_types');