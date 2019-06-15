<?php

/*
	Require every files from ./inc/
*/
foreach (glob(__DIR__ . "/inc/*") as $filename) {
  if (!is_dir($filename)) {
    require_once($filename);
  }
}
add_theme_support( 'post-thumbnails' );