import { API } from "../../../utils/constantes";
import { GET_Fetch } from "../../../utils/requests";
import { EDIT_EQUIPMENT_TYPE_ACTION_TYPES } from "./editEquipmentTypeActionTypes";
import store from "../../store";

export default async function getEquipmentTypes(params = null) {
    try {
        let equipmentTypes = null;

        if(params === null) {
            equipmentTypes = await GET_Fetch(API.EDIT_EQUIPMENT_TYPE);
        }
        else {
            equipmentTypes = await GET_Fetch(API.EDIT_EQUIPMENT_TYPE_FILTERS, params);
        }

        store.dispatch(FETCH_GET_EQUIPMENT_TYPE_SUCCESS(equipmentTypes));
        
        return equipmentTypes;
    } catch (error) {
        store.dispatch(RESET_EQUIPMENT_TYPE());

        return error;
    }
}

const FETCH_GET_EQUIPMENT_TYPE_SUCCESS = (equipmentTypes) => ({
    type: EDIT_EQUIPMENT_TYPE_ACTION_TYPES.FETCH_GET_EQUIPMENT_TYPES_SUCCESS,
    payload: { equipmentTypes }
});

const RESET_EQUIPMENT_TYPE = () => ({
    type: EDIT_EQUIPMENT_TYPE_ACTION_TYPES.RESET_EQUIPMENT_TYPE
});

export function addCurrentEquipmentType(currentEquipmentType) {
    return store.dispatch(ADD_CURRENT_EQUIPMENT_TYPE(currentEquipmentType));
}

const ADD_CURRENT_EQUIPMENT_TYPE = (currentEquipmentType) => ({
    type: EDIT_EQUIPMENT_TYPE_ACTION_TYPES.ADD_CURRENT_EQUIPMENT_TYPE,
    payload: { currentEquipmentType }
});