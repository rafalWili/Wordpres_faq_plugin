<?php
/*
Plugin Name: WordPress FAQ Plugin
Description: Adds FAQ as CPT and shortcode to display them on the site.
Version: 1.0
Author: Rafał Wiliński
Author URI: https://rafalwilinski.com
Text Domain: faq-plugin-rwd
License: GPL2
*/

if (!defined('ABSPATH')) {
    exit;
}

// Register CPT: FAQ
function faq_rwd_register_faq_cpt() {
    $labels = [
        'name' => __('FAQ', 'simple-faq-plugin'),
        'singular_name' => 'FAQ',
        'add_new' => 'Dodaj FAQ',
        'add_new_item' => 'Dodaj nowe pytanie',
        'edit_item' => 'Edytuj pytanie',
        'new_item' => 'Nowe pytanie',
        'view_item' => 'Zobacz pytanie',
        'search_items' => 'Szukaj FAQ',
    ];

    $args = [
        'labels' => $labels,
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-editor-help',
        'supports' => ['title', 'editor'],
    ];

    register_post_type('faq_rwd', $args);
}
add_action('init', 'faq_rwd_register_faq_cpt');

// Shortcode to display FAQ
function faq_rwd_render_faq_shortcode($atts) {
    $faq_query = new WP_Query([
        'post_type' => 'faq_rwd',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ]);

    if (!$faq_query->have_posts()) {
        return '<p>Brak dostępnych pytań.</p>';
    }

    ob_start();
    echo '<div class="faq_rwd-faq-list">';
    while ($faq_query->have_posts()) {
        $faq_query->the_post();
        echo '<div class="faq_rwd-faq-item">';
        echo '<strong class="faq_rwd-faq-question">' . get_the_title() . '</strong>';
        echo '<div class="faq_rwd-faq-answer">' . apply_filters('the_content', get_the_content()) . '</div>';
        echo '</div>';
    }
    echo '</div>';
    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('wp_faq_rwd', 'faq_rwd_render_faq_shortcode');

// inline css for FAQ
// This is a simple way to add CSS styles inline. For a production plugin, consider using wp_enqueue_style() for better performance and organization.
function faq_rwd_enqueue_styles() {
    ?>
    <style>
    .faq_rwd-faq-list { margin-top: 20px; }
    .faq_rwd-faq-item { margin-bottom: 15px; }
    .faq_rwd-faq-question { display: block; font-weight: bold; margin-bottom: 5px; }
    .faq_rwd-faq-answer { padding-left: 10px; display: none; }
    .faq_rwd-answer.open { display: block;}
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const questions = document.querySelectorAll('.faq_rwd-faq-question');
            questions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    answer.classList.toggle('open');
                    if (answer.classList.contains('open')) {
                        answer.style.display = 'block';
                    } else {
                        answer.style.display = 'none';
                    }
                });
            });
        });
    </script>      
        <?php
}
add_action('wp_head', 'faq_rwd_enqueue_styles');

