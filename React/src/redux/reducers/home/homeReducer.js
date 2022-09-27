import { HOME_ACTION_TYPES } from "./homeActionTypes";

const INITIAL_STATE = {
    collaboraters: [],
    currentCollaborater : {}
}

function HomeReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case HOME_ACTION_TYPES.FETCH_GET_COLLABORATERS_SUCCESS: {
            return {
                ...state,
                collaboraters: action.payload.collaboraters.data
            }
        }
        case HOME_ACTION_TYPES.ADD_CURRENT_COLLABORATER: {
            return {
                ...state,
                currentCollaborater: action.payload.currentCollaborater
            }
        }
        case HOME_ACTION_TYPES.RESET_COLLABORATERS: {
            return {
                ...state,
                collaboraters: []
            }
        }
        default: {
            return state;
        }
    }
}

export default HomeReducer;