import Page from "/src/pages/";
import HeaderFrame from "/src/components/@frame/header/index.js";

export default class MemberPage extends Page {
    id = "MemberPage";

    async init() {
        super.init();
        await this.setChildren({
            Header: new HeaderFrame(this.$refs.HeaderFrame),
        });
    }

    get meta() {
        return import.meta;
    }
}
