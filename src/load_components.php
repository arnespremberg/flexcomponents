<?php

while ( have_rows('flexcomp_content') ) : the_row();
switch(get_row_layout()) {

  case "textblock":
    include_once dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

  case "textblock":
    include dirname(__FILE__) . "/components/textblock/index.php";
  break;

/* FLEXCOMP_INSERT_HERE */

}

endwhile;