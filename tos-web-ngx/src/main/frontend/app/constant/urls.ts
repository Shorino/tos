const BASE_URL = "http://localhost:50001/tos-rest/";

export const USER_URL = BASE_URL + "user/";
export const USER_LOGIN_URL = USER_URL + "login";
export const USER_SIGNUP_URL = USER_URL + "create";

export const TEA_SESSION_URL = BASE_URL + "tea-session/";
export const TEA_SESSION_GET_ALL_SUMMARY_URL = TEA_SESSION_URL + "get-all-summary";
export const TEA_SESSION_GET_PUBLIC_SUMMARY_URL = TEA_SESSION_URL + "get-public-summary";
export const TEA_SESSION_GET_BY_NAME_URL = TEA_SESSION_URL + "get-by-name";
export const TEA_SESSION_GET_BY_ID_URL = TEA_SESSION_URL + "get/";
export const TEA_SESSION_CREATE_URL = TEA_SESSION_URL + "create";

export const ORDER_URL = BASE_URL + "order/";
export const ORDER_GET_URL = ORDER_URL + "get-all";
export const ORDER_CREATE_URL = ORDER_URL + "create";
export const ORDER_MODIFY_URL = ORDER_URL + "modify/";
export const ORDER_MODIFY_ADMIN_URL = ORDER_URL + "modify-admin/";
export const ORDER_DELETE_URL = ORDER_URL + "delete/";
export const ORDER_DELETE_ADMIN_URL = ORDER_URL + "delete-admin/";