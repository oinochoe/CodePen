var _abyss = (function(abyss) {
    'use strict';

    var _lazyloadImages = document.querySelectorAll('.lazy');

    var init = function() {
        lazyLoad();
    };

    var lazyLoad = function() {
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy');
                        imageObserver.unobserve(image);
                    }
                });
            });

            _lazyloadImages.forEach(function(image) {
                imageObserver.observe(image);
            });

        } else { // IE
            document.addEventListener('DOMContentLoaded', function() {
                var lazyloadThrottleTimeout;

                var lazyImage = function() {
                    if (lazyloadThrottleTimeout) {
                        clearTimeout(lazyloadThrottleTimeout);
                    };

                    lazyloadThrottleTimeout = setTimeout(function() {
                        var scrollTop = window.pageYOffset;

                        for (let i = 0; i < _lazyloadImages.length; i++) {
                            if (_lazyloadImages[i].offsetTop < window.innerHeight + scrollTop) {
                                _lazyloadImages[i].src = _lazyloadImages[i].dataset.src;
                                _lazyloadImages[i].classList.remove('lazy');
                            }
                        }

                        if (_lazyloadImages.length == 0) {
                             document.removeEventListener('scroll', lazyImage);
                             window.removeEventListener('resize', lazyImage);
                             window.removeEventListener('orientationchange', lazyImage);
                        }
                    }, 20);
                }
                 document.addEventListener('scroll', lazyImage);
                 window.addEventListener('resize', lazyImage);
                 window.addEventListener('orientationchange', lazyImage);
            });
        }
    };

    init();

    return abyss;
})(window._abyss || {});
