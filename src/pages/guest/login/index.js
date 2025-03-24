import { KTTogglePassword } from "metronic";
import { login } from "/src/utils/auth";

import Page from "/src/pages/";

export default class LoginPage extends Page {
    id = "LoginPage";

    username = "";
    password = "";

    valid = false;
    submitting = false;
    errors = { password: null };

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
            this.errors.password = error.message;
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
