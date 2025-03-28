import Navigo from "navigo";
import Alpine from "alpinejs";
import { logout } from "/src/services/auth";

import { initErrorPage, initGuestPage, initMemberPage } from "./";

const router = new Navigo("/", { hash: false });

const Unauthorized = (error) => {
    if (error.message !== "guest") throw error;
    window.location.href = "/login";
};

const AutoRedirect = (error) => {
    if (error.message !== "member") throw error;
    window.location.href = "/";
};

router.reactive = Alpine.reactive({ url: "" });

router
    .hooks({
        after: (match) => {
            router.reactive.url = match.url;
        },
    })
    // guest
    .on("/login", () => {
        initGuestPage("login").catch(AutoRedirect);
    })
    .on("/forgot-password", () => {
        initGuestPage("forgot-password").catch(AutoRedirect);
    })
    .on("reset-password", () => {
        initGuestPage("reset-password").catch(AutoRedirect);
    })
    // member
    .on("/", () => {
        initMemberPage("hms", "home").catch(Unauthorized);
    })
    .on("/works-order", () => {
        initMemberPage("hms", "order/works-order").catch(Unauthorized);
    })
    .on("/cmms", () => {
        initMemberPage("hms", "order/cmms").catch(Unauthorized);
    })
    // others
    .on("/logout", () => {
        logout();
        window.location.href = "/login";
    })
    .notFound(() => {
        initErrorPage("404");
    })
    .resolve();

window.router = router;
