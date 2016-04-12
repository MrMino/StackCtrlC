//Code from copyToClipboard() courtesy of jfriend00's modified answer, my lack of coffee, and my laziness
//https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery/22581382#22581382
//
//
//But mostly jfriend00's answer 
//Slightly modified by me, to fit my reality
function copyToClipboard(elem) {
    var targetId = "_hiddenCopyText_";
    var origSelectionStart, origSelectionEnd;
    origSelectionStart = elem.selectionStart;
    origSelectionEnd = elem.selectionEnd;
    
    // Must use a temporary form element for the selection and copy
    // Create hidden text element, if it doesn't already exist
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
        'padding':              $(copycat).css('padding'),
        'color':                $(copycat).css('color'),
        'font-size':            $(copycat).css('font-size'),
        'font-family':          $(copycat).css('font-family'),
        'background-color':     $(copycat).css('background-color'),
        'border-color':         $(copycat).css('border-color'),
        'border-width':         $(copycat).css('border-width'),
        'border-style':         $(copycat).css('border-style'),
        'border-radius':        $(copycat).css('border-radius'),
    };
    button.css(css_string);
    
    //Calculating button width
    //Element needs to be present in DOM to calculate it's width
    //I blame Hakon Wium Lie
    $('body').append(button);
    var offset = button.width();
    button.remove();
    
    //For some reason, offset is still too low. I blame W3C.
    offset += 30;
    
    //Hiding, fading, showing, etc.
    $('pre').hover(function (){
        //======================= Mouse in =======================
        //Calculating the right position for the button to appear
        var pos = $(this).width();
        pos -= offset;
        
        //Button is cloned, so jquery won't trip up
        clone = button.clone();
        clone.css('margin-left', pos + "px");
        $(this).prepend(clone);
        
        //Click event
        clone.click(function(){
            copyToClipboard($(this).parent().find("code").get(0));
        });
        
        $(this).find('._copyButton').fadeIn();
    }, function (){
        //======================= Mouse out ======================
        $(this).find('._copyButton').fadeOut(function(){
            $(this).remove();
        });
    });
});
