import { get } from "/src/utils/api/";
import { logout } from "/src/utils/auth";
import UserStore from "/src/store/user";

import Page from "/src/pages/";

export default class MemberPage extends Page {
    user = {};

    async load(target) {
        await get("/api/me")
            .then((me) => {
                UserStore.set(me);
                this.user = UserStore.get();
            })
            .catch(() => {
                logout();
                window.location.href = "/login?expired=1";
            });

        return super.load(target);
    }

    async terminate() {
        await super.terminate();
        this.user = null;
    }
}
