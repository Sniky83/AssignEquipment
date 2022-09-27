import { EDIT_COLLABORATER_ACTION_TYPES } from "./editCollaboraterActionTypes";

const INITIAL_STATE = {
    collaboraters: [],
    currentCollaborater: {}
}

function EditCollaboraterReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case EDIT_COLLABORATER_ACTION_TYPES.FETCH_GET_COLLABORATERS_SUCCESS: {
            return {
                ...state,
                collaboraters: action.payload.collaboraters.data
            }
        }
        case EDIT_COLLABORATER_ACTION_TYPES.ADD_CURRENT_COLLABORATER: {
            return {
                ...state,
                currentCollaborater: action.payload.currentCollaborater
            }
        }
        case EDIT_COLLABORATER_ACTION_TYPES.RESET_COLLABORATERS: {
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

export default EditCollaboraterReducer;