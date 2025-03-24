import { KTTogglePassword } from "metronic";
import { get } from "/src/utils/api/";

import Page from "/src/pages/";
import SuccessModal from "./modal-success/";

export default class ResetPasswordPage extends Page {
    id = "ResetPasswordPage";

    username = "";
    password = "";
    confirmPassword = "";

    valid = false;
    submitting = false;
    errors = { password: null, confirmPassword: null };

    async init() {
        super.init();
        this.username = "Testing";
        await this.setChildren({
            SuccessModal: new SuccessModal(this.$refs.SuccessModal),
        });
    }

    $watchPassword(password) {
        this.valid =
            this.password !== "" &&
            this.confirmPassword !== "" &&
            this.password === this.confirmPassword;
    }

    $watchConfirmPassword(confirmPassword) {
        this.errors.confirmPassword =
            confirmPassword !== "" && this.password !== confirmPassword
                ? "Passwords do not match"
                : null;

        this.valid =
            this.password !== "" &&
            this.confirmPassword !== "" &&
            this.password === this.confirmPassword;
    }

    submit() {
        this.submitting = true;
        get(`https://jsonplaceholder.typicode.com/users/3`, {})
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
        this.password = "";
        this.confirmPassword = "";
        this.submitting = false;
        this.valid = false;
    }

    get meta() {
        return import.meta;
    }

    terminate() {
        super.terminate();
        KTTogglePassword.getInstance(this.$refs.togglePassword).destroy();
        KTTogglePassword.getInstance(this.$refs.toggleConfirmPassword).destroy();
    }
}
