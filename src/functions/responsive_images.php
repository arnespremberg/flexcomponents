<?php

/***************************************************************************************/
/* --   automatic srcset markup for Wordpress  (c)2019 by Arne Spremberg            -- */
/* --                                                                               -- */
/* --                        call inside <img>-Tag as follows:                      -- */
/* --                                                                               -- */
/* --       <img																	-- */
/* --			<?php echo lazy_responsive_image($image_id, 'XXL', '4096px'); ?>	-- */
/* --			class="lazyload														-- */
/* --		/>																		-- */
/* --                                                                               -- */
/* --    in this example XXL would be the biggest image size queried and            -- */
/* --    the max width would be set to 4096px                                       -- */
/***************************************************************************************/

/*****************************************************************************/
/* --                        custom image sizes                           -- */
/*****************************************************************************/

add_theme_support( 'post-thumbnails' );
add_image_size( 'XS', 320, 320 );
add_image_size( 'S', 640, 640 );
add_image_size( 'SM', 768, 768 );
add_image_size( 'M', 1024, 1024 );
add_image_size( 'L', 1280, 1280 );
add_image_size( 'XL', 2048, 2048 );
add_image_size( 'XXL', 4096, 4096 );

/*****************************************************************************/
/* --           automatic srcset and fullscreen markup                    -- */
/*****************************************************************************/

function responsive_image($image_id,$image_size,$max_width){
	if($image_id != '') {																	  // check the image ID is not blank
		$image_src = wp_get_attachment_image_url( $image_id, $image_size );					 // set the default src image size
		$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );			// set the srcset with various image sizes
		$image_alt = basename(get_attached_file( $image_id ));
		return 'src="'.$image_src.'" srcset="'.$image_srcset.'" sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"'.'alt="' . str_replace(array('.jpg', '_'), ' ', basename(get_attached_file($image_id))).'"';	// generate the markup for the responsive image
	}
}

function lazy_responsive_image($image_id,$image_size,$max_width){			// needs to have class "lazyload" added
	if($image_id != '') {
		$image = array(
			'src' => "data-src='" . wp_get_attachment_image_url( $image_id, $image_size ) . "'",
			'srcset' => "data-srcset='" . wp_get_attachment_image_srcset( $image_id, $image_size ) . "'",
			'sizes' => 'data-sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"',
			'alt' => 'alt="' . get_bloginfo() . ' ' . get_the_title() . ' ' . str_replace(array('.jpg', '_'), ' ', basename(get_attached_file( $image_id ))) . '"',
			// 'xs' => "src='" . wp_get_attachment_image_url( $image_id, 'XS' ) . "'"
		); 
		$image_src = wp_get_attachment_image_url( $image_id, $image_size );					 // default
		$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );			// wp srcset
		$image_small = wp_get_attachment_image_url( $image_id, 'XS' );
		return implode(" ", $image);
	}
}