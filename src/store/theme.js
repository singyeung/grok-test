import Store from "./";

class ThemeStore extends Store {
    get name() {
        return "theme";
    }

    get data() {
        return THEME_LIGHT;
    }

    set(value) {
        localStorage.setItem(this.name, value);
    }

    get isPersisted() {
        return true;
    }
}

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_SYSTEM = "system";
export default new ThemeStore();
