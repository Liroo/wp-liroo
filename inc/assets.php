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

    wp_enqueue_script('theme-jquery-core', "https://code.jquery.com/jquery-3.4.1.min.js", Array(), null, true);
    wp_enqueue_script('theme-jquery-migrate', "https://code.jquery.com/jquery-migrate-3.1.0.min.js", Array(), null, true);
}, 100);

/**
 * Disable most of scripts
 */
function remove_default() {
	global $wp_styles;

	$styles_to_keep = array();

	foreach ($wp_styles->registered as $handle => $data)
	{
		if ( in_array($handle, $styles_to_keep) ) continue;
			wp_deregister_style($handle);
			wp_dequeue_style($handle);
    }
    
    global $wp_scripts;

	$scripts_to_keep = array();

	foreach ($wp_scripts->registered as $handle => $data)
	{
		if ( in_array($handle, $scripts_to_keep) ) continue;

		wp_deregister_script($handle);
		wp_dequeue_script($handle);
	}
}
add_action('wp_enqueue_scripts', 'remove_default');

remove_action('wp_head', 'wp_generator');

remove_action('template_redirect', 'rest_output_link_header', 11, 0);
remove_action('wp_head', 'rest_output_link_wp_head', 10);

/**
 * Disable the emoji's
 */
function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );	
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	
	// Remove from TinyMCE
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
add_action( 'init', 'disable_emojis' );

/**
 * Filter out the tinymce emoji plugin.
 */
function disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
		return array_diff( $plugins, array( 'wpemoji' ) );
	} else {
		return array();
	}
}