import { get } from "/src/utils/api/";

import Page from "/src/pages/";
import SuccessModal from "./modal-success/";

export default class ForgotPasswordPage extends Page {
    id = "ForgotPasswordPage";

    username = "";

    valid = false;
    submitting = false;
    errors = { username: null };

    async init() {
        super.init();
        await this.setChildren({
            SuccessModal: new SuccessModal(this.$refs.SuccessModal),
        });
    }

    $watchUsername(username) {
        this.username = username.trim();
        this.valid = this.username !== "";
    }

    submit() {
        this.submitting = true;
        get(`https://jsonplaceholder.typicode.com/users/1`, {})
            .then(() => {
                this.reset();
                this.children.SuccessModal.show();
            })
            .catch((error) => {
                this.errors.username = error.message;
            })
            .finally(() => {
                this.submitting = false;
            });
    }

    reset() {
        this.username = "";
        this.submitting = false;
        this.valid = false;
    }

    get meta() {
        return import.meta;
    }
}
