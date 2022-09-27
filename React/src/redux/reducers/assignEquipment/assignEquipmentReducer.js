import { ASSIGN_EQUIPMENT_ACTION_TYPES } from "./assignEquipmentActionTypes";

const INITIAL_STATE = {
    assignEquipments: [],
    currentAssignEquipment : {},
    oldIdEquipment: 0
}

function AssignEquipmentReducer(state = INITIAL_STATE, action)
{
    switch(action.type) {
        case ASSIGN_EQUIPMENT_ACTION_TYPES.FETCH_GET_ASSIGN_EQUIPMENT_SUCCESS: {
            return {
                ...state,
                assignEquipments: action.payload.assignEquipments.data
            }
        }
        case ASSIGN_EQUIPMENT_ACTION_TYPES.ADD_CURRENT_ASSIGN_EQUIPMENT: {
            return {
                ...state,
                currentAssignEquipment: action.payload.currentAssignEquipment
            }
        }
        case ASSIGN_EQUIPMENT_ACTION_TYPES.RESET_ASSIGN_EQUIPMENT: {
            return {
                ...state,
                assignEquipments: []
            }
        }
        default: {
            return state;
        }
    }
}

export default AssignEquipmentReducer;