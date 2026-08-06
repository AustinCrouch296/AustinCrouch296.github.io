/*==================== CLIENT-SIDE INCLUDES ====================*/
/* Replaces the inner HTML of any element carrying data-include with the file it
   names. Used for the shared nav and footer (partials/*.html), which were
   previously copy-pasted into all 9 pages and had already drifted apart.

   Design notes, because two of these are load-bearing:

   1. It replaces innerHTML, NOT the element. Each page keeps its own
      <header class="header" id="header"> and <footer class="footer"> wrapper, so
      anything holding a reference to those - navbar-change-color-on-scroll.js
      caches #header on ready - never ends up pointing at a detached node.

   2. The fetch is asynchronous, so the swap lands AFTER the other scripts have
      run. Anything that wires up nav elements must therefore not capture them at
      parse time. main.js uses event delegation on document for exactly this
      reason. If you add nav behaviour, delegate it or listen for the
      'partials:loaded' event below - do not query #nav-toggle once and keep it.

   3. On failure it does nothing at all, leaving the inline fallback markup in
      place. That is the whole point of keeping the fallback: no JS, a failed
      request, or opening the file over file:// all still get a working nav. */
(function () {
    'use strict';

    var targets = document.querySelectorAll('[data-include]');
    if (!targets.length) {
        return;
    }

    var pending = targets.length;

    function settle() {
        pending -= 1;
        if (pending === 0) {
            // Anything that needs the real markup can wait for this.
            document.dispatchEvent(new CustomEvent('partials:loaded'));
        }
    }

    Array.prototype.forEach.call(targets, function (el) {
        var url = el.getAttribute('data-include');

        fetch(url, { credentials: 'same-origin' })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(response.status + ' ' + response.statusText);
                }
                return response.text();
            })
            .then(function (html) {
                el.innerHTML = html;
                el.removeAttribute('data-include');
            })
            .catch(function (error) {
                /* Keep the inline fallback exactly as authored. */
                console.warn('include.js: kept inline fallback for ' + url, error);
            })
            .then(settle, settle);
    });
}());
