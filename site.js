// Visitors get download links and screenshots for their operating system.
//
// data-linux-* and data-windows-* attributes provide platform variants.
// The text variant replaces text content, hidden hides the element, and
// other variants set the corresponding HTML attribute.
(function () {
    var ua = navigator.userAgent;

    // Crawlers render pages on Linux: always show them the default content.
    if (/bot|crawl|spider|slurp|lighthouse|inspectiontool/i.test(ua)) return;

    var platform = navigator.userAgentData && navigator.userAgentData.platform;
    var os = platform === "Windows" || (!platform && /Windows NT/.test(ua))
        ? "windows"
        : platform === "Linux" || (!platform && /Linux/.test(ua) && !/Android/.test(ua))
            ? "linux" : null;
    if (!os) return;

    var prefix = "data-" + os + "-";
    document.querySelectorAll("[data-" + os + "]").forEach(function (el) {
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
