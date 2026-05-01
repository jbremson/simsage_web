jQuery(document).ready(function(){
	"use strict";
	
    /**
     * WP Gallery Lightbox Init
     */
    jQuery('.gallery-item a[href$=".jpg"], .gallery-item a[href$=".png"], .gallery-item a[href$=".jpeg"], .gallery-item a[href$=".gif"]').attr('data-lightbox', 'image');

	/**
	 * Accordion Tweaks
	 */
	jQuery('.accordion > li:first-child, .tabs > li:first-child').addClass('active');
	jQuery('a.btn:not(:has(>span))').wrapInner('<span class="btn__text" />');
	
	/**
	 * Mega Menu Stuff
	 */
	jQuery('nav .menu li ul .wpb_column, .left-vertical-nav .menu li ul .wpb_column').unwrap().parent().removeClass('subnav').addClass('multi-column');
	jQuery('.multi-column ul').removeClass('menu').unwrap().unwrap().unwrap().unwrap().unwrap().wrap('<li />');
	jQuery('.multi-column > div > li, .multi-column__title').unwrap();
	jQuery('nav span.label, .left-vertical-nav nav span.label').each(function(){
		jQuery(this).appendTo(jQuery(this).parents('li').eq(0));
	});
	
	jQuery('nav .menu > .menu-item-has-children > a').append(' <i class="icon-Arrow-Down2"></i>');
	
	jQuery('nav .menu a[href^="#"]:not(a[href="#"]), .left-vertical-nav .menu a[href^="#"]:not(a[href="#"])').addClass('inner-link');
	
	/**
	 * Forms Stuff
	 */
	jQuery('.wpcf7-radio .wpcf7-list-item').addClass('input-radio').prepend('<div class="inner" />');
	jQuery('.wpcf7-checkbox .wpcf7-list-item').addClass('input-checkbox').prepend('<div class="inner" />');
	
	jQuery('.single p:has(iframe)').fitVids();

    jQuery('#archive-navigation > a').addClass('btn btn btn--primary').wrapInner('<span class="btn__text" />');
	
	/**
	 * Centered inline header
	 */
	var theLiElements = jQuery('.nav-bar.centered-inline .menu > li'),
		liCount = theLiElements.length,
		liHalf = ( Math.round(liCount / 2) ) - 1;
		
		
	theLiElements.each(function(i){
		if( i <= liHalf ){
			//nothing	
		} else {
			jQuery(this).addClass('pull-right');
		}
	});
	
	
	//////////////// Checkbox Inputs
	jQuery('.input-checkbox').on('click', function() {
	    var checkbox = jQuery(this);
	    checkbox.toggleClass('checked');
	    
	    var input = checkbox.find('input');
	    if (input.prop('checked') === false) {
	        input.prop('checked', true);
	    } else {
	        input.prop('checked', false);
	    }
	});
	
	//////////////// Radio Buttons
	jQuery('.input-radio').on('click', function() {
	    jQuery(this).parent().find('.input-radio').removeClass('checked');
	    jQuery(this).addClass('checked').find('input').prop('checked', true);
	    return false;
	});
	
	//////////////// File Uploads
	jQuery('.input-file .btn').on('click',function(){
	    jQuery(this).parent().find('input').trigger('click');
	    return false;
	});

    /**
     * Select items
     */
    jQuery('select').wrap('<div class="select-option" />').parent().prepend('<i class="interface-down-open-big"></i>');
    
    jQuery('.woocommerce form.login').prev('h2').remove();
    
    jQuery('.tab__content:has(iframe)').addClass('remove-anim');
    
    setTimeout(function(){
    	jQuery('.btn--floating').addClass('faded');
    }, 7000);
    
});

var mr = (function ($, window, document){
    "use strict";

    var mr         = {},
        components = {documentReady: [], windowLoad: []};


    jQuery(document).ready(documentReady);
    jQuery(window).load(windowLoad);

    function documentReady(context){
        
        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach(function(component){
            component(context);
        });
    }

    function windowLoad(context){
        
        context = typeof context == "object" ? $ : context;
        components.windowLoad.forEach(function(component){
           component(context);
        });
    }

    mr.setContext = function (contextSelector){
        var context = $;
        if(typeof contextSelector !== typeof undefined){
            return function(selector){
                return jQuery(contextSelector).find(selector);
            };
        }
        return context;
    };

    mr.components    = components;
    mr.documentReady = documentReady;
    mr.windowLoad    = windowLoad;

    return mr;
}(jQuery, window, document));


