//...copyToClipboard() courtesy of jfriend00's answer, my lack of coffee, and my laziness
//But mostly jfriend00's answer 
function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

$(document).ready(function () {
    var button = $('<button class="_copyButton">Copy</button>');
    
    //CSS is copied from .post-tag class, to ensure proper style when stylish is present
    //Button isn't just enclased as post-tag, to make sure nothing interferes with positioning
    var copycat = $('.post-tag');
    var css_string = {
        'display':'none',
        'transition-property':'none',
        'position':'absolute',
        'cursor':'pointer',
        'margin':'0px',
        'background-color':$(copycat).css('background-color'),
        'color':$(copycat).css('color'),
        'font-family':$(copycat).css('font-family'),
        'border-width':$(copycat).css('border-width'),
        'padding':$(copycat).css('padding'),
        'font-size':$(copycat).css('font-size'),
        'border-radius':$(copycat).css('border-radius'),
        'border-style':$(copycat).css('border-style'),
        'border-color':$(copycat).css('border-color'),
    };
    button.css(css_string);
    
    //Calculating button width
    //Element needs to be present in DOM to calculate it's width
    //I blame Hakon Wium Lie
    $('body').append(button);
    var offset = button.width();
    button.remove();
    
    //For some reason offset is still too low. I blame W3C.
    offset += 30;
    
    //Hiding, fading, showing, etc.
    $('pre').hover(function (){
        //Calculating the right position for the button to appear
        var pos = $(this).width();
        pos -= offset;
        
        //Button is cloned, so jquery won't trip up
        clone = button.clone();
        clone.css('margin-left', pos + "px");
        $(this).prepend(clone);
        
        //Click event
        clone.click(function(){
            console.log($(this).parent().text());
            //Button inner text is removed for a bit, so it won't end up in clipboard
            $(this).text('');
            copyToClipboard($(this).parent().get(0));
            $(this).text('Copy');
        });
        
        $(this).find('._copyButton').fadeIn();
    }, function (){
        $(this).find('._copyButton').fadeOut();
    });
});
