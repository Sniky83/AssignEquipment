import { EDIT_EQUIPMENT_ACTION_TYPES } from "./editEquipmentActionTypes";

const INITIAL_STATE = {
    equipments: [],
    currentEquipment : {}
}

function EditEquipmentReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case EDIT_EQUIPMENT_ACTION_TYPES.FETCH_GET_EQUIPMENTS_SUCCESS: {
            return {
                ...state,
                equipments: action.payload.equipments.data
            }
        }
        case EDIT_EQUIPMENT_ACTION_TYPES.ADD_CURRENT_EQUIPMENT: {
            return {
                ...state,
                currentEquipment: action.payload.currentEquipment
            }
        }
        case EDIT_EQUIPMENT_ACTION_TYPES.RESET_EQUIPMENTS: {
            return {
                ...state,
                equipments: []
            }
        }
        default: {
            return state;
        }
    }
}

export default EditEquipmentReducer;