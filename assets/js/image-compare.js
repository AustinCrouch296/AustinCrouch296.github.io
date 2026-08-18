/*==================== BEFORE / AFTER IMAGE COMPARE GALLERY ====================*/
/* A gallery of drag-a-divider comparisons: each slide stacks an "original" and a
   "rebuild" screenshot, and arrows / dots step between slides. Used on the
   OpenTSTO page to put the original game side by side with the rebuild.

   Markup contract (see projects/simpsons-tapped-out.html):

     <div class="compare-gallery" data-compare-gallery>
       <div class="compare" data-compare-slide>          <- one per comparison
         <img class="compare__img compare__img--before" ...>
         <div class="compare__after"><img class="compare__img" ...></div>
         <input type="range" class="compare__range" ...>
         <div class="compare__handle" aria-hidden="true">...</div>
       </div>
       ... more slides ...
       <button class="compare-gallery__nav" data-compare-prev>...</button>
       <button class="compare-gallery__nav" data-compare-next>...</button>
       <div class="compare-gallery__dots" data-compare-dots></div>
       <p data-compare-caption></p>
     </div>

   Design notes, because several of these are load-bearing:

   1. NOT Flickity. Flickity owns horizontal drag, and so does the comparison
      slider - putting one inside the other means every drag is ambiguous.
      Slides are swapped by toggling a class instead, so the only horizontal
      drag on the page belongs to the divider.

   2. Each slide's control IS an <input type="range">. Not a div with mousedown
      handlers. That buys keyboard support (arrows/Home/End), screen-reader
      semantics and touch for free. The range sits invisible over the slide;
      .compare__handle is the visible chrome and is aria-hidden, since the range
      already announces itself.

   3. Divider position is written to a --pos custom property on each slide, and
      CSS does the clipping. JS never touches width/left, so there is one source
      of truth and no layout thrash. Opening a slide recentres its divider to
      50%, so every comparison starts from the same even split rather than
      wherever it was last dragged.

   4. The clipped layer is the ORIGINAL and the base layer is the REBUILD, so
      dragging right wipes the original away to reveal OpenTSTO underneath -
      matching the "Original | OpenTSTO" labels beneath the gallery. The clip
      insets from the right, so the clipped layer shows on the left.

   5. The overlay is clipped, NOT faded. Both images stay fully opaque - a
      cross-fade would make real differences look like blend artefacts, which
      would undermine the whole point of a fidelity comparison.

   6. Maximise is a fixed overlay, NOT the native Fullscreen API - matching how
      the Flickity galleries elsewhere on the site do it (they toggle a class on
      <html> and let CSS do the rest). Same behaviour everywhere, including iOS
      Safari, where the Fullscreen API does not apply to arbitrary elements.

   7. Progressive enhancement: with JS off, every slide renders stacked and the
      images still load. Nothing important is hidden behind a script that might
      not run. The .is-enhanced class (added below) is what collapses the stack
      down to one visible slide. */
