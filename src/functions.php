<?php

 foreach(glob(get_template_directory() . "/functions/*.php") as $file){
     include $file;
}
 
/*  foreach(glob(get_template_directory() . "/templates/*.php") as $file){
    include $file;
} */