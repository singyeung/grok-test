import Alpine from "/vendors/@shim/alpinejs";
import { loadComponent, loadStyle } from "/src/utils/loader";

import AlpineClass from "/src/utils/AlpineClass";

export default class Component extends AlpineClass {
    container = null;

    args = {};

    constructor(container, args = {}) {
        super();
        this.container = container;
        this.args = args;
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
        this.args = {};
    }
}
