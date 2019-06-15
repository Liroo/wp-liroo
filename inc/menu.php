<?php

/*
	Remove those menu
*/
function setup() {
	remove_menu_page( 'index.php' );
	remove_menu_page( 'post-new.php' );
	remove_menu_page( 'edit.php' );
	// remove_menu_page( 'edit.php?post_type=page' );
	remove_menu_page( 'edit-comments.php' );

	remove_menu_page( 'themes.php' );
}
add_action( 'admin_menu', 'setup' );

function remove_comments(){
	global $wp_admin_bar;

	$wp_admin_bar->remove_menu('comments');

	$wp_admin_bar->remove_menu('new-post');
	// $wp_admin_bar->remove_menu('new-page');
}
add_action( 'wp_before_admin_bar_render', 'remove_comments' );
