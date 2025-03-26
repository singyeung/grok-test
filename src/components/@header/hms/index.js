import Component from "/src/components/";
import User from './user/';

export default class HMSHeader extends Component {
    id = "HMSHeader";

    async init() {
        await super.init();
        await this.setChildren({
            User: new User(this.$refs.User)
        })
    }

    get meta() {
        return import.meta;
    }
}
