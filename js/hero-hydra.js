(function() {
    function initHeroHydra() {
        const heroBg = document.querySelector('.hero-bg');
        const canvas = document.getElementById('hero-hydra');
        if (!heroBg || !canvas) return;

        if (typeof Hydra === 'undefined') {
            heroBg.classList.add('hydra-fallback');
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            heroBg.classList.add('hydra-fallback');
            return;
        }

        const container = canvas.parentElement;
        function setCanvasSize() {
            var w = container.offsetWidth;
            var h = container.offsetHeight;
            if (w < 1) w = 1280;
            if (h < 1) h = 720;
            canvas.width = w;
            canvas.height = h;
            return { width: w, height: h };
        }

        var dims = setCanvasSize();
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        var hydra;
        try {
            hydra = new Hydra({
                canvas: canvas,
                width: dims.width,
                height: dims.height,
                detectAudio: false,
                autoLoop: true,
                precision: isMobile ? 'mediump' : undefined
            });
        } catch (e) {
            heroBg.classList.add('hydra-fallback');
            return;
        }

        var imagesReady = false;
        var loadedImgs = [];
        var perf1 = ['images/performance-1.1.jpg', 'images/performance-1.2.jpg', 'images/performance-1.3.jpg'];
        var perf2 = ['images/performance-2.1.jpeg', 'images/performance-2.2.jpg'];
        var allUrls = [perf1[0], perf1[1], perf1[2], perf2[0], perf2[1]];
        var slides = [[0, 1, 2, 3], [1, 2, 3, 4]];
        var slideIndex = 0;
        var ROTATE_MS = 2500;

        function loadSlideByIndices(indices) {
            if (loadedImgs.length < 4) return;
            try {
                s0.init({ src: loadedImgs[indices[0]] });
                s1.init({ src: loadedImgs[indices[1]] });
                s2.init({ src: loadedImgs[indices[2]] });
                s3.init({ src: loadedImgs[indices[3]] });
                return true;
            } catch (e) {
                return false;
            }
        }

        function preload(cb) {
            var pending = allUrls.length;
            allUrls.forEach(function(url, i) {
                var img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function() { loadedImgs[i] = img; pending--; if (pending === 0) cb(); };
                img.onerror = function() { pending--; if (pending === 0) cb(); };
                img.src = url;
            });
        }

        preload(function() {
            imagesReady = loadedImgs.length >= 4;
            if (imagesReady) {
                loadSlideByIndices(slides[0]);
                runSketch();
            }
        });

        function runSketch() {
            try {
                if (imagesReady) {
                    var imagesLayer = src(s0)
                        .blend(src(s1).scale(1.06).rotate(0.08), 0.4)
                        .blend(src(s2).scale(0.98).rotate(-0.04), 0.35)
                        .blend(src(s3).scale(1.02).rotate(0.03), 0.35);
                    var colorOverlay = osc(4, 0.08, 1.2)
                        .rotate(function() { return 0.1 + time * 0.08; })
                        .kaleid(6)
                        .hue(0.66)
                        .blend(noise(2, 0.1).rotate(function() { return -0.05 - time * 0.03; }).hue(0.66), 0.2);
                    imagesLayer.blend(colorOverlay, 0.4).out();
                } else {
                    osc(4, 0.1, 1.2).out();
                }
            } catch (e) {
                try {
                    osc(4, 0.1, 1.2).out();
                } catch (e2) {
                    heroBg.classList.add('hydra-fallback');
                }
            }
        }

        setInterval(function() {
            if (!imagesReady || loadedImgs.length < 4) return;
            slideIndex = (slideIndex + 1) % slides.length;
            loadSlideByIndices(slides[slideIndex]);
        }, ROTATE_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroHydra);
    } else {
        initHeroHydra();
    }

    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            var canvas = document.getElementById('hero-hydra');
            var container = canvas && canvas.parentElement;
            if (canvas && container) {
                var w = container.offsetWidth;
                var h = container.offsetHeight;
                if (w > 0 && h > 0) {
                    canvas.width = w;
                    canvas.height = h;
                }
            }
        }, 150);
    });
})();
