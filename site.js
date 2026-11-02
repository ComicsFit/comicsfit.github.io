// Linux visitors get Linux download links and screenshots first.
//
// Elements marked with `data-linux` declare their Linux variant through
// `data-linux-*` attributes:
//   data-linux-text="..."   -> replaces the text content
//   data-linux-hidden       -> hides the element
//   data-linux-<attr>="..." -> sets <attr> (href, src, srcset, alt, class, ...)
(function () {
    var ua = navigator.userAgent;

    // Crawlers render pages on Linux: always show them the default content.
    if (/bot|crawl|spider|slurp|lighthouse|inspectiontool/i.test(ua)) return;

    var isLinux = navigator.userAgentData
        ? navigator.userAgentData.platform === "Linux"
        : /Linux/.test(ua) && !/Android/.test(ua);
    if (!isLinux) return;

    var prefix = "data-linux-";
    document.querySelectorAll("[data-linux]").forEach(function (el) {
        var attrs = Array.prototype.filter.call(el.attributes, function (a) {
            return a.name.indexOf(prefix) === 0;
        });
        attrs.forEach(function (a) {
            var name = a.name.slice(prefix.length);
            if (name === "text") el.textContent = a.value;
            else if (name === "hidden") el.hidden = true;
            else el.setAttribute(name, a.value);
        });
    });
})();
