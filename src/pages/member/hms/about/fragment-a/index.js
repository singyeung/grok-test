import _ from "lodash";
import { DateTime } from "luxon";

import Component from "/src/components/";

export default class FragmentA extends Component {
    id = _.uniqueId("FragmentA");
    info = "Initial info";
    isActive = false;

    async init() {
        super.init();
        this.info = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
    }

    update() {
        this.info = "Updated info";
    }

    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.info = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
        }
    }

    callParent() {
        this.$dispatch("update-request");
    }

    get meta() {
        return import.meta;
    }
}
