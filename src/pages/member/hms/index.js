import MemberPage from "/src/pages/member/";
import Header from "/src/components/@header/hms/";
import Footer from "/src/components/@footer/";

export default class HMSPage extends MemberPage {
    id = "HMSPage";

    async init() {
        super.init();
        await this.setChildren({
            Header: new Header(this.$refs.Header),
            Footer: new Footer(this.$refs.Footer),
        });
    }

    get meta() {
        return import.meta;
    }
}
