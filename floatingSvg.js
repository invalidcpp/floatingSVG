(function($) {
    'use strict';
    /*
    Parameters:
    options: {
        SVGs: [] // Array of SVG's
        min_speed: 5 // the minimum speed the SVG's move accross the element
        max_speed: 10 // the maximum speed the SVG's move accross the element
        rotation: true // allow the SVG's to rotate
        rotation_min_speed: 5 // the mimimum speed the SVG's rotate 
        rotation_max_speed: 10 // the maximum speed the SVG's rotate
        scaling: false // allow the SVG's to scale randomly
		scale: 0 // The size the SVG increments by
        min_scale: 0 // minimum size the SVG's scale to
        max_scale: 0 // maximum size the SVG's scale to
    }  
    */
   $.floatingSVG = function(element, options) {
       var defaults = {
           SVGs: [],
           min_speed: -2,
           max_speed: 2,
           rotation: false,
           rotation_min_speed: 0,
           rotation_max_speed: 0,
           scaling: true,
           scale: 0.2,
           min_scale: 300,
           max_scale: 700
        }
        var plugin = this;
        
        plugin.settings = {};
        var $element = $(element),
        element = element; 
        
        plugin.init = function(){
            plugin.settings = $.extend({}, defaults, options);
            $element.css("z-index", -1);
            if(plugin.settings.SVGs.length > 0){
                var canvas = $('<canvas/>', {"class": 'floatingSVG-Canvas'});
                $element.append(canvas);
                var canvas = $(".floatingSVG-Canvas").get(0);
                plugin.settings.cw = (canvas.width = window.innerWidth);
                plugin.settings.ch = (canvas.height = window.innerHeight);
                plugin.settings.ctx = canvas.getContext("2d");
                loadImages(plugin.settings.SVGs, function(imgs) {
                    setRandomStartPos(imgs);
                    animate((imgs))
                })
            }
        }

        var setRandomStartPos = function(imgs) {
            for(var src in imgs) {
                imgs[src]["imgWidth"] = imgs[src].img.width;
                imgs[src]["imgHeight"] = imgs[src].img.height;
                imgs[src]["minScale"] = imgs[src].img.width / plugin.settings.scale - 300;
                imgs[src]["maxScale"] = imgs[src].img.width * plugin.settings.scale + 300;
                imgs[src]["x"] = (Math.random() * (window.innerWidth - imgs[src].img.width) + imgs[src].img.width);
                imgs[src]["y"] = (Math.random() * (window.innerHeight - imgs[src].img.height) + imgs[src].img.height);
                if((imgs[src].x + imgs[src].img.width) > window.innerWidth) imgs[src].x = (window.innerWidth / 2) - (imgs[src].img.width / 2);
                if(imgs[src].y + imgs[src].img.height > window.innerHeight) imgs[src].y = (window.innerHeight / 2) - (imgs[src].img.height / 2);
                if(imgs[src].x - imgs[src].img.width < 0) imgs[src].x = (window.innerWidth / 2) - (imgs[src].img.width / 2);
                if(imgs[src].y - imgs[src].img.height < 0) imgs[src].y = (window.innerHeight / 2) - (imgs[src].img.height / 2);
                if(imgs[src]["imgWidth"] > plugin.settings.max_scale) plugin.settings.temp = true;
                else if(imgs[src]["imgWidth"] < plugin.settings.max_scale) plugin.settings.temp = false;
            }
        }

        var animate = function(imgs){
            
            plugin.settings.ctx.clearRect(0, 0, plugin.settings.cw, plugin.settings.ch);
            for(var i = 0; i < imgs.length; i++) {
                if(plugin.settings.scaling) {
                    if(imgs[i]["imgWidth"] == imgs[i]["minScale"]) {
                        plugin.settings.temp = true;
                    }
                    if(imgs[i]["imgWidth"] == imgs[i]["maxScale"]){
                        plugin.settings.temp = false;
                    }
                    if(plugin.settings.temp) {
                        imgs[i]["imgWidth"] -= plugin.settings.scale;
                        imgs[i]["imgHeight"] -= plugin.settings.scale;
                    }else{
                        imgs[i]["imgWidth"] += plugin.settings.scale;
                        imgs[i]["imgHeight"] += plugin.settings.scale;
                    }
                }
                plugin.settings.ctx.drawImage(imgs[i].img, imgs[i].x, imgs[i].y, imgs[i]["imgWidth"], imgs[i]["imgHeight"])
                imgs[i].x += imgs[i].velX;
                imgs[i].y += imgs[i].velY;
                if (imgs[i].x > plugin.settings.cw - imgs[i].img.width + (imgs[i].img.width / 2) || imgs[i].x < 0 - (imgs[i].img.width / 2)) {
                    imgs[i].velX *= -1;
                }
                if (imgs[i].y > plugin.settings.ch - imgs[i].img.height + (imgs[i].img.height / 2) || imgs[i].y < 0 - (imgs[i].img.height / 2)) {
                    imgs[i].velY *= -1;
                }
            }
            setTimeout(function(){
                requestAnimationFrame(animate.bind(animate, imgs));
            }, 1000/60);
        }

        function loadImages(sources, callback) {
            var images = [];
            var items = [];
            var loadedImages = 0;
            var numImages = 0;
            // get num of sources
            for(var src in sources) {
                numImages++;
            }
            for(var src = 0; src < sources.length; src++) {
                images[src] = new Image();
                images[src].onload = function() {
                    if(++loadedImages >= numImages) {
                        callback(items);
                    }
                };
                images[src].src = sources[src];
                items[src] = {};    
                items[src]["img"] = images[src];
                items[src]["velX"] = Math.floor(Math.random() * (plugin.settings.max_speed - plugin.settings.min_speed + 1)) + plugin.settings.min_speed;
                items[src]["velY"] = Math.floor(Math.random() * (plugin.settings.max_speed - plugin.settings.min_speed + 1)) + plugin.settings.min_speed;
                if(items[src]["velX"] == 0) items[src]["velX"] = 1;
                if(items[src]["velY"] == 0) items[src]["velY"] = 1;
            }
        }


        plugin.init();
    }
    $.fn.floatingSVG = function(options) {
        return this.each(function(){
            if(undefined == $(this).data('floatingSVG')) {
                var plugin = new $.floatingSVG(this, options);
                $(this).data('floatingSVG', plugin);
            }
        });
    }
})(jQuery);
