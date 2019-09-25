<?php
  add_action('admin_print_scripts-profile.php', 'hide_admin_bar_prefs');
  function hide_admin_bar_prefs() { ?>
    <style type="text/css">
            .show-admin-bar {display: none;}
    </style>
  <?php
  }
  add_filter('show_admin_bar', '__return_false');
?>