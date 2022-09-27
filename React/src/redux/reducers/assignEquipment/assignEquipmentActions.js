import { API } from "../../../utils/constantes";
import { GET_Fetch } from "../../../utils/requests";
import { ASSIGN_EQUIPMENT_ACTION_TYPES } from "./assignEquipmentActionTypes";
import store from "../../store";

export default async function getAssignEquipments(params = null) {
    try {
        let assignEquipments = null;

        if(params === null) {
            assignEquipments = await GET_Fetch(API.ASSIGN_EQUIPMENT);
        }
        else {
            assignEquipments = await GET_Fetch(API.ASSIGN_EQUIPMENT_FILTERS, params);
        }

        store.dispatch(FETCH_GET_ASSIGN_EQUIPMENT_SUCCESS(assignEquipments));
        
        return assignEquipments;
    } catch (error) {
        store.dispatch(RESET_ASSIGN_EQUIPMENT());

        return error;
    }
}

const FETCH_GET_ASSIGN_EQUIPMENT_SUCCESS = (assignEquipments) => ({
    type: ASSIGN_EQUIPMENT_ACTION_TYPES.FETCH_GET_ASSIGN_EQUIPMENT_SUCCESS,
    payload: { assignEquipments }
});

const RESET_ASSIGN_EQUIPMENT = () => ({
    type: ASSIGN_EQUIPMENT_ACTION_TYPES.RESET_ASSIGN_EQUIPMENT
});


export function addCurrentAssignEquipment(currentAssignEquipment) {
    return store.dispatch(ADD_CURRENT_ASSIGN_EQUIPMENT(currentAssignEquipment));
}

const ADD_CURRENT_ASSIGN_EQUIPMENT = (currentAssignEquipment) => ({
    type: ASSIGN_EQUIPMENT_ACTION_TYPES.ADD_CURRENT_ASSIGN_EQUIPMENT,
    payload: { currentAssignEquipment }
});