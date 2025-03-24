import _ from "lodash";

import Component from "../../";

export default class HeaderFrame extends Component {
    id = _.uniqueId("HeaderFrame");

    async init() {
        // const IconifyIcon = window.customElements.get("iconify-icon");
        // console.log(IconifyIcon );
    }

    get meta() {
        return import.meta;
    }
}
