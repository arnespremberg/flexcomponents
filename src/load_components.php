<?php

while ( have_rows('flexcomp_content') ) : the_row();
switch(get_row_layout()) {

/* FLEXCOMP_INSERT_HERE */

}

endwhile;