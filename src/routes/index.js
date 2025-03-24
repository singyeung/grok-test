import { isAuthenticated } from "/src/utils/auth";

let currentPageClass = null;

async function initErrorPage(pageName) {
    const { default: page } = await import(`/src/pages/error/${pageName}/`);
    if (currentPageClass !== null) {
        currentPageClass.terminate();
    }
    currentPageClass = new page();
    await currentPageClass.load("app");
}

async function initGuestPage(pageName) {
    if (isAuthenticated()) throw new Error("member");
    const { default: page } = await import(`/src/pages/guest/${pageName}/`);
    if (currentPageClass !== null) {
        currentPageClass.terminate();
    }
    currentPageClass = new page();
    await currentPageClass.load("app");
}

let memberPage = null;
async function initMemberPage(system, pageName) {
    if (!isAuthenticated()) throw new Error("guest");
    if (!memberPage) {
        const { default: MemberPage } = await import(`/src/pages/member/`);
        memberPage = new MemberPage();
        await memberPage.load("app");
    }
    const { default: page } = await import(`/src/pages/member/${system}/${pageName}/`);
    if (currentPageClass !== null) {
        currentPageClass.terminate();
    }
    currentPageClass = new page();
    await currentPageClass.load("member-container");
}

export { initErrorPage, initGuestPage, initMemberPage };
