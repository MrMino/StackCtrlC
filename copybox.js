$(document).ready(function () {
    var button = $('<button class="copybox post-tag">Copy</button>');
    var css_string = {
        'display':'none',
        'transition-property':'none',
        'position':'absolute'
    };
    button.css(css_string);
    
    $('pre').hover(function (){
        $(this).prepend(button);
        $(this).find(button).fadeIn();
    }, function (){
        $(this).find(button).fadeOut(function(){
            $(this).remove();
        });
    });
});