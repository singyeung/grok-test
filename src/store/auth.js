import Store from "./";

class AuthStore extends Store {
    get name() {
        return "auth";
    }

    get data() {
        return { access_token: null, refresh_token: null };
    }

    get isPersisted() {
        return true;
    }
}

export const ACCESS_TOKEN = 'access_token';

export const REFRESH_TOKEN = 'refresh_token';

export default new AuthStore();
