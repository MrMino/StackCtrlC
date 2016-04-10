$(document).ready(function () {
    var button = $('<button class="copybox post-tag">Copy</button>');
    button.css('display', 'none');
    button.css('transition-property', 'none');
    
    $('pre').hover(function (){
        $(this).prepend(button);
        $(this).find(button).fadeIn();
    }, function (){
        $(this).find(button).fadeOut(function(){
            $(this).remove();
        });
    });
});