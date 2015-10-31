/*-----------------------------------------------------------------

ScrollTrigger
Made by @esr360
http://github.com/esr360/ScrollTrigger
	
-----------------------------------------------------------------*/
		
function scrollTrigger() {
	
    // define data types
    var elReveal = $('[data-trigger]'),
        elReverseReveal = $('[data-trigger-reverse]'),
        elHover = $('[data-hover]'),
        elActive = $('.inactive');
        
    // function to decide if element is in viewport
    $.fn.visible = function(whole){
        // if the entire element is in view
        if (whole) {
            var a = this.offset().top + this.height();
        // if any part of the element is in view
        } else {
            var a = this.offset().top;
        }
        var b = $(window).scrollTop() + $(window).height();
        // is the element in the viewport?
        if (a < b) {
            return true;
        } else {
            return false;
        }
    }
    
    // [data-trigger]
    elReveal.each(function() {
        
        var el = $(this),
            styles = el.data('trigger');
                            
        $(window).bind("load scroll", function() {
            
            // if element is visible in viewpoint
            if (el.visible(true)) {
                el.attr('style', styles);
            }
            
        });	
    
    }); // elReveal
    
    // [data-trigger-reverse]
    elReverseReveal.each(function() {
        
        var el = $(this),
            styles = el.data('trigger-reverse'),
            cachedStyles = null;
            
        // cache current inline styles
        if (typeof(el.attr('style')) != 'undefined') {
            var cachedStyles = el.attr('style');
        }
        
        // add new styles to element
        el.attr('style', styles)
                            
        $(window).bind("load scroll", function() {
            // if element is visible in viewpoint
            if (el.visible(false)) {
                // reset the styles
                el.attr('style', cachedStyles);
            }
            
        });	
    
    }); // elReverseReveal
    
    // [data-hover]
    elHover.each(function(){
        
        var el = $(this),
            styles = el.data('hover');
                        
        el.mouseenter(function(){
            
            // cache current inline styles
            cachedStyles = null;
            if (typeof(el.attr('style')) != 'undefined') {
                var cachedStyles = el.attr('style');
            }
            
            // combine cached + new styles
            el.attr('style', cachedStyles + ';' + styles);
            
            // remove new styles when mouse leaves element
            $(this).mouseleave(function(){
                el.attr('style', cachedStyles);
            });
            
        });
            
    }); // elHover
    
    // .inactive
    elActive.each(function(){
        
        // if element is visible in viewpoint
        if ($(this).visible(true)) {
            $(this)
                .removeClass('inactive')
                .addClass('active');
        }
        
    }); // elActive
	
} // scrollTrigger()

$(scrollTrigger);