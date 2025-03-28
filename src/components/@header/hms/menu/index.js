import Component from "/src/components/";
import Boards from "./boards/";
import Order from "./order/";

export default class Menu extends Component {
    id = "Menu";

    async init() {
        await super.init();
        await this.setChildren({
            Boards: new Boards(this.$refs.Boards),
            Order: new Order(this.$refs.Order),
        });
    }

    get meta() {
        return import.meta;
    }
}
