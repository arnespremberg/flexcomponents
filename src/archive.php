<?php
/**
 * template file for archive pages
 * 
 * Theme: NDS
 * 
 * © 2019, Arne Spremberg
 */

get_header();

?>
<main>

        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                <li>
                    <a href="<?php the_permalink(); ?>">
                        <span>
                            <?php the_title(); ?>
                        </span>
                    </a>
                </li>

        <?php endwhile; endif; ?>

</main><?php

get_footer();