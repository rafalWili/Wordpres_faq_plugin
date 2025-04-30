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


/*Register Api for FAQ interface */
function faq_plugin_rwd_register_api_endpoints() {

    error_log('Rejestracja endpointów FAQ API'); // To zapisuje wiadomość do logów PHP


    register_rest_route('faq/v1', '/save-settings', array(
        'methods' => 'POST',
        'callback' => 'faq_plugin_rwd_save_settings',
        'permission_callback' => function() {
            return current_user_can('manage_options'); // Sprawdzanie uprawnień
        },
    ));

    register_rest_route('faq/v1', '/get-settings', array(
        'methods' => 'GET',
        'callback' => 'faq_plugin_rwd_get_settings',
        'permission_callback' => '__return_true', // Pozwól na odczyt dla każdego
    ));
}
add_action('rest_api_init', 'faq_plugin_rwd_register_api_endpoints');

function faq_plugin_rwd_save_settings(WP_REST_Request $request) {
    $settings = $request->get_json_params();
    $question_text_color = sanitize_hex_color($settings['question_text_color']);
    $question_background_color = sanitize_hex_color($settings['question_background_color']);
    // Answers
    $answer_text_color = sanitize_hex_color($settings['answer_text_color']);
    $answer_background_color = sanitize_hex_color($settings['answer_background_color']);

    // Save the settings to the database Questions
    update_option('faq_plugin_rwd_question_text_color', $question_text_color);
    update_option('faq_plugin_rwd_question_bg_color', $question_background_color);
    // save the settings to the database Answers
    update_option('faq_plugin_rwd_answer_text_color', $answer_text_color);
    update_option('faq_plugin_rwd_answer_bg_color', $answer_background_color);


    return rest_ensure_response(array('status' => 'success'));
}


function faq_plugin_rwd_get_settings() {
    $question_text_color = get_option('faq_plugin_rwd_question_text_color', '#000000'); 
    $question_background_color = get_option('faq_plugin_rwd_question_bg_color', '#ffffff'); 
    // Answers
    $answer_text_color = get_option('faq_plugin_rwd_answer_text_color', '#000000'); 
    $answer_background_color = get_option('faq_plugin_rwd_answer_bg_color', '#ffffff'); 

    global $wpdb;
    $options = $wpdb->get_results( "SELECT option_name, option_value FROM $wpdb->options" );
    
    return rest_ensure_response(array(
        'question_text_color' => $question_text_color,
        'question_background_color' => $question_background_color,
        'answer_text_color' => $answer_text_color,
        'answer_background_color' => $answer_background_color
    ));

}


// inline css for FAQ
// This is a simple way to add CSS styles inline. For a production plugin, consider using wp_enqueue_style() for better performance and organization.
function faq_rwd_enqueue_styles()
{
?>
    <style>
        .faq_rwd-faq-list {
            margin-top: 20px;
            font-size: 20px;

        }

        .faq_rwd-faq-item {
            margin-bottom: 15px;
        }

        .faq_rwd-faq-question {
            display: block;
            font-weight: bold;
            text-transform: capitalize;
        }

        .faq_rwd-faq-answer {
            padding-bottom: 1rem;
            padding-left: 10px;
            padding-top: 1rem;
            display: none;
        }
        .faq_rwd-faq-answer p{
            margin: 0;
            padding: 0;
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


function faq_plugin_rwd_add_admin_menu() {
    add_menu_page(
        'Ustawienia FAQ', // Tytuł strony
        'FAQ Settings', // Nazwa menu
        'manage_options', // Wymagane uprawnienia (administrator)
        'faq_plugin_rwd_settings', // Slug
        'faq_plugin_rwd_settings_page', // Funkcja wyświetlająca stronę
        'dashicons-format-chat', // Ikona menu
        20 // Pozycja w menu
    );

    // Dodanie podmenu
    add_submenu_page(
        'faq_plugin_rwd_settings', // Rodzic (tutaj menu główne)
        'Ustawienia FAQ', // Tytuł strony podmenu
        'Ustawienia', // Tytuł menu
        'manage_options', // Wymagane uprawnienia
        'faq_plugin_rwd_settings', // Slug
        'faq_plugin_rwd_settings_page' // Funkcja wyświetlająca stronę
    );
}
add_action('admin_menu', 'faq_plugin_rwd_add_admin_menu');

function faq_plugin_rwd_enqueue_react_app() {
    $plugin_url = plugin_dir_url(__FILE__) . 'apps/faq-app/build/';
    $plugin_path = plugin_dir_path(__FILE__) . 'apps/faq-app/build/';

    $js_files = glob($plugin_path . 'static/js/main.*.js');
    $css_files = glob($plugin_path . 'static/css/main.*.css');

    if (!empty($js_files)) {
        $js_file = basename($js_files[0]);
        wp_enqueue_script('faq-plugin-react-app', $plugin_url . 'static/js/' . $js_file, array(), null, true);

        wp_localize_script('faq-plugin-react-app', 'faqPluginSettings', array(
            'apiUrl' => esc_url_raw(rest_url()),
            'nonce'  => wp_create_nonce('wp_rest'),
        ));
    }

    if (!empty($css_files)) {
        $css_file = basename($css_files[0]);
        wp_enqueue_style('faq-plugin-react-app-style', $plugin_url . 'static/css/' . $css_file);
    }
}

add_action('admin_enqueue_scripts', 'faq_plugin_rwd_enqueue_react_app');

function faq_plugin_rwd_settings_page() {
    ?>
    <div class="wrap">
        <h1>Ustawienia FAQ</h1> 
        <div id="rootFaq"></div>
    </div>
    <?php
}
function faq_plugin_rwd_register_settings() {
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_always_open');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_question_text_color');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_question_bg_color');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_answer_text_color');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_answer_bg_color');
}
add_action('admin_init', 'faq_plugin_rwd_register_settings');





function faq_plugin_rwd_get_faq_style() {

    // read questions
    $question_text_color = get_option('faq_plugin_rwd_question_text_color', '#000000'); 
    $question_bg_color = get_option('faq_plugin_rwd_question_bg_color', '#FFFFFF'); 
    // Answers
    $answer_text_color = get_option('faq_plugin_rwd_answer_text_color', '#000000'); 
    $answer_bg_color = get_option('faq_plugin_rwd_answer_bg_color', '#FFFFFF'); 

    // styling CSS do FAQ
    echo '<style>
        .faq_rwd-faq-question {
            color: ' . esc_attr($question_text_color) . ';
            background-color: ' . esc_attr($question_bg_color) . ';
        }
        .faq_rwd-faq-answer{
            color: ' . esc_attr($answer_text_color) . ';
            background-color: ' . esc_attr($answer_bg_color) . ';
        }
    </style>';
}
add_action('wp_head', 'faq_plugin_rwd_get_faq_style');

