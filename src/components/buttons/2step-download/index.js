import { post, get } from "/src/utils/api/";

import Component from "/src/components/";
import DownloadingModal from "./modal-downloading/";

export default class TwoStepDownloadButton extends Component {
    id = "TwoStepDownloadButton";

    constructor(container, params = {}) {
        if (!params.step1) {
            throw new Error("`step1` is required for TwoStepDownloadButton");
        }
        if (!params.step2) {
            throw new Error("`step2` is required for TwoStepDownloadButton");
        }
        params.className = params.className ?? "btn btn-outline btn-success";
        params.text = params.text ?? "Download";
        super(container, params);
    }

    async init() {
        super.init();
        await this.setChildren({
            DownloadingModal: new DownloadingModal(this.$refs.DownloadingModal),
        });
    }

    download() {
        post(this.params.step1, {}, {}, ({ isFetching, requestKey }) => {
            if (!isFetching) return;
            this.children.DownloadingModal.show(requestKey);
        })
            .then((filename) =>
                get(
                    `${this.params.step2}/${filename}`,
                    {
                        responseType: "blob",
                    },
                    ({ isFetching, requestKey, isSuccess, data, headers }) => {
                        if (isFetching) {
                            this.children.DownloadingModal.updateRequestKey(requestKey);
                            return;
                        }
                        if (!isSuccess) return;
                        const filename = headers
                            .get("content-disposition")
                            .replace(/.*filename=["']?([^"';]+)["']?.*/g, "$1");
                        const url = window.URL.createObjectURL(data);
                        const a = document.createElement("a");
                        a.style.display = "none";
                        a.href = url;
                        a.download = filename;
                        this.$root.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        a.remove();
                        this.children.DownloadingModal.notice(`Downloaded: ${filename}`);
                    },
                ),
            )
            .catch((error) => {
                if (error.code === "ERR_CANCELED") {
                    return this.children.DownloadingModal.hide();
                } else {
                    this.children.DownloadingModal.notice(error.response.data ?? error.message);
                }
            });
    }

    get meta() {
        return import.meta;
    }
}
