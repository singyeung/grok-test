import _ from "lodash";
import Constant from "/constants/";

/**
 * @property {Object} $refs - References to Alpine $refs
 * @property {HTMLElement} $root - References to Alpine $root
 * @property {Object} $focus - References to Alpine $focus
 * @property {Function} $dispatch - References to Alpine $dispatch function
 * @property {Function} $watch - References to Alpine $watch function
 */
export default class AlpineClass {
    id = null;

    children = {};

    constant = Constant();

    _self = this;

    constructor() {}

    init() {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this._self))
            .filter((func) => func.startsWith("$watch"))
            .forEach((func) => {
                const funcName = _.camelCase(func.replace("$watch", ""));
                this.$watch(funcName, this[func].bind(this._self));
            });
    }

    get meta() {
        throw new Error("You must implement the getter 'meta'");
    }

    get importCSS() {
        return [];
    }

    async setChildren(children) {
        for (const [key, child] of Object.entries(children)) {
            this.children[key] = child;
        }
        await Promise.all(Object.values(this.children).map((child) => child.load()));
    }

    async newChild(fileName, $ref) {
        const jsPath = new URL(`./${fileName}/`, this.meta.url).pathname;
        const { default: ChildClass } = await import(`${jsPath}?v=${window.APP_VERSION}`);
        return new ChildClass($ref);
    }

    load() {
        throw new Error("You must implement the function 'load'");
    }

    destroy() {}

    async terminate() {
        await Promise.all(Object.values(this.children).map((child) => child.terminate()));
        this.constant = null;
        this.children = {};
        this._self = null;
    }
}
