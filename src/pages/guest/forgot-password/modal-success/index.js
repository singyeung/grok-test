import { KTModal } from "metronic";

import Component from "/src/components/";

export default class ForgotPasswordSuccessModal extends Component {
    id = "ForgotPasswordSuccessModal";

    modal = null;

    async init() {
        super.init();
        this.modal = KTModal.getInstance(this.$root);
    }

    show() {
        this.modal.show();
    }

    get meta() {
        return import.meta;
    }

    terminate() {
        super.terminate();
        this.modal.hide();
        this.modal.destroy();
        this.modal = null;
    }
}
