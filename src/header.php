<!doctype html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
  <meta name="description" content="<?php echo get_bloginfo(); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=11" />

  <title><?php the_title();?> | <?php bloginfo('name'); ?></title>

  <?php wp_head();?>
</head>

<body>

	<!-- site header -->
	<header class="site-header">
		<div class="header-content">
			<h1>
				<a href="/">
					<?php echo get_bloginfo(); ?>
				</a>
			</h1>
			<nav>
					<?php wp_nav_menu( array(
						'theme_location' => 'header_menu',
						'container' => false
					) ); ?>
			</nav>
		</div>
		
	</header>