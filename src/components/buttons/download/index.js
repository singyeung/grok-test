import { post, get } from "/src/utils/api/";

import Component from "/src/components/";
import DownloadingModal from "./modal-downloading/";

export default class DownloadButton extends Component {
    id = "DownloadButton";

    constructor(container, params = {}) {
        if (!params.url) {
            throw new Error("`url` is required for DownloadButton");
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
        get(
            this.params.url,
            {
                responseType: "blob",
            },
            ({ isFetching, requestKey, isSuccess, data, headers }) => {
                if (isFetching) {
                    this.children.DownloadingModal.show(requestKey);
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
        ).catch((error) => {
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
