$(function () {
    $('.nav-links a, .brand-mark').on('click', function (event) {
        const href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            event.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({ scrollTop: target.offset().top - 90 }, 500);
            }
        }
    });
});