//////////////// Utility Functions
mr = (function (mr, $, window, document){
    "use strict";
    mr.util = {};

    mr.util.requestAnimationFrame    = window.requestAnimationFrame || 
                                       window.mozRequestAnimationFrame || 
                                       window.webkitRequestAnimationFrame ||
                                       window.msRequestAnimationFrame;

    mr.util.documentReady = function($){
        var today = new Date();
        var year = today.getFullYear();
        jQuery('.update-year').text(year);
    };

    mr.util.getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    };


    mr.util.capitaliseFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    mr.util.slugify = function(text){
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    
    // Set data-src attribute of element from src to be restored later
    mr.util.idleSrc = function(context, selector){
        
            selector  = (typeof selector !== typeof undefined) ? selector : '';
            var elems = context.is(selector+'[src]') ? context : context.find(selector+'[src]');

        elems.each(function(index, elem){
            elem           = jQuery(elem);
            var currentSrc = elem.attr('src'),
                dataSrc    = elem.attr('data-src');

            // If there is no data-src, save current source to it
            if(typeof dataSrc === typeof undefined){
                elem.attr('data-src', currentSrc);
            }

            // Clear the src attribute
            elem.attr('src', '');    
            
        });
    };

    // Set src attribute of element from its data-src where it was temporarily stored earlier
    mr.util.activateIdleSrc = function(context, selector){
        
        selector     = (typeof selector !== typeof undefined) ? selector : '';
        var elems    = context.is(selector+'[src]') ? context : context.find(selector+'[src]');

        elems.each(function(index, elem){
            elem = jQuery(elem);
            var dataSrc    = elem.attr('data-src');

            // If there is no data-src, save current source to it
            if(typeof dataSrc !== typeof undefined){
                elem.attr('src', dataSrc);
            }
        });
    };

    mr.util.pauseVideo = function(context){
        var elems = context.is('video') ? context : context.find('video');

        elems.each(function(index, video){
            var playingVideo = jQuery(video).get(0);
            playingVideo.pause();
        });
    };

    mr.components.documentReady.push(mr.util.documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Scroll Functions
mr = (function (mr, $, window, document){
    "use strict";

    mr.scroll           = {};
    mr.scroll.listeners = [];
    mr.scroll.y         = 0;
    mr.scroll.x         = 0;

    var documentReady = function($){
        
        //////////////// Capture Scroll Event and fire scroll function
        
        addEventListener('scroll', function(evt) {
            mr.util.requestAnimationFrame.call(window, function(){
                mr.scroll.update(evt)
            });
        }, false);
        
    };

    mr.scroll.update = function(event){
    
        mr.scroll.y = window.pageYOffset;
        mr.scroll.x = window.pageXOffset;
 
        // Loop through all mr scroll listeners
        for (var i = 0, l = mr.scroll.listeners.length; i < l; i++) {
           mr.scroll.listeners[i](event);
        }
    };

    mr.scroll.documentReady = documentReady;

    mr.components.documentReady.push(documentReady);

    return mr;

}(mr, jQuery, window, document));


//////////////// Accordions
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        jQuery('.accordion__title').on('click', function(){
            var accordion = jQuery(this).closest('.accordion');
            var li = jQuery(this).closest('li');
            if(li.hasClass('active')){
                li.removeClass('active');      
            }else{
                if(accordion.hasClass('accordion--oneopen')){
                    var wasActive = accordion.find('li.active');
                    wasActive.removeClass('active');
                    li.addClass('active');
                }else{
                    li.addClass('active');
                }
            }
        });

        jQuery('.accordion').each(function(){
            var accordion = jQuery(this);
            var minHeight = accordion.outerHeight(true);
            accordion.css('min-height',minHeight);
        });
    };

    mr.accordions = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));


