/* ==========================================================================
   SIDEBAR INTERACTION & ACTIVE LINK AUTO-HIGHLIGHT - MEDWORKING (MWK)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Setup Accordion Toggle for Sidebar Level 1 Header items
    const level1Items = document.querySelectorAll('.sidebar .level-1');

    level1Items.forEach(function (header) {
        header.addEventListener('click', function () {
            const menuItem = header.parentElement;
            const level2 = menuItem.querySelector('.level-2');
            const arrow = header.querySelector('.arrow');

            if (level2) {
                if (level2.style.display === 'none') {
                    level2.style.display = 'block';
                    if (arrow) arrow.classList.add('open');
                } else {
                    level2.style.display = 'none';
                    if (arrow) arrow.classList.remove('open');
                }
            }
        });
    });

    // 2. Auto Highlight Active Sidebar Link Based on Current Filename
    const currentPath = window.location.pathname;
    let pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    // Map sub-screens to their parent sidebar link
    const parentMap = {
        'taomoimaulichctvvcm.html': 'taomaulichctvvcm.html',
        'taomoituyenvanchuyen.html': 'cauhinhtuyenvanchuyen.html',
        'chitietlichlamviecctvvcm.html': 'lichlamviecctvvcm.html',
        'taolichlamviecctvvcm.html': 'lichlamviecctvvcm.html',
        'taolichlamviecctvbvpk.html': 'lichlamviecctvbvpk.html'
    };

    if (parentMap[pageName]) {
        pageName = parentMap[pageName];
    }

    if (pageName) {
        const sidebarLinks = document.querySelectorAll('.sidebar .level-3 a');
        sidebarLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href && href.includes(pageName)) {
                // Remove active from all links
                sidebarLinks.forEach(l => l.classList.remove('active'));
                // Set active to this link
                link.classList.add('active');

                // Ensure parent group & level-2 are visible
                let parentLevel2 = link.closest('.level-2');
                if (parentLevel2) {
                    parentLevel2.style.display = 'block';
                    let parentMenuItem = parentLevel2.closest('.menu-item');
                    if (parentMenuItem) {
                        let parentArrow = parentMenuItem.querySelector('.arrow');
                        if (parentArrow) parentArrow.classList.add('open');
                    }
                }
            }
        });
    }
});
