import { isAuthenticated } from "/src/utils/auth";
import { PatiencePromise } from "/src/utils/promise";

let currentPageClass = null;
let memberPage = null;

async function terminalCurrentPage() {
    if (currentPageClass === null) return;
    await PatiencePromise(currentPageClass.terminate(), {
        delay: 500,
        callback: () => console.log("!!! Terminate page seems stuck !!!"),
    });
    return true;
}

async function initErrorPage(pageName) {
    const { default: page } = await import(`/src/pages/error/${pageName}/`);
    await terminalCurrentPage();
    currentPageClass = new page();
    await currentPageClass.load("app");
}

async function initGuestPage(pageName) {
    if (isAuthenticated()) throw new Error("member");
    const { default: page } = await import(`/src/pages/guest/${pageName}/`);
    await terminalCurrentPage();
    currentPageClass = new page();
    await currentPageClass.load("app");
}

async function initMemberPage(system, pageName) {
    if (!isAuthenticated()) throw new Error("guest");
    if (!memberPage) {
        const { default: MemberPage } = await import(`/src/pages/member/${system}/`);
        memberPage = new MemberPage();
        await memberPage.load("app");
    }
    const { default: page } = await import(`/src/pages/member/${system}/${pageName}/`);
    await terminalCurrentPage();
    currentPageClass = new page();
    await currentPageClass.load(`${system}-container`);
}

export { initErrorPage, initGuestPage, initMemberPage };
