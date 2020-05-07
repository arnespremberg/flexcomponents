# flexcomponents
## A component based theme boilerplate for WordPress based on Advanced Custom Fields' flexible content field
Note: You'll need an ACF Pro license, Yarn/NPM, Composer and of course PHP and a SQL Database running

Author: Arne Spremberg - www.arnespremberg.com

## What is this supposed to be?
This boilerplate comes with plenty of useful tools such as WP-CLI, SCSS and ES6 support, Composer, NPM, responsive and lazy loaded images, a task runner to for your development environment and building a finished theme in a ZIP-Folder. See the most important CLI commands below.

The main feature is the component functionality that let's you build components that will later be selectable in the WP-Admin by using the Flexible Content functionality of ACF Pro.

I developed this boilerplate for customised themes where clients should only use a certain selection of components to build their page. Thus, the Gutenberg editor will not be displayed by default. A Gutenberg integration using the ACF Blocks function will be interesting for more flexible themes and I consider developing it when I might need it.

## How does this work?

### Components
The `load-components.php` is included inside the `singular.php`. It loads each of the components' `component.php` when the component is selected for the particular page in the WordPress Admin. This means that you can overwrite the functionality by defining other templates using the [WordPress Template hierarchy](https://developer.wordpress.org/files/2014/10/Screenshot-2019-01-23-00.20.04.png) and selecting anything other than default as template in the WordPress backend to show the Gutenberg Editor.

Each component has it's own SCSS and JS file that will both be compiled and loaded inline using the code inside component.php. Global SCSS and JS are defined in `assets`. Only `assets/scss/index.scss`, `assets/scss/admin.scss` and `assets/js/index.js` are compiled and then enqueued in `functions/scripts.php` and `functions/stlyes.php`. Any other global SCSS/JS should be imported into these files.
Any images you will add in the `img` folder will be optimized and loaded into the themes assets folder. That means that in your SCSS you can load images with the relative path staying the same. In your PHP however, in case you might need to add static images, do it using `get_template_directory_uri() . '/assets/img/'`. Images can not have the same name throughout the whole project!

The component's fields are registered in the `fields.php`. It uses the following syntax: https://www.advancedcustomfields.com/resources/register-fields-via-php/ (only the part after "fields")

```
'layout_5dd560725c35a' => array(
	'key' => 'layout_5dd560725c35a',
	'name' => 'text_block',
	'label' => 'Text Block',
	'display' => 'block',
	'sub_fields' => array(
		array(
			'key' => 'field_5dd55fa10fabb',
			'label' => 'Text',
			'name' => 'text',
			'type' => 'textarea',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'acfe_permissions' => '',
			'default_value' => '',
			'placeholder' => '',
			'maxlength' => '',
			'rows' => '',
			'new_lines' => 'br',
			'acfe_textarea_code' => 0,
		),
		array(
			'key' => 'field_5de188aeae12a',
			'label' => 'Position',
			'name' => 'position',
			'type' => 'button_group',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'acfe_permissions' => '',
			'choices' => array(
				'left' => 'left',
				'right' => 'right',
			),
			'allow_null' => 0,
			'default_value' => 'left',
			'layout' => 'horizontal',
			'return_format' => 'value',
		),
	),
	'min' => '',
	'max' => '',
),
```

### Other stuff
Any global assets are managed in the `assets`-folder. I would strongly recommend to enqeue any dependency or vendor scripts and styles in the respective files in `functions`
The WordPress `functions.php` loads any PHP-file that is located in the `functions`-folder.

All other files work as generally expected.

You can set up your database connection and other config in the `.env` or create a `.local.env` file. The develop/install local process reads both of those and priorises `.local.env` while the build/install prod process unly uses `.env`.

Images can be loaded using `<?php echo responsive_image($image_id, 'XXL', '4096px'); ?> />` or `<?php echo lazy_responsive_image($image_id, 'XXL', '4096px'); ?> />`


## Installation

1. Clone/Fork this repo
2. edit the `.env` to include all data for your setup
3. Run the following commands:   
	`composer install`  
	`yarn install`
4. edit `style.css` to include your desired theme header
5. run `yarn setup_wp` to download, install and setup a WP installation in `public/`
6. you can alternatively setup your own custom WP installation inside `public/`

## Development

Run `yarn develop` - the WP installation will be served with BrowserSync to the browser.  
You can use all of the [WP-CLI Commands](https://developer.wordpress.org/cli/commands/) by typing `yarn wp`. This will be useful to scaffold Custom Post Types, quickly edit settings etc.

## Generating/scaffolding components, post types and taxonomies

`yarn generate_cmp <COMPONENT>`

`yarn generate_cpt <POST_TYPE>`

`yarn generate_tax <TAXONOMY>`

## Deployment, build for production

You can simply run `yarn build` and install the generated `.zip` theme file on any WordPress site.

Alternatively you can install WordPress with `yarn setup_wp`. Then set your webserver to serve from `public/` or run a simple PHP server by running `yarn wp server`.