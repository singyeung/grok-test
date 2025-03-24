import Alpine from "alpinejs";
import Constant from "/constants/";
import initTheme from "/src/themes/";

Alpine.data("app", () => ({
    async init() {
        const system = Constant("system");
        if (!system) {
            alert("No matched constant found.");
            return;
        }
        await initTheme(system);
        await import(`/src/routes/${system}`);
    },
}));
