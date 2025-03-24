import Alpine from "alpinejs";
import Constant from "/constants/";
import initTheme from "/src/themes/";

const script = document.getElementById("app-script");
const scriptUrl = script.getAttribute("src");
const scriptUrlParams = new URLSearchParams(scriptUrl.split("?")[1]);
window.APP_VERSION = scriptUrlParams.get("v");

Alpine.data("app", () => ({
    async init() {
        const system = Constant("system");
        if (!system) {
            alert("No matched constant found.");
            return;
        }
        await initTheme(system);
        await import(`/src/routes/${system}?v=${window.APP_VERSION}`);
    },
}));
