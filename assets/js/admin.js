$(function () {
    $('textarea.code-box').on('focus', function () {
        $(this).addClass('border-warning');
    }).on('blur', function () {
        $(this).removeClass('border-warning');
    });
});
