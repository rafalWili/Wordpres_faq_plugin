<?php
/*
Plugin Name: WordPress FAQ Plugin
Description: Dodaje FAQ jako CPT i shortcode do wyświetlania na stronie.
Version: 1.0
Author: Rafał Wiliński
Author URI: https://rafalwilinski.com
Text Domain: faq-plugin-rwd
License: GPL2
*/

if (!defined('ABSPATH')) {
    exit;
}

function faq_rwd_load_textdomain() {
    load_plugin_textdomain(
        'faq_plugin_rwd',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'faq_rwd_load_textdomain');


// Register CPT: FAQ
function faq_rwd_register_faq_cpt()
{
    $labels = [
        'name' => __('FAQ', 'faq_plugin_rwd'),
        'singular_name' =>  __('FAQ', 'faq_plugin_rwd'),
        'add_new' =>  __('Dodaj FAQ', 'faq_plugin_rwd'),
        'add_new_item' => __('Dodaj nowe pytanie', 'faq_plugin_rwd'),
        'edit_item' =>  __('Edytuj pytanie', 'faq_plugin_rwd'),
        'new_item' =>  __('Nowe pytanie', 'faq_plugin_rwd'),
        'view_item' =>  __('Zobacz pytanie', 'faq_plugin_rwd'),
        'search_items' => __('Szukaj FAQ', 'faq_plugin_rwd'),
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
function faq_rwd_render_faq_shortcode($atts)
{
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
function faq_rwd_enqueue_styles()
{
?>
    <style>
        .faq_rwd-faq-list {
            margin-top: 20px;
        }

        .faq_rwd-faq-item {
            margin-bottom: 15px;
        }

        .faq_rwd-faq-question {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .faq_rwd-faq-answer {
            padding-left: 10px;
            display: none;
        }

        .faq_rwd-answer.open {
            display: block;
        }
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
