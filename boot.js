const { default: importMap } = await import(`/importmap.json?v=${window.APP_VERSION}`, {
    with: { type: "json" },
});

document.head.appendChild(
    Object.assign(document.createElement("script"), {
        type: "importmap-shim",
        innerHTML: JSON.stringify(importMap),
    }),
);

document.head.appendChild(
    Object.assign(document.createElement("script"), {
        type: "module-shim",
        src: `/src/app.js?v=${window.APP_VERSION}`,
    }),
);
