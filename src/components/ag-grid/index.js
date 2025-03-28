import Component from "../";

export default class AgGrid extends Component {
    constructor(container, args = {}) {
        super(container, args);
    }

    async init() {
        super.init();
    }

    get meta() {
        return import.meta;
    }

    get importCSS() {
        return ["./index.css"];
    }
}
