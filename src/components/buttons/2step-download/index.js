import { post } from "/src/utils/api/";

import DownloadButton from "../download/";

export default class TwoStepDownloadButton extends DownloadButton {
    id = "TwoStepDownloadButton";

    constructor(container, params = {}) {
        if (!params.step1) {
            throw new Error("`step1` is required for TwoStepDownloadButton");
        }
        if (!params.step2) {
            throw new Error("`step2` is required for TwoStepDownloadButton");
        }
        params.url = "/";
        super(container, params);
    }

    download() {
        post(this.params.step1, {}, {}, ({ isFetching, requestKey, isSuccess, data }) => {
            if (!isFetching) return;
            this.children.DownloadingModal.show(requestKey);
        })
            .then((filename) => {
                this.params.url = `${this.params.step2}/${filename}`;
                super.download();
            })
            .catch((error) => {
                if (error.code === "ERR_CANCELED") {
                    return this.children.DownloadingModal.hide();
                } else {
                    this.children.DownloadingModal.notice(error.response.data ?? error.message);
                }
            });
    }
}
