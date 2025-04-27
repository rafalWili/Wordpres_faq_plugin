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


function faq_plugin_rwd_settings_page() {
    ?>
    <div class="wrap">
        <h1>Ustawienia FAQ</h1>
        <form method="post" action="options.php">
            <?php
            // Wykorzystanie funkcji WordPressa do wstawienia odpowiednich pól
            settings_fields('faq_plugin_rwd_options_group'); 
            do_settings_sections('faq_plugin_rwd_settings');
            ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Zawsze otwarty FAQ</th>
                    <td><input type="checkbox" name="faq_plugin_rwd_always_open" value="1" <?php checked(1, get_option('faq_plugin_rwd_always_open'), true); ?> /></td>
                </tr>

                <tr valign="top">
                    <th scope="row">Kolor tekstu pytania</th>
                    <td><input type="text" name="faq_plugin_rwd_question_text_color" value="<?php echo esc_attr(get_option('faq_plugin_rwd_question_text_color')); ?>" /></td>
                </tr>

                <tr valign="top">
                    <th scope="row">Kolor tła pytania</th>
                    <td><input type="text" name="faq_plugin_rwd_question_bg_color" value="<?php echo esc_attr(get_option('faq_plugin_rwd_question_bg_color')); ?>" /></td>
                </tr>

                <tr valign="top">
                    <th scope="row">Kolor obramowania pytania</th>
                    <td><input type="text" name="faq_plugin_rwd_question_border_color" value="<?php echo esc_attr(get_option('faq_plugin_rwd_question_border_color')); ?>" /></td>
                </tr>
            </table>

            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}
function faq_plugin_rwd_register_settings() {
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_always_open');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_question_text_color');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_question_bg_color');
    register_setting('faq_plugin_rwd_options_group', 'faq_plugin_rwd_question_border_color');
}
add_action('admin_init', 'faq_plugin_rwd_register_settings');

function faq_plugin_rwd_get_faq_style() {
    // Odczytanie ustawień
    $text_color = get_option('faq_plugin_rwd_question_text_color', '#000000'); // domyślny kolor: czarny
    $bg_color = get_option('faq_plugin_rwd_question_bg_color', '#FFFFFF'); // domyślny kolor: biały
    $border_color = get_option('faq_plugin_rwd_question_border_color', '#000000'); // domyślny kolor: czarny

    // Dodanie stylów CSS do FAQ
    echo '<style>
        .faq_rwd-faq-question {
            color: ' . esc_attr($text_color) . ';
            background-color: ' . esc_attr($bg_color) . ';
            border: 1px solid ' . esc_attr($border_color) . ';
        }
    </style>';
}
add_action('wp_head', 'faq_plugin_rwd_get_faq_style');
