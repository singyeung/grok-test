import _ from "lodash";

import Component from "../";

export default class ModalComponent extends Component {
    id = _.uniqueId("ModalComponent");
    isOpen = false;
    content = null;

    async init() {
        super.init();
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    setContent(content) {
        this.content = content;
    }

    get meta() {
        return import.meta;
    }

    async terminate() {
        await super.terminate();
        this.content = null;
    }
}
