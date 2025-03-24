import Store from "./";

class AppStore extends Store {
    get name() {
        return "app";
    }

    get data() {
        return { [APP_DEBUG]: null };
    }

    get isPersisted() {
        return true;
    }
}

export const APP_DEBUG = "debug";
export default new AppStore();
