// Renders TIMELINE_EVENTS (js/timeline-data.js) into:
//   - the homepage universe (#timelineStrip / #tlCanvas)
//   - the /music performance log (#performanceLog)
// Node positions on the universe are computed automatically from array order.

(function () {
    var events = window.TIMELINE_EVENTS || [];

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var COLORED_BADGES = { livecoding: 'badge--livecoding', ai: 'badge--ai', newmedia: 'badge--newmedia' };

    function hasFullDate(ev) {
        return /^\d{4}-\d{2}-\d{2}$/.test(ev.date);
    }

    function hasMonthDate(ev) {
        return /^\d{4}-\d{2}$/.test(ev.date);
    }

    function isUpcoming(ev) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (hasFullDate(ev)) {
            return new Date(ev.date + 'T00:00:00') >= today;
        }
        if (hasMonthDate(ev)) {
            var nowYm = today.getFullYear() * 100 + (today.getMonth() + 1);
            var p = ev.date.split('-');
            var evYm = parseInt(p[0], 10) * 100 + parseInt(p[1], 10);
            return evYm >= nowYm;
        }
        return false;
    }

    // '2026-07-09' → '09.07.2026'; '2026-08' → '08.2026'; '2026' → '2026'
    function universeDate(ev) {
        if (hasFullDate(ev)) {
            var p = ev.date.split('-');
            return p[2] + '.' + p[1] + '.' + p[0];
        }
        if (hasMonthDate(ev)) {
            var m = ev.date.split('-');
            return m[1] + '.' + m[0];
        }
        return ev.date;
    }

    // '2026-07-09' → 'Jul 09, 2026'; '2026-08' → 'Aug 2026'; '2026' → '2026'
    function logDate(ev) {
        if (hasFullDate(ev)) {
            var p = ev.date.split('-');
            return MONTHS[parseInt(p[1], 10) - 1] + ' ' + p[2] + ', ' + p[0];
        }
        if (hasMonthDate(ev)) {
            var m = ev.date.split('-');
            return MONTHS[parseInt(m[1], 10) - 1] + ' ' + m[0];
        }
        return ev.date;
    }

    // Coordinate-style date for NEXT list: '08/26'
    function upnextDate(ev) {
        if (hasFullDate(ev) || hasMonthDate(ev)) {
            var p = ev.date.split('-');
            return p[1] + '/' + p[0].slice(2);
        }
        return ev.date;
    }

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    /* ---------------- Homepage universe ---------------- */

    var Y_PATTERN = [16, 54, 10, 58, 26, 54, 14, 52, 10, 42, 56, 24];

    // Horizontal distance between two neighbours =
    //   the left node's own width (so it can never overlap the next) + GUTTER,
    //   plus a compressed amount based on the time between their dates.
    var GUTTER = 30;            // min clear space after a node before the next marker
    var DATE_K = 22;           // px added per doubling of the weeks between two events
    var DATE_MAX_EXTRA = 120;  // cap, so a multi-year gap never runs off forever
    var TITLE_MARGIN = 90;     // clear space after the intro title before the first node
    var CANVAS_TAIL = 90;      // slack after the last node

    // 'major' | 'normal' | 'minor'; journal notes default to minor
    function importanceOf(ev) {
        return ev.importance || (ev.type === 'journal' ? 'minor' : 'normal');
    }

    function imagesOf(ev) {
        if (ev.images && ev.images.length) return ev.images.slice(0, 3);
        return ev.image ? [ev.image] : [];
    }

    // Day number for date diffing; month-precision anchors to the 1st;
    // year-only dates anchor to Jan 1.
    function eventDays(ev) {
        var d = ev.date || '';
        var ms;
        if (/^\d{4}-\d{2}-\d{2}$/.test(d)) ms = Date.parse(d + 'T00:00:00Z');
        else if (/^\d{4}-\d{2}$/.test(d)) {
            var p = d.split('-');
            ms = Date.UTC(parseInt(p[0], 10), parseInt(p[1], 10) - 1, 1);
        } else if (/^\d{4}$/.test(d)) ms = Date.UTC(parseInt(d, 10), 0, 1);
        else ms = Date.parse(d);
        return isNaN(ms) ? 0 : ms / 86400000;
    }

    // Extra spacing from the time between two events — compressed (log) and capped,
    // so a year reads as "further" than a week without being 52x as far.
    function dateExtra(a, b) {
        var weeks = Math.abs(eventDays(a) - eventDays(b)) / 7;
        return Math.min(DATE_MAX_EXTRA, Math.round(DATE_K * Math.log2(1 + weeks)));
    }

    function nodeY(i, ev) {
        var y = Y_PATTERN[i % Y_PATTERN.length];
        // Taller nodes (thumbnails, major size) stay clear of the bottom edge
        var maxY = 100;
        if (imagesOf(ev).length) maxY = 54;
        if (importanceOf(ev) === 'major') maxY = 44;
        return Math.min(y, maxY);
    }

    function buildNode(ev) {
        var isLink = !!ev.link;
        var node = el(isLink ? 'a' : 'div', 'tl-node tl-node--' + (ev._coming ? 'live' : ev.type));
        var imp = importanceOf(ev);
        if (imp !== 'normal') node.classList.add('tl-node--' + imp);
        if (isLink) {
            node.href = ev.link;
            if (/^https?:/.test(ev.link)) {
                node.target = '_blank';
                node.rel = 'noopener noreferrer';
            }
        }
        if (isUpcoming(ev) && !ev._coming) {
            node.classList.add('tl-node--upcoming');
            node.appendChild(el('span', 'tl-node__flag', 'upcoming'));
        }
        if (ev._coming) {
            node.classList.add('tl-node--upcoming', 'tl-node--coming');
        }

        var marker = el('span', 'tl-node__marker');
        marker.setAttribute('aria-hidden', 'true');
        marker.appendChild(el('span', 'tl-node__cross', '+'));
        node.appendChild(marker);

        if (ev._coming) {
            node.appendChild(el('span', 'tl-node__title', 'coming next'));
            if (ev._upnext && ev._upnext.length) {
                var list = el('ul', 'tl-node__upnext');
                ev._upnext.forEach(function (item, i) {
                    var row = el('li', 'tl-node__upnext-item tl-node__upnext-item--n' + i +
                        (item.tentative ? ' tl-node__upnext-item--tentative' : ''));
                    var parts = [upnextDate(item), item.title];
                    if (item.city) parts.push(item.city);
                    row.appendChild(el('span', 'tl-node__upnext-coords', parts.join(' - ')));
                    if (item.tentative) {
                        row.appendChild(document.createTextNode(' '));
                        row.appendChild(el('span', 'tl-node__upnext-hope', '[tbc]'));
                    }
                    list.appendChild(row);
                });
                node.appendChild(list);
            }
        } else {
            var label = universeDate(ev) + (ev.city ? ' · ' + ev.city : '');
            node.appendChild(el('span', 'tl-node__label', label));
            node.appendChild(el('span', 'tl-node__title', ev.title));
        }

        var imgs = imagesOf(ev);
        if (imgs.length) {
            var stack = el('span', 'tl-node__mediastack');
            if (ev.imageRatio) {
                stack.classList.add('tl-node__mediastack--ratio');
                // Derive height from --media-w so abspos images still get a sized box
                // (aspect-ratio alone is unreliable when all children are absolute).
                var parts = String(ev.imageRatio).split('/');
                var rw = parseFloat(parts[0], 10);
                var rh = parseFloat(parts[1], 10);
                if (rw > 0 && rh > 0) {
                    stack.style.height = 'calc(var(--media-w) * ' + (rh / rw) + ')';
                }
            }
            imgs.forEach(function (src) {
                var img = el('img', 'tl-node__media' + (ev.imageFit === 'contain' ? ' tl-node__media--contain' : ''));
                img.src = src;
                img.alt = ev.title;
                stack.appendChild(img);
            });
            node.appendChild(stack);
        }
        if (ev.chip) {
            node.appendChild(el('span', 'tl-node__mediachip', ev.chip));
        }
        return node;
    }

    // Soonest-first upcoming events (full-date and month-precision).
    function upcomingSorted() {
        return events.filter(isUpcoming).slice().sort(function (a, b) {
            return eventDays(a) - eventDays(b);
        });
    }

    // First node sits under the intro title (NEXT placeholder + upcoming list).
    // Rest of the timeline starts past the title’s right edge, connected by the polyline.
    // Month-precision events stay off the strip — they only feed the NEXT list /music.
    var COMING_Y = 62;

    function initUniverse() {
        var strip = document.getElementById('timelineStrip');
        var canvas = document.getElementById('tlCanvas');
        var svg = document.getElementById('tlSvg');
        if (!strip || !canvas || !svg) return;

        var head = {
            type: 'live',
            date: '',
            title: 'coming next',
            importance: 'normal',
            _coming: true,
            _upnext: upcomingSorted().slice(0, 3)
        };
        var rest = events.filter(function (ev) { return !hasMonthDate(ev); });
        var universeEvents = [head].concat(rest);

        var nodes = universeEvents.map(buildNode);
        nodes.forEach(function (n) { canvas.appendChild(n); });

        function layout() {
            var vw = window.innerWidth;
            var widths = nodes.map(function (n) { return n.offsetWidth || 200; });

            var titleEl = document.getElementById('universeTitle');
            var titleW = titleEl ? titleEl.getBoundingClientRect().width : Math.min(vw * 0.8, 700);
            // Center the first node under the title; trail starts just past the title edge.
            var x0 = Math.round(vw / 2 - widths[0] / 2);
            var startX = Math.round(vw / 2 + titleW / 2 + TITLE_MARGIN);

            var xs = [x0];
            for (var i = 1; i < universeEvents.length; i++) {
                if (i === 1) {
                    xs.push(Math.max(startX, x0 + widths[0] + GUTTER));
                } else {
                    var gap = widths[i - 1] + GUTTER + dateExtra(universeEvents[i - 1], universeEvents[i]);
                    xs.push(xs[i - 1] + Math.round(gap));
                }
            }

            nodes.forEach(function (n, i) {
                n.style.setProperty('--x', xs[i] + 'px');
                n.style.setProperty('--y', (i === 0 ? COMING_Y : nodeY(i - 1, universeEvents[i])) + '%');
            });
            canvas.style.width = (xs[xs.length - 1] + widths[widths.length - 1] + CANVAS_TAIL) + 'px';
            drawLines();
        }

        function drawLines() {
            var stripRect = strip.getBoundingClientRect();
            svg.setAttribute('width', canvas.scrollWidth);
            svg.setAttribute('height', strip.clientHeight);
            svg.style.width = canvas.scrollWidth + 'px';
            var points = Array.prototype.map.call(strip.querySelectorAll('.tl-node__marker'), function (m) {
                var r = m.getBoundingClientRect();
                var x = r.left + r.width / 2 - stripRect.left + strip.scrollLeft;
                var y = r.top + r.height / 2 - stripRect.top;
                return x + ',' + y;
            });
            svg.innerHTML = '<polyline points="' + points.join(' ') +
                '" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>';
        }

        layout();
        window.addEventListener('resize', layout);
        window.addEventListener('load', drawLines);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLines);

        // --- shared scroll state: one writer, one animation slot ---
        // Native scrollLeft clamps at [0, max]; iOS-style overscroll is kept as a
        // logical `overshoot` and rendered with resistance via a canvas translate.
        var reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var animRaf = null;
        var overshoot = 0;

        function maxScroll() { return strip.scrollWidth - strip.clientWidth; }

        function cancelAnimation() {
            if (animRaf) { cancelAnimationFrame(animRaf); animRaf = null; }
        }

        function renderOvershoot() {
            if (overshoot) {
                var visual = overshoot / (1 + Math.abs(overshoot) / 150);
                canvas.style.transform = 'translateX(' + (-visual) + 'px)';
            } else {
                canvas.style.transform = '';
            }
        }

        function setScroll(pos, allowOverscroll) {
            var clamped = Math.max(0, Math.min(maxScroll(), pos));
            strip.scrollLeft = clamped;
            overshoot = allowOverscroll ? pos - clamped : 0;
            renderOvershoot();
        }

        function springBack() {
            var start = overshoot;
            if (!start) return;
            cancelAnimation();
            var t0 = performance.now();
            var DURATION = 250;
            animRaf = requestAnimationFrame(function frame(now) {
                var t = Math.min(1, (now - t0) / DURATION);
                overshoot = start * Math.pow(1 - t, 3);
                if (t >= 1) { overshoot = 0; animRaf = null; }
                else animRaf = requestAnimationFrame(frame);
                renderOvershoot();
            });
        }

        // Momentum ran into an edge: swell to a resisted peak, then spring home.
        function bounce(peak) {
            cancelAnimation();
            var t0 = performance.now();
            var OUT = 100, BACK = 250;
            animRaf = requestAnimationFrame(function frame(now) {
                var elapsed = now - t0;
                if (elapsed < OUT) {
                    overshoot = peak * (elapsed / OUT);
                } else if (elapsed < OUT + BACK) {
                    overshoot = peak * Math.pow(1 - (elapsed - OUT) / BACK, 3);
                } else {
                    overshoot = 0;
                    renderOvershoot();
                    animRaf = null;
                    return;
                }
                renderOvershoot();
                animRaf = requestAnimationFrame(frame);
            });
        }

        // Free glide after a flick (velocity in scrollLeft px/ms).
        function startGlide(v) {
            cancelAnimation();
            var pos = strip.scrollLeft;
            var last = performance.now();
            animRaf = requestAnimationFrame(function frame(now) {
                var dt = Math.min(50, Math.max(1, now - last));
                last = now;
                pos += v * dt;
                v *= Math.pow(0.95, dt / 16);
                var max = maxScroll();
                if (pos <= 0 && v < 0) {
                    strip.scrollLeft = 0;
                    bounce(Math.max(-120, v * 60));
                    return;
                }
                if (pos >= max && v > 0) {
                    strip.scrollLeft = max;
                    bounce(Math.min(120, v * 60));
                    return;
                }
                strip.scrollLeft = pos;
                if (Math.abs(v) < 0.02) { animRaf = null; return; }
                animRaf = requestAnimationFrame(frame);
            });
        }

        var step = 400;
        document.getElementById('tlPrev').addEventListener('click', function () {
            cancelAnimation();
            setScroll(strip.scrollLeft, false);
            strip.scrollBy({ left: -step, behavior: 'smooth' });
        });
        document.getElementById('tlNext').addEventListener('click', function () {
            cancelAnimation();
            setScroll(strip.scrollLeft, false);
            strip.scrollBy({ left: step, behavior: 'smooth' });
        });

        // The title stays put; fade it (and the swipe hint) once the user starts exploring
        var hint = document.getElementById('universeHint');
        var title = document.getElementById('universeTitle');
        strip.addEventListener('scroll', function () {
            var exploring = strip.scrollLeft > 40;
            if (hint) hint.style.opacity = exploring ? '0' : '';
            if (title) title.classList.toggle('is-hidden', exploring);
        }, { passive: true });

        // Vertical wheel/trackpad drives the strip horizontally (down → into timeline).
        // On the viewport-locked homepage, capture on window so header/chrome still work.
        window.addEventListener('wheel', function (e) {
            if (e.ctrlKey) return; // leave pinch-zoom to the browser
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
            var max = maxScroll();
            if (max <= 0) return;
            var nextScroll = Math.max(0, Math.min(max, strip.scrollLeft + e.deltaY));
            if (nextScroll === strip.scrollLeft && !overshoot && !animRaf) return;
            cancelAnimation();
            setScroll(nextScroll, false);
            e.preventDefault();
        }, { passive: false });

        // Drag-to-scroll with the mouse
        var dragging = false, dragMoved = false, startX = 0, startScroll = 0;
        strip.addEventListener('mousedown', function (e) {
            cancelAnimation();
            setScroll(strip.scrollLeft, false);
            dragging = true;
            dragMoved = false;
            startX = e.pageX;
            startScroll = strip.scrollLeft;
            strip.classList.add('is-dragging');
        });
        window.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            var dx = e.pageX - startX;
            if (Math.abs(dx) > 5) dragMoved = true;
            strip.scrollLeft = startScroll - dx;
        });
        window.addEventListener('mouseup', function () {
            dragging = false;
            strip.classList.remove('is-dragging');
        });

        // iOS Safari: nested overflow-x often fails when the page is viewport-locked.
        // Drive scrollLeft from touch so swipe works even when native pan does not.
        var touchDragging = false;
        var touchStartX = 0;
        var touchStartY = 0;
        var touchStartScroll = 0;
        var touchAxis = null; // 'x' | 'y' | null until decided
        var touchLastPos = 0;
        var touchLastTime = 0;
        var touchVelocity = 0; // scrollLeft px/ms
        strip.addEventListener('touchstart', function (e) {
            if (e.touches.length !== 1) return;
            cancelAnimation();
            touchDragging = true;
            touchAxis = null;
            dragMoved = false;
            touchStartX = e.touches[0].pageX;
            touchStartY = e.touches[0].pageY;
            // Fold any mid-bounce overshoot into the start so the finger
            // picks the strip up without a jump.
            touchStartScroll = strip.scrollLeft + overshoot;
            touchLastTime = 0;
            touchVelocity = 0;
        }, { passive: true });
        strip.addEventListener('touchmove', function (e) {
            if (!touchDragging || e.touches.length !== 1) return;
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            var dx = x - touchStartX;
            var dy = y - touchStartY;
            if (!touchAxis) {
                if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
                touchAxis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
            }
            // Horizontal swipes pan directly; vertical swipes mirror the desktop
            // wheel mapping (swipe up = scroll deeper into the timeline).
            var pos = touchAxis === 'x' ? x : y;
            var now = e.timeStamp || performance.now();
            if (touchLastTime) {
                var dt = now - touchLastTime;
                if (dt > 0) {
                    touchVelocity = 0.8 * ((touchLastPos - pos) / dt) + 0.2 * touchVelocity;
                }
            }
            touchLastPos = pos;
            touchLastTime = now;
            var delta = touchAxis === 'x' ? dx : dy;
            dragMoved = true;
            setScroll(touchStartScroll - delta, true);
            e.preventDefault();
        }, { passive: false });
        function touchRelease(e) {
            if (!touchDragging) return;
            touchDragging = false;
            touchAxis = null;
            // A finger that rested before lifting shouldn't fling.
            var stale = !touchLastTime ||
                ((e.timeStamp || performance.now()) - touchLastTime) > 80;
            if (overshoot) {
                springBack();
            } else if (!stale && !reduceMotion && Math.abs(touchVelocity) > 0.3) {
                startGlide(touchVelocity);
            }
        }
        strip.addEventListener('touchend', touchRelease, { passive: true });
        strip.addEventListener('touchcancel', touchRelease, { passive: true });

        // Suppress node clicks that were actually drags
        strip.addEventListener('click', function (e) {
            if (dragMoved) {
                e.preventDefault();
                dragMoved = false;
            }
        }, true);
    }

    /* ---------------- /music performance log ---------------- */

    function buildRow(ev, upcoming) {
        var card = el('div', 'card card--blog-row' + (upcoming ? ' card--event-upcoming' : ''));

        var meta = el('div', 'card-meta');
        meta.appendChild(el('small', 'card-date', logDate(ev)));
        if (ev.city) meta.appendChild(el('small', 'card-date', ev.city));
        card.appendChild(meta);

        var body = el('div', 'card-body');
        if (upcoming) body.appendChild(el('span', 'card-status card-status--next', 'upcoming'));

        var title = el('h3', 'card-title');
        if (ev.link) {
            var a = el('a', null, ev.title);
            a.href = ev.link;
            if (/^https?:/.test(ev.link)) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            title.appendChild(a);
        } else {
            title.textContent = ev.title;
        }
        body.appendChild(title);

        if (ev.description) {
            body.appendChild(el('p', 'card-description', ev.description));
        } else if (upcoming && (ev.tentative || hasMonthDate(ev))) {
            body.appendChild(el('p', 'card-description', 'More details soon.'));
        }

        var badges = el('div', 'card-badges');
        if (ev.venue) badges.appendChild(el('span', 'badge', ev.venue));
        (ev.badges || []).forEach(function (b) {
            var cls = COLORED_BADGES[b] ? 'badge badge--thread ' + COLORED_BADGES[b] : 'badge';
            badges.appendChild(el('span', cls, b));
        });
        if (badges.children.length) body.appendChild(badges);

        card.appendChild(body);
        return card;
    }

    function initPerformanceLog() {
        var root = document.getElementById('performanceLog');
        if (!root) return;

        var live = events.filter(function (ev) { return ev.type === 'live'; });
        var upcoming = live.filter(isUpcoming);
        var past = live.filter(function (ev) { return !isUpcoming(ev); });

        if (upcoming.length) {
            root.appendChild(el('h3', 'performance-group__heading', 'Upcoming'));
            var upGrid = el('div', 'grid grid--rows');
            upcoming.forEach(function (ev) { upGrid.appendChild(buildRow(ev, true)); });
            root.appendChild(upGrid);
        }

        root.appendChild(el('h3', 'performance-group__heading', 'Past'));
        var pastGrid = el('div', 'grid grid--rows');
        past.forEach(function (ev) { pastGrid.appendChild(buildRow(ev, false)); });
        root.appendChild(pastGrid);
    }

    initUniverse();
    initPerformanceLog();
})();