//////////////// Backgrounds
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        
        //////////////// Append .background-image-holder <img>'s as CSS backgrounds

	    jQuery('.background-image-holder').each(function() {
	        var imgSrc = jQuery(this).children('img').attr('src');
	        if (imgSrc){
	        	jQuery(this).css('background', 'url("' + imgSrc + '")');
	        }
	        jQuery(this).css('background-position', 'initial').css('opacity','1');
	    });
    };

    mr.backgrounds = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Cookies
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.cookies = {

        getItem: function (sKey) {
            if (!sKey) { return null; }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
                var sExpires = "";
                if (vEnd) {
                  switch (vEnd.constructor) {
                    case Number:
                      sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                      break;
                    case String:
                      sExpires = "; expires=" + vEnd;
                      break;
                    case Date:
                      sExpires = "; expires=" + vEnd.toUTCString();
                      break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    return mr;

}(mr, jQuery, window, document));

//////////////// Masonry
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){

        jQuery('.masonry').each(function(){
            var masonry = jQuery(this);
            var masonryContainer = masonry.find('.masonry__container'),
                filters          = masonry.find('.masonry__filters'),
                // data-filter-all-text can be used to set the word for "all"
                filterAllText    = typeof filters.attr('data-filter-all-text') !== typeof undefined ? filters.attr('data-filter-all-text') : "All",
                filtersList;
            
            // If a filterable masonry item exists
            if(masonryContainer.find('.masonry__item[data-masonry-filter]').length){
                
                // Create empty ul for filters
                filters.append('<ul></ul>');
                filtersList = filters.find('> ul');

                // Add a filter "all" option
                filtersList.append('<li class="active" data-masonry-filter="*">'+filterAllText+'</li>');

                // To avoid cases where user leave filter attribute blank
                // only take items that have filter attribute
                masonryContainer.find('.masonry__item[data-masonry-filter]').each(function(){
                    var masonryItem  = jQuery(this),
                        filterString = masonryItem.attr('data-masonry-filter'),
                        filtersArray = [];

                    // If not undefined or empty
                    if(typeof filterString !== typeof undefined && filterString !== ""){
                        // Split tags from string into array 
                        filtersArray = filterString.split(',');
                    }
                    jQuery(filtersArray).each(function(index, tag){

                        // Slugify the tag

                        var slug = mr.util.slugify(tag);

                        // Add the filter class to the masonry item

                        masonryItem.addClass('filter-'+slug);

                        // If this tag does not appear in the list already, add it
                        if(!filtersList.find('[data-masonry-filter="'+slug+'"]').length){
                            filtersList.append('<li data-masonry-filter="'+slug+'">'+tag+'</li>');
                            
                        }
                    }); 
                });
            }
            //End of "if filterable masonry item exists"
        });
        
    };

    var windowLoad = function(){

        jQuery('.masonry').each(function(){
            var masonry = jQuery(this).find('.masonry__container');

            masonry.on('layoutComplete',function(){
                masonry.addClass('masonry--active');
            });

            masonry.isotope({
              itemSelector: '.masonry__item',
              masonry: {
                columnWidth: '.masonry__item'
              }
            });
            
        });
        
        setInterval(function(){
        	jQuery(window).trigger('resize');
        }, 1500);
        
        /**
         * Load more stuff
         */
        jQuery('.load-more').on('click', function(e) {
            e.preventDefault();
            
            var clicks, 
            	me = jQuery(this),
                oMsg;
        
            me.attr('disabled', true);
        
            // set loading status
            jQuery('span', me).text(me.attr('data-loading-text'));
        
            // perform ajax request
            jQuery.ajax({
                url: me.attr('href'),
                type: 'GET',
                dataType: 'HTML'
            }).done(function(result) {
                var items = jQuery(result).find('.masonry__container.blog-load-more > .masonry__item');
                items.imagesLoaded(function(){
                	jQuery('.background-image-holder', items).each(function() {
                	    var imgSrc = jQuery(this).children('img').attr('src');
                	    jQuery(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity','1');
                	});
                	jQuery('.single p:has(iframe)', items).fitVids();
                	jQuery('.masonry__container.blog-load-more').isotope( 'insert', items );
                	me.remove();
                	jQuery(window).trigger('resize');
                });
            }).fail(function() {
                alert('fail');
            });
        	
        	return false;
        });

        jQuery('.masonry__filters li').on('click', function(){
            var masonryFilter = jQuery(this);
            var masonryContainer = masonryFilter.closest('.masonry').find('.masonry__container');
            var filterValue = '*';
            if(masonryFilter.attr('data-masonry-filter') !== '*'){
                filterValue = '.filter-'+masonryFilter.attr('data-masonry-filter');
            }
            jQuery('.masonry__filters li').removeClass('active');
            masonryFilter.addClass('active');
            masonryContainer.removeClass('masonry--animate');
            masonryContainer.isotope({ filter: filterValue });
        });
    };

    mr.masonry = {
        documentReady : documentReady,
        windowLoad : windowLoad        
    };

    mr.components.documentReady.push(documentReady);
    mr.components.windowLoad.push(windowLoad);
    return mr;

}(mr, jQuery, window, document));

