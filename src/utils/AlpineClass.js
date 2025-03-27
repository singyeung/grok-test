import _ from "lodash";
import Constant from "/constants/";
import AppStore from '/src/store/app';
import AuthStore from '/src/store/auth';
import ThemeStore from '/src/store/theme';
import UserStore from '/src/store/user';

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

    store = null;

    _self = this;

    constructor() {
        this.store = {
            app: AppStore.get(),
            auth: AuthStore.get(),
            theme: ThemeStore.get(),
            user: UserStore.get(),
        };
    }

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

    load() {
        throw new Error("You must implement the function 'load'");
    }

    destroy() {}

    async terminate() {
        await Promise.all(Object.values(this.children).map((child) => child.terminate()));
        this.constant = null;
        this.store = null;
        this.children = {};
        this._self = null;
    }
}
