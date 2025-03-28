import Page from "/src/pages/";

export default class CmmsPage extends Page {
    id = "CmmsPage";

    init() {
        super.init();
    }

    get meta() {
        return import.meta;
    }
}
