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
if( have_rows('flexblocks') ):
    
    ?><main><?php
    
    // loop through the rows of data
    while ( have_rows('flexblocks') ) : the_row();
        switch(get_row_layout()) {

            case "e-mail":
                include dirname(__FILE__) . "/templates/e-mail.php";
            break;

            case "text_block":
                include dirname(__FILE__) . "/templates/text_block.php";
            break;

            case "spacing":
                include dirname(__FILE__) . "/templates/spacing.php";
            break;

            case "chaos":
                include dirname(__FILE__) . "/templates/chaos_slides.php";
            break;

        }

endwhile;
    
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
