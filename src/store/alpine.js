import Store from "./";

class AlpineStore extends Store {
    get name() {
        return "alpine";
    }

    get data() {
        return {};
    }
}

export default new AlpineStore();
