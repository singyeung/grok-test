import AppStore, { APP_DEBUG } from "/src/store/app";
import TMC111 from "./TMC111.json" with { type: "json" };
import TMC044 from "./TMC044.json" with { type: "json" };

const constants = [TMC111, TMC044];

const domainMatchedConstant = constants.find(
    (constant) => constant.matched_domains.indexOf(window.location.origin) !== -1,
);

const developmentMatchedConstant = constants.find(
    (constant) => AppStore.get(APP_DEBUG) === constant.project_code,
);

export default (key = null) => {
    const constant = developmentMatchedConstant ?? domainMatchedConstant;
    return constant && key ? constant[key] : constant;
};
