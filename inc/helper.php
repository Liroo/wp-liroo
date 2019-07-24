<?php
/*
  This function will extract an svg file and echo it
  This is useful when you don't want to use an <img> tag or print it using js
*/
function print_svg($file) {
  $filePath = get_template_directory() . '/public/images/' . $file;
  echo file_get_contents($filePath);
}