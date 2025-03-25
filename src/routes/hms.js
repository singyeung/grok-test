import Navigo from "navigo";
import { logout } from "/src/utils/auth";

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

router
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
    .on("/about", () => {
        initMemberPage("hms", "about").catch(Unauthorized);
    })
    .on("/contact", () => {
        initMemberPage("hms", "contact").catch(Unauthorized);
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
