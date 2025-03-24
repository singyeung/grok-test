import Page from "/src/pages/";

export default class NotFoundPage extends Page {
    id = "NotFoundPage";

    get meta() {
        return import.meta;
    }
}
