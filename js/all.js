jQuery(document).ready(function ($) {

    /*
     * Smooth scroll to section from left menu
     */
    var scrollLink = $('.scroll');

    scrollLink.click(function (e) {

        e.preventDefault();

        $('body,html').stop(true, true).animate({

            scrollTop: $(this.hash).offset().top

        }, 1000, 'easeOutExpo');

    });

    /*
     * Left menu active switch on scroll to section
     */
    $(window).scroll(function () {

        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function () {
            var sectionOffset = $(this.hash).offset().top - 20;
            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        })
    });

    /*
     * Project filter
     */
    $(".filter-button").click(function () {
        var value = $(this).attr('data-filter');
        if (value == "all") {
            $('.filter').show('1000');
        } else {
            $(".filter").not('.' + value).hide('1000');
            $('.filter').filter('.' + value).show('1000');
        }
        update_scrollify();
    });

    /*
     * Responsive nav menu
     */
    $(".desktop-menu-btn").click(function (e) {
        e.preventDefault();
        $('body').toggleClass('dmenu-close');
        update_scrollify();
    });

    $(".mobile-menu-btn").click(function (e) {
        e.preventDefault();
        $('.exalt-sidebar-menu').toggleClass('active');
        update_scrollify();
    });

    $(".tabmenu-mobile").click(function (e) {
        e.preventDefault();
        $('.toolbar').toggleClass('active');
        update_scrollify();
    });

    /*
     * Disable scrollify in mobile
     */
    if ($(window).width() > 980) {
        /*
         * Section scroll
         */
        add_scrollify();
    }

    $(window).resize(function () {
        if ($(window).width() < 980) {
            remove_scrollify();
        } else {
            add_scrollify();
        }
        update_scrollify();
    });

    /*
     * Nicescroll for left menu
     */
    $('.header-inner').niceScroll({
        horizrailenabled: false,
        grabcursorenabled: false,
        cursorcolor: "#183c5d",
        cursorborder: "1px solid #183c5d",
    });

    /*
     * Contact form submission
     */
    if ($('#contact_form').length) {
        $('#contact_form').submit(function (event) {

            event.preventDefault();

            var formdata = $('#contact_form').serialize();

            $('#contact_form :input').prop('disabled', true);

            $.ajax({
                url: 'contactsubmit.php',
                data: formdata,
                type: 'POST',
                processData: false,
                contentType: false,
                success: function (response) {
                    $('#contact_form :input').prop('disabled', false);
                }
            });
        });
    }
    /*
     * wow animation
     */
    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
    });
    wow.init();

    /*
     * Lightbox
     */
    $('.gallery_product a.zoom-img-icon').superLightBox({});

    /*
     * Preloader
     */
    $('body').imagesLoaded({background: true}, function () {
        $('.loader').fadeOut('slow');
    });
});

function update_scrollify() {
    setTimeout(function () {
        $.scrollify.update();
    }, 1100);
}

function add_scrollify() {
    $.scrollify({
        section: ".content-shrink > section",
        touchScroll: false,
        updateHash: false
    });
}

function remove_scrollify() {
    $.scrollify.destroy();
}