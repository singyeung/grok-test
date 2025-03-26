import UserStore, { NAME, EMAIL, USERNAME } from "/src/store/user";
import Component from "/src/components/";

export default class User extends Component {
    id = "User";

    user = null;

    async init() {
        this.user = UserStore.get();
    }

    get meta() {
        return import.meta;
    }
}
