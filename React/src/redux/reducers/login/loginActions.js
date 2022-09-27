import { API } from "../../../utils/constantes";
import { POST_Fetch } from "../../../utils/requests";
import { LOGIN_ACTION_TYPES } from "./loginActionTypes";
import store from "../../store";

export default async function authenticate (params) {
    try {
        const tok = await POST_Fetch(API.LOGIN, params);
        store.dispatch(FETCH_LOGIN_SUCCESS(tok));

        return tok;
    } catch (error) {
        return error;
    }
}

const FETCH_LOGIN_SUCCESS = (tok) => ({
    type: LOGIN_ACTION_TYPES.FETCH_LOGIN_SUCCESS,
    payload: { tok }
});