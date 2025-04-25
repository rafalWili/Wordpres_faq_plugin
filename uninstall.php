<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// delete all posts type CPT = faq_rwd
$faq_posts = get_posts(['post_type' => 'faq_rwd', 'numberposts' => -1]);
foreach ($faq_posts as $post) {
    wp_delete_post($post->ID, true);
}
