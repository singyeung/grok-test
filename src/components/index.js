import Alpine from "/vendors/@shim/alpinejs";
import { loadComponent, loadStyle } from "/src/utils/loader";

import AlpineElement from "/src/utils/AlpineElement";

export default class Component extends AlpineElement {
    container = null;

    params = {};

    constructor(container, params = {}) {
        super();
        this.container = container;
        this.params = params;
    }

    async load() {
        if (!this.id) {
            throw new Error("You must set a unique ID for this component");
        }
        if (!this.container) {
            throw new Error("You must set a container for this component");
        }
        Alpine.data(this.id, () => this);

        const [component] = await Promise.all([
            loadComponent(new URL("./index.html", this.meta.url).pathname, this.container, {
                id: this.id,
            }),
            ...this.importCSS.map((cssPath) => loadStyle(new URL(cssPath, this.meta.url).pathname)),
        ]);

        return component;
    }

    async terminate() {
        await super.terminate();
        this.container = null;
    }
}
