const BASE_URL = "http://localhost:50001/tos-rest/";

export const USER_URL = BASE_URL + "user/";
export const USER_LOGIN_URL = USER_URL + "login";
export const USER_SIGNUP_URL = USER_URL + "create";
export const USER_ENABLE_URL = USER_URL + "enable";
export const USER_DELETE_URL = USER_URL + "delete";
export const USER_GET_ALL_URL = USER_URL + "get-all";
export const USER_CHANGE_PASSWORD_URL = USER_URL + "change-password";

export const TEA_SESSION_URL = BASE_URL + "tea-session/";
export const TEA_SESSION_GET_ALL_SUMMARY_URL = TEA_SESSION_URL + "get-all-summary";
export const TEA_SESSION_GET_BY_NAME_URL = TEA_SESSION_URL + "get-by-name";
export const TEA_SESSION_GET_BY_ID_URL = TEA_SESSION_URL + "get/";
export const TEA_SESSION_CREATE_URL = TEA_SESSION_URL + "create";
export const TEA_SESSION_MODIFY_URL = TEA_SESSION_URL + "modify/";
export const TEA_SESSION_MODIFY_ADMIN_URL = TEA_SESSION_URL + "modify-admin/";
export const TEA_SESSION_MODIFY_PASSWORD_URL = TEA_SESSION_URL + "modify-password/";
export const TEA_SESSION_MODIFY_PASSWORD_ADMIN_URL = TEA_SESSION_URL + "modify-password-admin/";
export const TEA_SESSION_DELETE_URL = TEA_SESSION_URL + "delete/";
export const TEA_SESSION_DELETE_ADMIN_URL = TEA_SESSION_URL + "delete-admin/";

export const ORDER_URL = BASE_URL + "order/";
export const ORDER_GET_URL = ORDER_URL + "get-all";
export const ORDER_CREATE_URL = ORDER_URL + "create";
export const ORDER_MODIFY_URL = ORDER_URL + "modify/";
export const ORDER_MODIFY_ADMIN_URL = ORDER_URL + "modify-admin/";
export const ORDER_DELETE_URL = ORDER_URL + "delete/";
export const ORDER_DELETE_ADMIN_URL = ORDER_URL + "delete-admin/";