import Alpine from "alpinejs";
import { cancelPendingRequests } from "/src/utils/api/";
import { loadPage, loadStyle } from "/src/utils/loader";

import AlpineElement from "/src/utils/AlpineElement";

export default class Page extends AlpineElement {
    async load(target) {
        if (!this.id) {
            throw new Error("You must set a unique ID for this page");
        }
        Alpine.data(this.id, () => this);
        await Promise.all([
            loadPage(new URL("./index.html", this.meta.url).pathname, target),
            ...this.importCSS.map((cssPath) => loadStyle(new URL(cssPath, this.meta.url).pathname)),
        ]);
        return target;
    }

    async terminate() {
        cancelPendingRequests();
        await super.terminate();
    }
}
