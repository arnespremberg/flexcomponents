<?php

//add functions
foreach (glob(get_template_directory() . "/functions/*.php") as $file) {
    include $file;
}

//add fields
foreach (glob(get_template_directory() . "/fields/**/*.php") as $file) {
    include $file;
}
