(function() {
    function injectVersionStyles() {
        if (document.getElementById('appVersionStyles')) return;
        var style = document.createElement('style');
        style.id = 'appVersionStyles';
        style.textContent =
            '.app-version.app-version-live {' +
                'display:none !important;' +
            '}' +
            '.publish-version-badge {' +
                'position:fixed;' +
                'right:14px;' +
                'bottom:14px;' +
                'z-index:9999;' +
                'display:inline-flex;' +
                'align-items:center;' +
                'gap:6px;' +
                'padding:6px 10px;' +
                'border-radius:999px;' +
                'background:rgba(255,255,255,0.88);' +
                'border:1px solid rgba(0,0,0,0.08);' +
                'box-shadow:0 6px 18px rgba(0,0,0,0.08);' +
                'backdrop-filter:blur(8px);' +
                'color:#7b766f;' +
                'font-family:Montserrat, Arial, sans-serif;' +
                'font-size:10px;' +
                'line-height:1;' +
                'letter-spacing:0.03em;' +
            '}' +
            '.publish-version-badge .publish-version-dot {' +
                'width:6px;' +
                'height:6px;' +
                'border-radius:50%;' +
                'background:#57c08d;' +
                'flex:0 0 auto;' +
            '}' +
            '.publish-version-badge .publish-version-number {' +
                'font-weight:700;' +
                'color:#66615b;' +
            '}' +
            '@media (max-width: 768px) {' +
                '.publish-version-badge {' +
                    'right:10px;' +
                    'bottom:10px;' +
                    'padding:5px 8px;' +
                    'font-size:9px;' +
                '}' +
            '}' +
            '@media print {' +
                '.publish-version-badge {' +
                    'display:none !important;' +
                '}' +
            '}';
        document.head.appendChild(style);
    }

    function formatDisplayDate(value) {
        if (!value) return '';
        var date = new Date(value);
        if (isNaN(date.getTime())) return '';
        var pad = function(num) { return String(num).padStart(2, '0'); };
        return pad(date.getDate()) + '-' + pad(date.getMonth() + 1) + '-' + date.getFullYear() + ' ' +
            pad(date.getHours()) + ':' + pad(date.getMinutes());
    }

    function renderVersion(meta) {
        var nodes = document.querySelectorAll('.app-version');
        if (!nodes.length || !meta || !meta.version) return;

        injectVersionStyles();

        var versionText = 'v' + meta.version;
        var publishedText = meta.publishedAtDisplay || formatDisplayDate(meta.publishedAt);

        nodes.forEach(function(node) {
            node.classList.add('app-version-live');
            node.textContent = versionText;
            node.title = publishedText ? ('Última publicación: ' + publishedText) : 'Sin fecha de publicación';
        });

        var existingBadge = document.getElementById('publishVersionBadge');
        if (existingBadge) existingBadge.remove();

        var badge = document.createElement('div');
        badge.id = 'publishVersionBadge';
        badge.className = 'publish-version-badge';
        badge.title = publishedText ? ('Última publicación: ' + publishedText) : 'Sin fecha de publicación';
        badge.setAttribute('aria-label', badge.title);
        badge.innerHTML =
            '<span class="publish-version-dot"></span>' +
            '<span class="publish-version-number">' + versionText + '</span>';
        document.body.appendChild(badge);
    }

    function renderFallbackVersion() {
        var node = document.querySelector('.app-version');
        if (!node) return;
        var rawText = (node.textContent || '').trim();
        var normalized = rawText.replace(/^V\./i, '').trim() || '1.0.0';
        renderVersion({
            version: normalized,
            publishedAt: '',
            publishedAtDisplay: ''
        });
    }

    function loadVersionMeta() {
        fetch('version.json?v=' + Date.now(), { cache: 'no-store' })
            .then(function(response) {
                if (!response.ok) throw new Error('No se pudo cargar version.json');
                return response.json();
            })
            .then(renderVersion)
            .catch(function() {
                // Fallback para apertura directa del HTML sin servidor.
                renderFallbackVersion();
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadVersionMeta);
    } else {
        loadVersionMeta();
    }
})();