//////////////// Modals
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.modals = {};

    var documentReady = function($){
        jQuery('.modal-container').each(function(){

            // Add modal close if none exists

            var modal        = jQuery(this),
                $window      = jQuery(window),
                modalContent = modal.find('.modal-content');
                
            
            if(!modal.find('.modal-close').length){
                modal.find('.modal-content').append('<div class="modal-close modal-close-cross"></div>');
            }

            // Set modal height
            
            if(modalContent.attr('data-width') !== undefined){
                var modalWidth = modalContent.attr('data-width').substr(0,modalContent.attr('data-width').indexOf('%')) * 1;
                if($window.width()<1280 && $window.width()>990){
                    modalWidth = modalWidth + 15;  
                }else if($window.width()<990){
                    modalWidth = modalWidth + 20;  
                }
                modalContent.css('width',modalWidth + '%');
            }
            if(modalContent.attr('data-height') !== undefined){
                var modalHeight = modalContent.attr('data-height').substr(0,modalContent.attr('data-height').indexOf('%')) * 1;
                if($window.height()<768){
                    console.log($window.height());
                    modalHeight = modalHeight + 15;  
                }
                modalContent.css('height',modalHeight + '%');
            }

            // Set iframe's src to data-src to stop autoplaying iframes
            mr.util.idleSrc(modal, 'iframe');

        });

        if(typeof mr_variant == typeof undefined){
            jQuery('.modal-instance').each(function(index){
                var modalInstance = jQuery(this);
                var modal = modalInstance.find('.modal-container');
                var modalContent = modalInstance.find('.modal-content');
                var trigger = modalInstance.find('.modal-trigger');
                
                // Link modal with modal-id attribute
                
                trigger.attr('data-modal-index',index);
                modal.attr('data-modal-index',index);
                
                // Set unique id for multiple triggers
                
                if(typeof modal.attr('data-modal-id') !== typeof undefined){
                    trigger.attr('data-modal-id', modal.attr('data-modal-id'));
                }
                

                // Attach the modal to the body            
                modal = modal.detach();
                jQuery('body').append(modal);
            });
        }

        jQuery('.modal-trigger').on('click', function(){

            var modalTrigger = jQuery(this);
            var $body        = jQuery('body');
            var uniqueID, targetModal;
            // Determine if the modal id is set by user or is set programatically
   
            if(typeof modalTrigger.attr('data-modal-id') !== typeof undefined){
                uniqueID = modalTrigger.attr('data-modal-id');
                targetModal = $body.find('.modal-container[data-modal-id="'+uniqueID+'"]');    
            }else{
                uniqueID = jQuery(this).attr('data-modal-index');
                targetModal = $body.find('.modal-container[data-modal-index="'+uniqueID+'"]');
            }
            
            mr.util.activateIdleSrc(targetModal, 'iframe');
            mr.modals.autoplayVideo(targetModal);

            mr.modals.showModal(targetModal);

            return false;
        });

        jQuery('.modal-close').on('click', mr.modals.closeActiveModal);

        jQuery(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                mr.modals.closeActiveModal();
            }
        });

        jQuery('.modal-container, .modal-content').on('click', function(e) { 
            if( e.target != this ) return;
            mr.modals.closeActiveModal();
        });

        // Trigger autoshow modals

        jQuery('.modal-container[data-autoshow]').each(function(){
            var modal = jQuery(this);
            var millisecondsDelay = modal.attr('data-autoshow')*1;

            mr.util.activateIdleSrc(modal);
            mr.modals.autoplayVideo(modal);

            // If this modal has a cookie attribute, check to see if a cookie is set, and if so, don't show it.
            if(typeof modal.attr('data-cookie') !== typeof undefined){
                if(!mr.cookies.hasItem(modal.attr('data-cookie'))){
                    mr.modals.showModal(modal, millisecondsDelay);
                }
            }else{
                mr.modals.showModal(modal, millisecondsDelay);
            }
        });

        // Make modal scrollable
        jQuery(document).on('wheel mousewheel scroll','.modal-content, .modal-content .scrollable', function(evt){
            if(evt.preventDefault){evt.preventDefault();}
            if(evt.stopPropagation){evt.stopPropagation();}
            this.scrollTop += (evt.originalEvent.deltaY); 
        });
    };
    ////////////////
    //////////////// End documentReady
    ////////////////

    mr.modals.documentReady = documentReady;

    mr.modals.showModal = function(modal, millisecondsDelay){
        
        var delay = (typeof millisecondsDelay !== typeof undefined) ? (1*millisecondsDelay) : 0;
        
        setTimeout(function(){
            modal.addClass('modal-active');
        },delay);
    };

    mr.modals.closeActiveModal = function(){
        var modal = jQuery('body div.modal-active');
        mr.util.idleSrc(modal, 'iframe');
        mr.util.pauseVideo(modal);

        // If this modal requires to be closed permanently using a cookie, set the cookie now.
        if(typeof modal.attr('data-cookie') !== typeof undefined){
            mr.cookies.setItem(modal.attr('data-cookie'), "true", Infinity, '/');
        }

        modal.removeClass('modal-active');
    };

    mr.modals.autoplayVideo = function(modal){
        // If modal contains HTML5 video with autoplay, play the video
        if(modal.find('video[autoplay]').length){
            var video = modal.find('video').get(0);
            video.play();
        }
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Navigation
mr = (function (mr, $, window, document){
    "use strict";
    
    // The navigation object
    mr.navigation = {};

    // The overall nav element (one per page)
    mr.navigation.nav = {};

    // In case there is a bar type nav element
    mr.navigation.bar = {};

    var documentReady = function($){
        
        mr.navigation.nav.element = jQuery('nav');
        mr.navigation.bar.element = jQuery('nav .nav-bar');
        
        // Check for nav element and set outerHeight variable
        if(mr.navigation.nav.element.length){
            mr.navigation.nav.outerHeight = mr.navigation.nav.element.outerHeight();
        }else{
            mr.navigation.nav.outerHeight = 0;
        }
        // Check for a bar type nav
        if(mr.navigation.bar.element.length){
            mr.navigation.bar.init();
        }

        //////////////// Mobile Menu Toggle
        
        jQuery('.nav-mobile-toggle').on('click', function(){
            jQuery('nav').toggleClass('nav-open');
        });
        
        jQuery('.menu li.menu-item-has-children').on('click', function(ev){
            var navItem = jQuery(this),
                e       = ev || window.event;
            
            e.stopPropagation();
            if (navItem.find('ul').length) {
                navItem.toggleClass('active');
            } else {
                navItem.parents('.active').removeClass('active');
            }
            
        });
        
        //////////////// Mobile Menu Applets
        
        jQuery('.module-applet').on('click', function(){
            jQuery(this).toggleClass('active');
        });
        
        jQuery('.module-applet__body').each(function(){
            var moduleBody = jQuery(this);
            var farRight = moduleBody.offset().left + moduleBody.outerWidth();
            if(farRight > jQuery(window).width()){
                moduleBody.addClass('pos-right');
            }
        });
        
        //////////////// Menu dropdown positioning

        jQuery('.menu > li > ul').each(function() {
            var $window          = jQuery(window);
            var dropDown         = jQuery(this);
            var menu             = dropDown.offset();
            var farRight         = menu.left + dropDown.outerWidth(true);
            var windowWidth      = $window.width();
            var multiColumn      = dropDown.hasClass('multi-column');

            if (farRight > windowWidth && !multiColumn) {
                dropDown.addClass('make-right');
            } else if (farRight > windowWidth && multiColumn) {
                var difference = farRight - windowWidth;
                dropDown.css('margin-left', -(difference));
            }
        });

    };

    ///
    ///    END DOCUMENTREADY
    ///
    ////////////////////////////////////
    
    mr.navigation.bar.init = function(){
        // Get data-fixed-at attribute
        var fixedAt = mr.navigation.bar.element.attr('data-fixed-at');
        // Save mr.navigation.bar.fixedAt as a number or null if not set
        mr.navigation.bar.fixedAt = (typeof fixedAt !== typeof undefined) ? parseInt(fixedAt.replace('px', ''), 10) : false;

        // Only run scroll listeners if bar does not already have nav--fixed class
        if(mr.navigation.bar.element.hasClass('nav--fixed')){
            // We know this is a fixed nav bar
            mr.navigation.bar.isFixed = true;
        }else if (fixedAt) {
            // If fixedAt has a value (not false) and nav bar has no ".nav--fixed" class
            // add navigation.bar.update to scroll event cycle
            mr.navigation.nav.element.css('min-height', mr.navigation.nav.outerHeight);
            mr.navigation.bar.isFixed = false;
            mr.scroll.listeners.push(mr.navigation.bar.update);
        }


    };

    mr.navigation.bar.update = function(){
        // If page is scrolled beyond the point where nav should be fixed
        if( (mr.scroll.y > mr.navigation.bar.fixedAt) && !mr.navigation.bar.isFixed)
        {
            mr.navigation.bar.isFixed = true;
            mr.navigation.bar.element.addClass('nav--fixed');
        }

        if( (mr.scroll.y < mr.navigation.bar.fixedAt) && mr.navigation.bar.isFixed)
        {
            mr.navigation.bar.isFixed = false;
            mr.navigation.bar.element.removeClass('nav--fixed');
        }
    };

    mr.navigation.documentReady = documentReady;        

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Notifications
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.notifications = {};

    var documentReady = function($){
        
        jQuery('.notification').each(function(){
            var notification = jQuery(this);
            if(!notification.find('.notification-close').length){
                notification.append('<div class="notification-close-cross notification-close"></div>');
            }
        });
    

        jQuery('.notification[data-autoshow]').each(function(){
            var notification = jQuery(this);
            var millisecondsDelay = notification.attr('data-autoshow') * 1;

            // If this notification has a cookie attribute, check to see if a cookie is set, and if so, don't show it.
            if(typeof notification.attr('data-cookie') !== typeof undefined){
                if(!mr.cookies.hasItem(notification.attr('data-cookie'))){
                    mr.notifications.showNotification(notification, millisecondsDelay);
                }
            }else{
                mr.notifications.showNotification(notification, millisecondsDelay);
            }
        });

        jQuery('[data-notification-link]:not(.notification)').on('click', function(){
            var notificationID = jQuery(this).attr('data-notification-link');
            var notification = jQuery('body').find('.notification[data-notification-link="'+notificationID+'"]');
            notification.removeClass('notification--dismissed');
            notification.addClass('notification--reveal');
            return false;
        });

        jQuery('.notification-close').on('click', function(){
            var closeButton = jQuery(this);
            // Pass the closeNotification function a reference to the close button
            mr.notifications.closeNotification(closeButton);

            if(closeButton.attr('href') === '#'){
                return false;
            }
        });
    
    };
    
    mr.notifications.documentReady = documentReady;

    mr.notifications.showNotification = function(notification, millisecondsDelay){
        var delay = (typeof millisecondsDelay !== typeof undefined) ? (1*millisecondsDelay) : 0;

        setTimeout(function(){
            notification.addClass('notification--reveal');
        },delay);
    };

    mr.notifications.closeNotification = function(notification){

        var $notification = jQuery(notification);
        
        notification = $notification.is('.notification-close') ? 
                       $notification.closest('.notification') : 
                       jQuery('body').find('.notification[data-notification-link="'+notification+'"]');

        notification.addClass('notification--dismissed'); 

        // If this notification requires to be closed permanently using a cookie, set the cookie now.
        if(typeof notification.attr('data-cookie') !== typeof undefined){
            mr.cookies.setItem(notification.attr('data-cookie'), "true", Infinity, '/');
        }
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Parallax
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        
        var $window      = jQuery(window); 
        var windowWidth  = $window.width();
        var windowHeight = $window.height();
        var navHeight    = jQuery('nav').outerHeight(true);

        // Disable parallax on mobile

        if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
            jQuery('section').removeClass('parallax');
        }

        if (windowWidth > 768) {
            var parallaxHero = jQuery('.parallax:nth-of-type(1)'),
                parallaxHeroImage = jQuery('.parallax:nth-of-type(1) .background-image-holder');

            parallaxHeroImage.css('top', -(navHeight));
            if(parallaxHero.outerHeight(true) == windowHeight){
                parallaxHeroImage.css('height', windowHeight + navHeight);
            }
        }
    };

    mr.parallax = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Piecharts
mr = (function (mr, $, window, document){
	  "use strict";
	  
	  var documentReady = function($){
	      jQuery.fn.easyaspie = function () {
			
				var	size	= parseInt(this.data('size'), 10),
					radius	= size / 2,
					value	= parseInt(this.data('value'), 10);
				
				// pie all the things!
				if (this.length > 1){
					this.each( function() {
						jQuery(this).easyaspie();
					});
					return this;
				}
				
				// is you trying to break things?
				if (isNaN(value)) {
					return this;
				}
				
				// set the size of this
				this.css({
					height: size,
					width: size
				}).addClass('pie-sliced');
				
				// make value behave
				value = Math.min(Math.max(value, 0), 100);

				// make me some svg
				this.pie = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				
				// if value is 100 or higher, just use a circle
				if (value >= 100) {
					this.pie.slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
					this.pie.slice.setAttribute('r', radius);
					this.pie.slice.setAttribute('cx', radius);
					this.pie.slice.setAttribute('cy', radius);
					
				} else {
					this.pie.slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
					
					//calculate x,y coordinates of the point on the circle to draw the arc to. 
					var x = Math.cos((2 * Math.PI)/(100/value));
					var y = Math.sin((2 * Math.PI)/(100/value));
					
					//should the arc go the long way round?
					var longArc = (value <= 50) ? 0 : 1;
					
					//d is a string that describes the path of the slice.
					var d = "M" + radius + "," + radius + " L" + radius + "," + 0 + ", A" + radius + "," + radius + " 0 " + longArc + ",1 " + (radius + y*radius) + "," + (radius - x*radius) + " z";		
					this.pie.slice.setAttribute('d', d);
				}
				
				//add the slice to the pie.
		        jQuery(this.pie.slice).appendTo(this.pie);
				
				// add the pie to this
				jQuery(this.pie).appendTo(this);
		        
				return this;
			};

			var pieCharts = jQuery('.piechart');

			if(pieCharts.length){
			    pieCharts.easyaspie().addClass('active');
			}

		    jQuery('.barchart').each(function(){
		    	var chart = jQuery(this);
		    	var bar = chart.find('.barchart__progress');
		    	var barWidth = chart.attr('data-value')*1 + '%';
		    	bar.attr('data-value', barWidth);
		    	if(!chart.hasClass('barchart--vertical')){
		    		bar.css('width', barWidth);
		    	}else{
		    		bar.css('height', barWidth);
		    	}

		    });
	  };

	  mr.piecharts = {
	      documentReady : documentReady        
	  };

	  mr.components.documentReady.push(documentReady);
	  return mr;

}(mr, jQuery, window, document));

//////////////// Scroll Reveal
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        
        var $body = jQuery('body');
        if(jQuery('body[data-reveal-selectors]').length){
            window.sr = ScrollReveal();
        	var selectors = $body.attr('data-reveal-selectors');

        	// Gather scroll reveal options
        	var revealTiming = 1000;
        	if(jQuery('body[data-reveal-timing]').length){
        		revealTiming = $body.attr('data-reveal-timing');
        	}

        	// Initialize scroll reveal
        	window.sr.reveal(''+selectors+'', { viewFactor: 0.1, duration: ''+revealTiming+'', scale: 1, mobile: false });

        }

    };

    mr.scrollreveal = {
        documentReady : documentReady
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Sliders Owl
mr = (function (mr, $, window, document){
    "use strict";
    
    mr.slidersOwl = {};

    var documentReady = function($){

        var sliders = [];

        jQuery('.slider').each(function(){
            var candidate = jQuery(this);

            if(candidate.find('ul.slides').length){
                return true;    
            }else{
                var children = [];
                var childCount = candidate.find('>*').length;            
                candidate.children().each(function(index){
                    children.push(jQuery(this).wrap('<li>').parent());
                });
                jQuery('<ul class="slides"></ul>').append(children).appendTo(candidate);
            }
        });

        jQuery('.slider').each(function(index){
            
            var slider = jQuery(this);
            var sliderInitializer = jQuery(this).find('ul.slides');
            var items = 1;
            var arrows = false;
            var paging = false;
            var timing = 7000;
            var loop = false;
            var autoplay = true;
            if(slider.attr('data-arrows') == 'true'){
                arrows = true;
            }else{
                arrows = false;
            }
            if(slider.attr('data-autoplay') == 'false'){
                autoplay = false;
            }else{
                autoplay = true;
            }
            if(slider.attr('data-paging') == 'true' && sliderInitializer.find('li').length > 1){
                paging = true;
            }else{
                paging = false;
            }
            if(slider.attr('data-timing')){
                timing = slider.attr('data-timing');
            }
            if(slider.attr('data-items')){
                items = slider.attr('data-items');
            }
            if(sliderInitializer.find('li').length > 1 && slider.attr('data-loop') != 'false'){
                loop = true;
            }
            sliders.push(sliderInitializer);

            if( 'slide' == wp_data.slider_animation ){
	            sliders[index].owlCarousel({
	                nav: arrows,
	                dots: paging,
	                dotsSpeed: 500,
	                navSpeed: 500,
	                items: items,
	                autoplay: autoplay,
	                autoplayTimeout: timing,
	                navText : false,
	                loop: loop,
	                mouseDrag: false,
	                responsive:{
	                    0:{
	                        items: 1
	                    },
	                    768:{
	                        items: items
	                    }
	                }
	            });
            } else {
				sliders[index].owlCarousel({
				    nav: arrows,
				    animateIn: 'fadeIn',
				    animateOut: 'fadeOut',
				    dots: paging,
				    dotsSpeed: 500,
				    navSpeed: 500,
				    items: items,
				    autoplay: autoplay,
				    autoplayTimeout: timing,
				    navText : false,
				    loop: loop,
				    mouseDrag: false,
				    responsive:{
				        0:{
				            items: 1
				        },
				        768:{
				            items: items
				        }
				    }
				});
            }
            
        });

        mr.slidersOwl.sliders = sliders;
      
    };

    mr.slidersOwl.documentReady = documentReady;

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Smoothscroll
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        // Smooth scroll to inner links
        var innerLinks = jQuery('a.inner-link');

        if(innerLinks.length){
            innerLinks.each(function(){
                var link = jQuery(this);
                var href = link.attr('href');
                if(href.charAt(0) !== "#"){
                    link.removeClass('inner-link');
                }
            });

            var offset = 0;
            if(jQuery('body[data-smooth-scroll-offset]').length){
                offset = jQuery('body').attr('data-smooth-scroll-offset');
                offset = offset*1;
            }
            
            innerLinks.smoothScroll({
              offset: offset,
              speed: 800
            });
        }
    };

    mr.smoothscroll = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Tabs
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        jQuery('.tabs').each(function(){
            var tabs = jQuery(this);
            tabs.after('<ul class="tabs-content">');
            tabs.find('li').each(function(){
                var currentTab = jQuery(this);
                var tabContent = currentTab.find('.tab__content').wrap('<li></li>').parent();
                tabContent.detach();
                currentTab.closest('.tabs-container').find('.tabs-content').append(tabContent);
            });
        });
        
        jQuery('.tabs li').on('click', function(){
            var clickedTab = jQuery(this);
            var tabContainer = clickedTab.closest('.tabs-container');
            var activeIndex = (clickedTab.index()*1)+(1);
            
            tabContainer.find('> .tabs > li').removeClass('active');
            tabContainer.find('> .tabs-content > li').removeClass('active');
            
            clickedTab.addClass('active');
            tabContainer.find('> .tabs-content > li:nth-of-type('+activeIndex+')').addClass('active');
        });
        
        jQuery('.tabs li.active').trigger('click');
    };

    mr.tabs = {
        documentReady : documentReady        
    };

    mr.components.documentReady.push(documentReady);
    return mr;

}(mr, jQuery, window, document));

