<?php
/*
	Theme assets
*/
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('theme-css', get_template_directory_uri() . "/public/css/app.css", false, null);
    wp_enqueue_script('theme-js', get_template_directory_uri() . "/public/js/app.js", Array(), null, true);
}, 100);
