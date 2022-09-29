const BASE_URL = "http://localhost:50001/tos-rest/";

export const TEA_SESSION_URL = BASE_URL + "tea-session/";
export const TEA_SESSION_GET_ALL_SUMMARY_URL = TEA_SESSION_URL + "get-all-summary";
export const TEA_SESSION_GET_PUBLIC_SUMMARY_URL = TEA_SESSION_URL + "get-public-summary";
export const TEA_SESSION_GET_BY_NAME_URL = TEA_SESSION_URL + "get-by-name";
export const TEA_SESSION_GET_BY_ID_URL = TEA_SESSION_URL + "get/";

export const USER_URL = BASE_URL + "user/";
export const USER_LOGIN_URL = USER_URL + "login";
export const USER_SIGNUP_URL = USER_URL + "create";