<?php
/**
 * template file for all singular pages
 * using either ACF flexible blocks or WP classic editor
 * 
 * Theme: NDS
 * 
 * © 2019, Arne Spremberg
 */

get_header();

if (have_posts()) : while (have_posts()) : the_post(); 

// check if the flexible content field has rows of data
if( have_rows('flexcomp_content') ):
    
    ?><main><?php
        include_once dirname(__FILE__) . "/load_components.php";
    ?></main><?php

else :
    ?>
        
    <main>
        
        <h1>
            <?php the_title(); ?>
        </h1>
        <?php the_content(); ?>

	</main>

<?php endif;

endwhile; endif; 


get_footer();
