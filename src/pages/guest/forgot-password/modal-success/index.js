import { KTModal } from "metronic";

import Component from "/src/components/";

export default class ForgotPasswordSuccessModal extends Component {
    id = "ForgotPasswordSuccessModal";

    modal = null;

    isShown = false;

    init() {
        super.init();
        this.modal = KTModal.getInstance(this.$el);
    }

    show() {
        this.isShown = true;
        this.modal.show();
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
