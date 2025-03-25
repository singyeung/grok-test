import { get } from "/src/utils/api/";
import UserStore from "/src/store/user";

import Page from "/src/pages/";

export default class MemberPage extends Page {
    async load(target) {
        await get("/api/me")
            .then((me) => {
                UserStore.set(me);
            })
            .catch(() => {
                window.location.href = "/login?expired=1";
            });
        return super.load(target);
    }
}
