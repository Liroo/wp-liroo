<?php

add_action("admin_init", function () {
  // Default media settings are insane in 2018.
  $image_sizes = [
    [
      "name" => "thumbnail",
      "w" => 512,
      "h" => 512,
    ],
    [
      "name" => "medium",
      "w" => 1536,
      "h" => 1536,
    ],
    [
      "name" => "large",
      "w" => 2048,
      "h" => 2048,
    ]
  ];
  foreach ($image_sizes as $size) {
    $existing_w = intval(get_option($size["name"] . "_size_w"));
    $existing_h = intval(get_option($size["name"] . "_size_h"));
    if ($existing_w !== $size["w"]) {
      update_option($size["name"] . "_size_h", $size["h"]);
      update_option($size["name"] . "_size_w", $size["w"]);
    }
  }
  update_option("image_default_align", "none");
  update_option("image_default_link_type", "none");
  update_option("image_default_size", "large");
});