//////////////// Transitions
jQuery(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});

mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
 		jQuery('.no-page-loader [class*="transition--"]').addClass('transition--active');
    };

    var windowLoad = function(){
        jQuery('[class*="transition--"]').addClass('transition--active');
        jQuery('.pillar-loader').addClass('loader--fade');
    };

    mr.transitions = {
        documentReady : documentReady,
        windowLoad : windowLoad        
    };

    mr.components.documentReady.push(documentReady);
    mr.components.windowLoad.push(windowLoad);
    return mr;

}(mr, jQuery, window, document));

//////////////// Twitter Feeds
mr = (function (mr, $, window, document){
    "use strict";
    
    var documentReady = function($){
        jQuery('.tweets-feed').each(function(index) {
            jQuery(this).attr('id', 'tweets-' + index);
        }).each(function(index) {
            
            if(!( '' == jQuery('#tweets-' + index).attr('data-user-name') || undefined == jQuery('#tweets-' + index).attr('data-user-name') )){

                var TweetConfig = {
                    "profile": {"screenName": jQuery('#tweets-' + index).attr('data-user-name')},
                    "domId": '',
                    "maxTweets": jQuery('#tweets-' + index).attr('data-amount'),
                    "enableLinks": true,
                    "showUser": true,
                    "showTime": true,
                    "dateFunction": '',
                    "showRetweet": false,
                    "customCallback": handleTweets
                };
                
            } else {
            
                var TweetConfig = {
                    "id": jQuery('#tweets-' + index).attr('data-widget-id'),
                    "domId": '',
                    "maxTweets": jQuery('#tweets-' + index).attr('data-amount'),
                    "enableLinks": true,
                    "showUser": true,
                    "showTime": true,
                    "dateFunction": '',
                    "showRetweet": false,
                    "customCallback": handleTweets
                };
            
            }
            
            function handleTweets(tweets) {
                var x = tweets.length;
                var n = 0;
                var element = jQuery('#tweets-' + index);
                var html = '<ul class="slides">';
                while (n < x) {
                    html += '<li>' + tweets[n] + '</li>';
                    n++;
                }
                html += '</ul>';
                element.html(html);
                
                // Initialize twitter feed slider
                if(element.closest('.twitter-feed--slider').length){
                    
                    var slider = element.find('ul.slides');
                    slider.owlCarousel({
                        nav: false,
                        dots: false,
                        items: 1,
                        autoplay: true,
                        autoplayTiming: 5000,
                        center: true,
                        responsive: false
                    });
                     
                    return html;
                }
            }
            twitterFetcher.fetch(TweetConfig);
        });
    };

    mr.twitter = {
        documentReady : documentReady
    };

    mr.components.documentReady.push(documentReady);

    return mr;

}(mr, jQuery, window, document));

