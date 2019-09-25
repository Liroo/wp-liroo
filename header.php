<?php defined( 'ABSPATH' ) || exit; ?>

<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>wp-liroo</title>
    
    <?php wp_head(); ?>
  </head>
  <body data-barba="wrapper">
    <div class="font-preload" style="opacity: 0;">
      <p                           >Normal</p>
      <p style="font-style:italic;">Italic</p>
    </div>

    <?php
      global $wp;

      $barba_namespace = '';

      if ($_REQUEST['barba_namespace']) {
        $barba_namespace = $_REQUEST['barba_namespace'];
      } else {
        $post_type = get_post_type();
        
        switch ($post_type) {
          case 'page':
            $barba_namespace = get_query_var('pagename');
            if (!$barba_namespace && $id > 0) {
              // If a static page is set as the front page, $pagename will not be set. Retrieve it from the queried object
              $post = $wp_query->get_queried_object();
              $barba_namespace = $post->post_name;
            }
            break;
          case 'product': // WooCommerce
            if (is_post_type_archive('product')) {
              $barba_namespace = 'shop';
            } else {
              $barba_namespace = 'product';
            }
            break;
          default:
            $barba_namespace = 'default';
            break;
        }
      }
    ?>
    <main data-barba="container" data-barba-namespace="<?php echo $barba_namespace; ?>">