<?php
/*
	Theme assets
*/
add_action('wp_enqueue_scripts', function () {
    $template_dir = get_template_directory_uri();
    $file_content = file_get_contents($template_dir . "/public/manifest.json");

    $json_assets = json_decode($file_content, true);

    wp_enqueue_style('theme-css',  $template_dir . "/public/" . $json_assets["app.css"], false, null);
    wp_enqueue_script('theme-js', $template_dir . "/public/" . $json_assets["app.js"], Array(), null, true);
}, 100);
