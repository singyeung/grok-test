import MemberPage from "/src/pages/member/";
import Header from "/src/components/@header/hms/";

export default class HMSPage extends MemberPage {
    id = "HMSPage";

    async init() {
        super.init();
        await this.setChildren({
            Header: new Header(this.$refs.Header),
        });
    }

    get meta() {
        return import.meta;
    }
}
