import Store from "./";

class UserStore extends Store {
    get name() {
        return "user";
    }

    get data() {
        return { name: "John Doe", email: "" };
    }
}
export default new UserStore();