(function () {
    'use strict';

    var galleries = document.querySelectorAll('[data-compare-gallery]');
    if (!galleries.length) {
        return;
    }

    Array.prototype.forEach.call(galleries, function (gallery) {
        var slides = gallery.querySelectorAll('[data-compare-slide]');
        if (!slides.length) {
            return;
        }

        var prevBtn = gallery.querySelector('[data-compare-prev]');
        var nextBtn = gallery.querySelector('[data-compare-next]');
        var dotsBox = gallery.querySelector('[data-compare-dots]');
        var caption = gallery.querySelector('[data-compare-caption]');
        var current = 0;
        var dots = [];
        var DEFAULT_POS = 50;

        /* Only now collapse the no-JS stack to a single visible slide. */
        gallery.classList.add('is-enhanced');

        /* ---------- divider behaviour, per slide ---------- */

        function wireSlide(slide) {
            var range = slide.querySelector('.compare__range');
            if (!range) {
                return;
            }

            function apply(value) {
                slide.style.setProperty('--pos', value + '%');
                range.setAttribute('aria-valuetext', Math.round(value) + '% original, ' + Math.round(100 - value) + '% rebuild');
            }

            /* show() calls this to recentre the divider when the slide is
               opened, so every comparison starts from the same 50/50 split. */
            slide.resetDivider = function () {
                range.value = DEFAULT_POS;
                apply(DEFAULT_POS);
            };

            apply(range.value);

            range.addEventListener('input', function () {
                apply(range.value);
            });

            /* Dragging anywhere on the image feels better than only on the
               handle, so forward pointer drags to the range. Pointer events
               cover mouse, touch and pen in one path. */
            var dragging = false;

            function positionFromEvent(event) {
                var rect = slide.getBoundingClientRect();
                if (!rect.width) {
                    return null;
                }
                return Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
            }

            slide.addEventListener('pointerdown', function (event) {
                if (event.target === range) {
                    return;
                }
                var pos = positionFromEvent(event);
                if (pos === null) {
                    return;
                }
                dragging = true;
                slide.classList.add('is-dragging');
                range.value = pos;
                apply(pos);
                if (slide.setPointerCapture) {
                    try {
                        slide.setPointerCapture(event.pointerId);
                    } catch (err) {
                        /* Capture is a nicety - carry on without it. */
                    }
                }
                event.preventDefault();
            });

            slide.addEventListener('pointermove', function (event) {
                if (!dragging) {
                    return;
                }
                var pos = positionFromEvent(event);
                if (pos === null) {
                    return;
                }
                range.value = pos;
                apply(pos);
            });

            function endDrag() {
                if (!dragging) {
                    return;
                }
                dragging = false;
                slide.classList.remove('is-dragging');
            }

            slide.addEventListener('pointerup', endDrag);
            slide.addEventListener('pointercancel', endDrag);
        }

        Array.prototype.forEach.call(slides, wireSlide);

        /* ---------- slide switching ---------- */

        function show(index, moveFocus) {
            current = (index + slides.length) % slides.length;

            Array.prototype.forEach.call(slides, function (slide, i) {
                var active = (i === current);
                slide.classList.toggle('is-active', active);
                /* Recentre on open. A slide that reopens where it was last
                   dragged looks broken - half the comparison is already gone
                   before the viewer has touched anything. */
                if (active && typeof slide.resetDivider === 'function') {
                    slide.resetDivider();
                }
                /* Keep inactive slides out of the tab order and off the
                   accessibility tree - otherwise every hidden range is still
                   focusable and announced. */
                slide.setAttribute('aria-hidden', active ? 'false' : 'true');
                var range = slide.querySelector('.compare__range');
                if (range) {
                    if (active) {
                        range.removeAttribute('tabindex');
                    } else {
                        range.setAttribute('tabindex', '-1');
                    }
                }
            });

            dots.forEach(function (dot, i) {
                var active = (i === current);
                dot.classList.toggle('is-active', active);
                dot.setAttribute('aria-selected', active ? 'true' : 'false');
                dot.setAttribute('tabindex', active ? '0' : '-1');
            });

            if (caption) {
                caption.textContent = slides[current].getAttribute('data-caption') || '';
            }

            if (moveFocus && dots[current]) {
                dots[current].focus();
            }
        }

        /* ---------- dots ---------- */

        if (dotsBox) {
            dotsBox.setAttribute('role', 'tablist');
            dotsBox.setAttribute('aria-label', 'Choose a comparison');

            Array.prototype.forEach.call(slides, function (slide, i) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'compare-gallery__dot';
                dot.setAttribute('role', 'tab');
                dot.setAttribute(
                    'aria-label',
                    slide.getAttribute('data-caption') || ('Comparison ' + (i + 1))
                );
                dot.addEventListener('click', function () {
                    show(i);
                });
                dotsBox.appendChild(dot);
                dots.push(dot);
            });

            /* Left/right arrows move between dots, as a tablist should. */
            dotsBox.addEventListener('keydown', function (event) {
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    show(current + 1, true);
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    show(current - 1, true);
                }
            });
        }

        /* ---------- arrows ---------- */

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                show(current - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                show(current + 1);
            });
        }

        /* ---------- maximise ---------- */

        var fsBtn = gallery.querySelector('[data-compare-fullscreen]');

        if (fsBtn) {
            var fsIcon = fsBtn.querySelector('i');
            var opener = null;

            function setFullscreen(on) {
                gallery.classList.toggle('is-fullscreen', on);
                document.documentElement.classList.toggle('is-compare-fullscreen', on);
                fsBtn.setAttribute(
                    'aria-label',
                    on ? 'Exit the maximised comparison' : 'Maximise the comparison'
                );
                if (fsIcon) {
                    fsIcon.className = on
                        ? 'uil uil-times'
                        : 'uil uil-expand-arrows-alt';
                }
                /* Recentre on entering and leaving: the slide's box changes
                   size, and a divider left off-centre reads as a broken
                   comparison at the new scale. */
                var active = gallery.querySelector('.compare.is-active');
                if (active && typeof active.resetDivider === 'function') {
                    active.resetDivider();
                }
            }

            fsBtn.addEventListener('click', function () {
                var going = !gallery.classList.contains('is-fullscreen');
                if (going) {
                    opener = document.activeElement;
                }
                setFullscreen(going);
                if (!going && opener && typeof opener.focus === 'function') {
                    opener.focus();
                    opener = null;
                }
            });

            document.addEventListener('keydown', function (event) {
                if (event.key !== 'Escape') {
                    return;
                }
                if (!gallery.classList.contains('is-fullscreen')) {
                    return;
                }
                event.preventDefault();
                setFullscreen(false);
                if (opener && typeof opener.focus === 'function') {
                    opener.focus();
                    opener = null;
                }
            });
        }

        /* A single slide needs no chrome. */
        if (slides.length < 2) {
            if (prevBtn) { prevBtn.hidden = true; }
            if (nextBtn) { nextBtn.hidden = true; }
            if (dotsBox) { dotsBox.hidden = true; }
        }

        show(0);
    });
}());
