import { FONCTIONS_ACTION_TYPES } from "./commonActionTypes";

const INITIAL_STATE = {
    fonctions: []
}

function CommonReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case FONCTIONS_ACTION_TYPES.FETCH_GET_FONCTIONS_SUCCESS: {
            return {
                ...state,
                fonctions: action.payload.fonctions.data
            }
        }
        default: {
            return state;
        }
    }
}

export default CommonReducer;