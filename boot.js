// load before-theme css
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `/index.css?v=${window.APP_VERSION}`;
document.head.appendChild(link);

// load importmap
const { default: importMapJson } = await import(`/importmap.json?v=${window.APP_VERSION}`, {
    with: { type: "json" },
});

const importMap = document.createElement("script");
importMap.type = "importmap-shim";
importMap.innerHTML = JSON.stringify(importMapJson);
document.head.appendChild(importMap);

// register importmap
window.esmsInitOptions = {
    shimMode: true,
    fetch: (url, options) => {
        const connector = url.indexOf("?") !== -1 ? "&" : "?";
        return fetch(`${url}${connector}v=${window.APP_VERSION}`, options);
    },
};
const esModuleShims = document.createElement("script");
esModuleShims.src = `/node_modules/es-module-shims/dist/es-module-shims?v=${window.APP_VERSION}`;
esModuleShims.async = true;
document.head.appendChild(esModuleShims);

// start app
const app = document.createElement("script");
app.src = `/src/app.js?v=${window.APP_VERSION}`;
app.type = "module-shim";
document.head.appendChild(app);