//////////////// Video
mr = (function (mr, $, window, document){
    "use strict";
    
	  var documentReady = function($){
	      
			//////////////// Youtube Background
			if(jQuery('.youtube-background').length){
				jQuery('.youtube-background').each(function(){
					var player = jQuery(this);
					var vidURL = jQuery(this).attr('data-video-url');
					var startAt = jQuery(this).attr('data-start-at');
					player.attr('data-property','{videoURL:"'+vidURL+'",containment:"self",autoPlay:true, mute:true, startAt:'+startAt+', opacity:1}');
					player.closest('.videobg').append('<div class="loading-indicator"></div>');
					player.YTPlayer();
					player.on("YTPStart",function(){
				  		player.closest('.videobg').addClass('video-active');
					});	
				});
			}

			if(jQuery('.videobg').find('video').length){
				jQuery('.videobg').find('video').closest('.videobg').addClass('video-active');
			} 

			//////////////// Video Cover Play Icons
			jQuery('.video-cover').each(function(){
			    var videoCover = jQuery(this);
			    if(videoCover.find('iframe').length){
			        videoCover.find('iframe').attr('data-src', videoCover.find('iframe').attr('src'));
			        videoCover.find('iframe').attr('src','');
			    }
			});

			jQuery('.video-cover .video-play-icon').on("click", function(){
			    var playIcon = jQuery(this);
			    var videoCover = playIcon.closest('.video-cover');
			    if(videoCover.find('video').length){
			        var video = videoCover.find('video').get(0);
			        videoCover.addClass('reveal-video');
			        video.play();
			        return false;
			    }else if(videoCover.find('iframe').length){
			        var iframe = videoCover.find('iframe');
			        iframe.attr('src',iframe.attr('data-src'));
			        videoCover.addClass('reveal-video');
			        return false;
			    }
			});
	  };

	  mr.video = {
	      documentReady : documentReady        
	  };

	  mr.components.documentReady.push(documentReady);
	  return mr;

}(mr, jQuery, window, document));