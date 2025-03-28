import { THEME_DARK } from "/src/store/theme";
import Component from "/src/components/";

export default class User extends Component {
    id = "User";

    isDark = null;

    constructor(props) {
        super(props);
        this.isDark = this.store.theme === THEME_DARK;
    }

    get meta() {
        return import.meta;
    }
}
