<?php

echo "<script src=" . get_template_directory_uri() . "/components/COMPONENT/index.js" . "></script>";
echo "<link rel='stylesheet' href='" . get_template_directory_uri() . "/components/COMPONENT/index.css" . "' type='text/css' />";

include_once dirname(__FILE__) . "/template.php";