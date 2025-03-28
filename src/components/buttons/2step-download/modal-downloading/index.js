import { KTModal } from "metronic";

import { cancelRequest } from '/src/utils/api/requestManager';

import Component from "/src/components/";

export default class DownloadingModal extends Component {
    id = "DownloadingModal";

    modal = null;

    isShown = false;

    requestKey = null;

    message = null;

    init() {
        super.init();
        this.modal = KTModal.getInstance(this.$root);
    }

    updateRequestKey(requestKey) {
        this.requestKey = requestKey;
    }

    show(requestKey) {
        this.requestKey = requestKey;
        this.isShown = true;
        this.modal.show();
    }

    async hide() {
        await new Promise((resolve) => {
            this.modal.on("hidden", resolve);
            this.modal.hide();
        });
        this.requestKey = null;
        this.isShown = false;
        this.message = null;
    }

    async cancel() {
        if (this.message === null) {
            cancelRequest(this.requestKey);
        } else {
            await this.hide();
        }
    }

    notice(message) {
        this.message = message;
    }

    get meta() {
        return import.meta;
    }

    async terminate() {
        await super.terminate();
        if (this.isShown) {
            await new Promise((resolve) => {
                this.modal.on("hidden", resolve);
                this.modal.hide();
            });
        }
        this.modal.destroy();
        this.modal = null;
    }
}
