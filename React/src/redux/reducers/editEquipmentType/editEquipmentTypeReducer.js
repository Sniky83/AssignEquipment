import { EDIT_EQUIPMENT_TYPE_ACTION_TYPES } from "./editEquipmentTypeActionTypes";

const INITIAL_STATE = {
    equipmentTypes: [],
    currentEquipmentType : {}
}

function EditEquipmentTypeReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case EDIT_EQUIPMENT_TYPE_ACTION_TYPES.FETCH_GET_EQUIPMENT_TYPES_SUCCESS: {
            return {
                ...state,
                equipmentTypes: action.payload.equipmentTypes.data
            }
        }
        case EDIT_EQUIPMENT_TYPE_ACTION_TYPES.ADD_CURRENT_EQUIPMENT_TYPE: {
            return {
                ...state,
                currentEquipmentType: action.payload.currentEquipmentType
            }
        }
        case EDIT_EQUIPMENT_TYPE_ACTION_TYPES.RESET_EQUIPMENT_TYPE: {
            return {
                ...state,
                equipmentTypes: []
            }
        }
        default: {
            return state;
        }
    }
}

export default EditEquipmentTypeReducer;