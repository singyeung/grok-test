import { KTModal } from "metronic";

import Component from "/src/components/";

export default class AuthExpiredModal extends Component {
    id = "AuthExpiredModal";

    modal = null;

    isShown = false;

    onHideCallback = () => {};

    init() {
        super.init();
        this.modal = KTModal.getInstance(this.$el);
    }

    show() {
        this.isShown = true;
        this.modal.show();
    }

    hide() {
        this.isShown = false;
        this.modal.hide();
        this.onHideCallback();
    }

    onHide(callback) {
        this.onHideCallback = callback;
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
