import { KTTogglePassword } from "metronic";
import { login } from "/src/services/auth";

import Page from "/src/pages/";
import AuthExpiredModal from "./modal-auth-expired/";

export default class LoginPage extends Page {
    id = "LoginPage";

    username = "";
    password = "";

    valid = false;
    submitting = false;
    errors = { password: null };

    async init() {
        await super.init();
        await this.setChildren({
            AuthExpiredModal: new AuthExpiredModal(this.$refs.AuthExpiredModal),
        });
        this.children.AuthExpiredModal.onHide(() => {
            this.$focus.focus(this.$refs.username);
        });
        const currentLocation = window.router.getCurrentLocation();
        if (currentLocation.params !== null && currentLocation.params.expired) {
            this.children.AuthExpiredModal.show();
        } else {
            this.$focus.focus(this.$refs.username);
        }
    }

    $watchUsername(username) {
        this.username = username.trim();
        this.valid = this.username !== "" && this.password !== "";
    }

    $watchPassword(password) {
        if (password !== "") {
            this.errors.password = null;
        }
        this.valid = this.username !== "" && this.password !== "";
    }

    submit() {
        this.submitting = true;

        login(this.username, this.password).catch((error) => {
            this.submitting = false;
            this.errors.password = error.response?.data?.message ?? error.message;
            this.password = "";
            this.$focus.focus(this.$refs.password);
        });
    }

    reset() {
        this.username = "";
        this.password = "";
        this.submitting = false;
        this.valid = false;
    }

    get meta() {
        return import.meta;
    }

    async terminate() {
        await super.terminate();
        KTTogglePassword.getInstance(this.$refs.togglePassword).destroy();
    }
}
