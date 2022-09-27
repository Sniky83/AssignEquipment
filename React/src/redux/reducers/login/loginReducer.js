import { LOGIN_ACTION_TYPES } from "./loginActionTypes";

const INITIAL_STATE = {
    token: "",
    isConnected: false
}

function LoginReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case LOGIN_ACTION_TYPES.FETCH_LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.payload.tok.data.token,
                isConnected: true
            }
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;