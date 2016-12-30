/**
 * ScrollTrigger
 * Made by @esr360
 * http://github.com/esr360/ScrollTrigger
 */		
function scrollTrigger() {
	
    // define data types
    var elReveal        = $('[data-trigger]');
    var elReverseReveal = $('[data-trigger-reverse]');
    var elHover         = $('[data-hover]');
    var elActive        = $('.inactive');
        
    // function to decide if element is in viewport
    $.fn.visible = function(startingPoint){
        // set default option
        startingPoint = startingPoint || 'top';

        // if any part of the element is in view
        if (startingPoint == 'top') {
            var a = this.offset().top;
        }

        // if majotiy of the element is in view 
        else if (startingPoint == 'middle') {
            var a = this.offset().top + (this.height() / 2);
        }

        // if the entire element is in view
        else if (startingPoint == 'bottom') {
            var a = this.offset().top + this.height();
        }

        var b = $(window).scrollTop() + $(window).height();

        // is the element in the viewport?
        return a < b ? true : false;
    }

    // [data-trigger]
    elReveal.each(function() {
        var el = $(this);
        var styles = el.data('trigger');
                            
        $(window).bind('load scroll', function() {
            if (el.visible('middle')) {
                el.attr('style', styles);
            }
        });	
    });
    
    // [data-trigger-reverse]
    elReverseReveal.each(function() {
        var el = $(this);
        var styles = el.data('trigger-reverse');
        var cachedStyles = null;
            
        // cache current inline styles
        if (typeof(el.attr('style')) != 'undefined') {
            var cachedStyles = el.attr('style');
        }
        
        // add new styles to element
        el.attr('style', styles)
                            
        $(window).bind('load scroll', function() {
            if (el.visible('top')) {
                // reset the styles
                el.attr('style', cachedStyles);
            }
        });	
    });
    
    // [data-hover]
    elHover.each(function(){
        var el = $(this);
        var styles = el.data('hover');
                        
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
    });
    
    // .inactive
    elActive.each(function(){
        if ($(this).visible('bottom')) {
            $(this).removeClass('inactive').addClass('active');
        }
    });
	
} // scrollTrigger()

$(scrollTrigger);