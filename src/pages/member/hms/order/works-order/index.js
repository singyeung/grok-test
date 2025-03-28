import Page from "/src/pages/";
import Breadcrumb from "/src/components/@breadcrumb/";
import TwoStepDownloadButton from "/src/components/buttons/2step-download/";
import WorksOrderTable from "./table/";

export default class WorksOrderPage extends Page {
    id = "WorksOrderPage";

    async init() {
        super.init();
        await this.setChildren({
            Breadcrumb: new Breadcrumb(this.$refs.Breadcrumb, [
                { name: "Home", url: "/" },
                { name: "Order", url: null },
                { name: "Works Order", url: null },
            ]),
            DownloadExcelButton: new TwoStepDownloadButton(this.$refs.DownloadExcelButton, {
                className: "btn btn-sm btn-outline btn-success",
                text: "Excel",
                step1: `/api/ha/wo/list/export`,
                step2: `/api/attachment/download_file`,
            }),
            WorksOrderTable: new WorksOrderTable(this.$refs.WorksOrderTable),
        });
    }

    get meta() {
        return import.meta;
    }
}
