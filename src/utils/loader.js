import Alpine from "alpinejs";
import { KTDom, KTComponents } from "metronic";

import { htmlCache } from "/src/utils/cache.js";

async function fetchHtmlContent(htmlPath) {
    let htmlContent;
    if (htmlCache[htmlPath]) {
        htmlContent = htmlCache[htmlPath];
    } else {
        const response = await fetch(htmlPath, {
            headers: { Accept: "text/html" },
        });
        htmlContent = await response.text();
        htmlCache[htmlPath] = htmlContent;
    }
    return htmlContent;
}

export async function loadPage(htmlPath, target) {
    const element = document.getElementById(target);
    element.innerHTML = await fetchHtmlContent(htmlPath);
    Alpine.initTree(element);
    window.router.updatePageLinks();
    KTDom.ready(() => {
        KTComponents.init();
    });
}

export async function loadComponent(htmlPath, target, options = {}) {
    const htmlContent = await fetchHtmlContent(htmlPath);
    const targetElement = typeof target === "string" ? document.getElementById(target) : target;
    let finalHtml = htmlContent;
    if (options.id) finalHtml = finalHtml.replace(/\[\[id]]/g, options.id);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = finalHtml;
    const newElement = tempDiv.firstElementChild;
    targetElement.replaceWith(newElement);
    Alpine.initTree(newElement);
    window.router.updatePageLinks();
    KTDom.ready(() => {
        KTComponents.init();
    });
    return newElement;
}

export async function loadStyle(cssPath) {
    if (document.querySelector(`[data-path="${cssPath}"]`)) {
        return;
    }
    const styleTag = document.createElement("style");
    styleTag.type = "text/tailwindcss";
    styleTag.dataset.path = cssPath;
    document.head.appendChild(styleTag);
    const response = await fetch(cssPath, {
        headers: { Accept: "text/css" },
    });
    styleTag.textContent = await response.text();
}
