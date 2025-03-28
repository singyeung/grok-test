import Alpine from "alpinejs";
import Constant from "/constants/";
import initTheme from "./themes/";

Alpine.data("app", () => ({
    frameClasses: "",

    ready: false,

    async init() {
        const system = Constant("system");
        if (!system) {
            alert("No matched constant found.");
            return;
        }
        this.frameClasses = Constant("app_frame_class");
        await initTheme(system);
        await import(`./routes/${system}`);
        this.ready = true;
    },
}));
