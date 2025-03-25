import MemberPage from "/src/pages/member/";

export default class HMSPage extends MemberPage {
    id = "HMSPage";

    async init() {
        super.init();
        await this.setChildren({
            Header: await this.newChild(
                "/src/components/@frame/header/",
                this.$refs.Header,
            )
        });
    }

    get meta() {
        return import.meta;
    }
}
