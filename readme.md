## NOTICE: this repository is not maintained anymore. If you're looking for something similar, maybe consider [FLYNT](https://flyntwp.com/)?

# flexcomponents
## A component based theme boilerplate for WordPress based on Advanced Custom Fields' flexible content field
Note: You'll need an ACF Pro license, Yarn/NPM, Composer and of course PHP and a SQL Database running

Author: Arne Spremberg - www.arnespremberg.com


## What is this supposed to be?
This boilerplate comes with plenty of useful tools such as WP-CLI, SCSS and ES6 support, Composer, NPM, responsive and lazy loaded images, a task runner to for your development environment and building a finished theme in a ZIP-Folder. See the most important CLI commands below.

The main feature is the component functionality that let's you build components that will later be selectable in the WP-Admin by using the Flexible Content functionality of ACF Pro.

I developed this boilerplate for customised themes where clients should only use a certain selection of components to build their page. Thus, the Gutenberg editor will not be displayed by default. A Gutenberg integration using the ACF Blocks function will be interesting for more flexible themes and I consider developing it when I might need it.


## Installation

1. Clone/Fork this repo
2. copy `.env.example` to `.env` and edit it to include all data for your setup
3. Run the following commands:   
	`composer install`  
	`yarn install`
4. edit `style.css` to include your desired theme header
5. run `yarn setup_wp` to download, install and setup a WP installation in `public/`
6. you can alternatively setup your own custom WP installation inside `public/`
7. if necessary create the appropriate database using `yarn wp db create` and import any sql file using `yarn wp db import <path to file>`

note, that all commands should be run in the repo's root.


## Development

Run `yarn develop` - the WP installation will be served with BrowserSync to the browser.  
You can use all of the [WP-CLI Commands](https://developer.wordpress.org/cli/commands/) by typing `yarn wp`. This will be useful to quickly edit settings etc.


## Generating/scaffolding components, post types and taxonomies

To generate and register a component run:
`yarn generate_cmp <COMPONENT>`

To generate and register a Custom Post Type run:
`yarn generate_cpt <POST_TYPE>`

To generate and register a Taxonomy run:
`yarn generate_tax <TAXONOMY>`

Components are located in `src/components/` and registerd in `src/load_components.php`. CPTs and Taxonomies are located in `src/functions/`. The Code to generate all of this is located in `lib`


## Deployment, build for production

You can simply run `yarn build` and install the generated `.zip` theme file on any WordPress site.

Alternatively you can install WordPress with `yarn setup_wp`. Then set your webserver to serve from `public/` or run a simple PHP server by running `yarn wp server`.


## How does this work?

### General Theme development
The theme can just be developed as any other WordPress theme, following the theme hierarchy, Custom Post Types etc..

Advanced Custom Fields will be installed within the theme. You can add any field groups in PHP files in `src/fields/`. You'll find an example in there, note that it's not loaded, as the field group is not assigned to any post type.

Global SCSS and JS are defined in `assets`. Only `assets/scss/index.scss`, `assets/scss/admin.scss` and `assets/js/index.js` are compiled and then enqueued in `functions/scripts.php` and `functions/stlyes.php`. Any other global SCSS/JS should be imported into these files.

### Components
The `src/load-components.php` is included inside the `src/singular.php`. It loads each of the components' `component.php` when the component is selected for the particular page in the WordPress Admin. This means that you can overwrite the functionality by defining other templates using the [WordPress Template hierarchy](https://developer.wordpress.org/files/2014/10/Screenshot-2019-01-23-00.20.04.png) and selecting anything other than default as template in the WordPress backend to show the Gutenberg Editor.

Each component has it's own SCSS and JS file that will both be compiled and loaded inline using the code inside `src/components/<COMPONENT>/index.php`. 
The Assets folder will be simply copied over, keeping the same path as in the `src`. That means in PHP you load them with `get_template_directory_uri() . '/components/<COMPONENT>/assets/'`.

Each component is an ACF Flexible Content Layout. They are located within a field group called `flexcomp` and a field called `flexcomp_content`. These are registered in `fields/acf_flexcomp.php`.
The component's sub fields are registered in the `fields.php`. It uses the following syntax: https://www.advancedcustomfields.com/resources/register-fields-via-php/

```php
    $fields = array(
        array(
            'key' => 'COMPONENT_content',
            'label' => 'COMPONENT_content',
            'name' => 'COMPONENT_content',
            'type' => 'wysiwyg',
            'parent' => 'flexcomp'
        ),
    );

```

By default the Flexcomponent field group is displayed for pages and disables the classic editor. You can of course edit this in `fields/acf_flexcomp.php` to suit your needs.


## Other stuff

Images can be loaded using `<?php echo responsive_image($image_id, 'XXL', '4096px'); ?> />` or `<?php echo lazy_responsive_image($image_id, 'XXL', '4096px'); ?> class="lazyload" />`

`src/functions/` contains plenty of useful functions I use on a regular basis.

If you have trouble writing ACF Fields in PHP you can easily set them up in WP-Admin and export them to PHP and include these files in `src/fields`
