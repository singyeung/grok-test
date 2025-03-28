import Component from "/src/components/";
import User from "./user/";
import Menu from "./menu/";

export default class HMSHeader extends Component {
    id = "HMSHeader";

    async init() {
        super.init();
        await this.setChildren({
            User: new User(this.$refs.User),
            Menu: new Menu(this.$refs.Menu),
        });
    }

    get meta() {
        return import.meta;
    }
}
