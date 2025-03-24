import _ from "lodash";

import Component from "../";

export default class CardComponent extends Component {
    id = _.uniqueId("CardComponent");
    title = `Card ${this.id}`;

    async init() {
        super.init();
    }

    toggle() {
        this.title = `Toggled ${this.id}`;
    }

    get meta() {
        return import.meta;
    }

    get importCSS() {
        return ["./index.css"];
    }
}
