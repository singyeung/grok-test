import Store from "./";

class UserStore extends Store {
    get name() {
        return "user";
    }

    set(obj) {
        super.set(NAME, obj[NAME]);
        super.set(USERNAME, obj[USERNAME]);
        super.set(IS_MC, obj[IS_MC]);
        super.set(IS_WORKER, obj[IS_WORKER]);
        super.set(CON_CODE, obj[CON_CODE]);
        super.set(
            RESTRICT_DISTRICT,
            obj[RESTRICT_DISTRICT] !== null ? obj[RESTRICT_DISTRICT].split(",") : null,
        );
        super.set(
            DEFAULT_DISTRICT,
            obj[DEFAULT_DISTRICT] !== null ? obj[DEFAULT_DISTRICT].split(",") : null,
        );
        super.set(PERMISSIONS, Object.keys(obj[PERMISSIONS]));
        super.set(SSO_USERS, obj[SSO_USERS]);
    }

    get data() {
        return {
            [NAME]: null,
            [USERNAME]: null,
            [IS_MC]: null,
            [IS_WORKER]: null,
            [CON_CODE]: null,
            [RESTRICT_DISTRICT]: null,
            [DEFAULT_DISTRICT]: null,
            [PERMISSIONS]: null,
            [SSO_USERS]: null,
        };
    }
}

export const NAME = "name";
export const USERNAME = "username";
export const IS_MC = "is_mc";
export const IS_WORKER = "is_worker";
export const CON_CODE = "con_code";
export const RESTRICT_DISTRICT = "restrict_district";
export const DEFAULT_DISTRICT = "default_district";
export const PERMISSIONS = "permissions";
export const SSO_USERS = "sso_users";

export default new UserStore();
