import { API } from "../../../utils/constantes";
import { GET_Fetch } from "../../../utils/requests";
import { EDIT_EQUIPMENT_ACTION_TYPES } from "./editEquipmentActionTypes";
import store from "../../store";

export default async function getEquipments(params = null, isSingle = false) {
    try {
        let equipments = null;

        if(params === null) {
            equipments = await GET_Fetch(API.EDIT_EQUIPMENT);
        }
        else {
            if(isSingle){
                equipments = await GET_Fetch(API.EDIT_EQUIPMENT_SINGLE, params);
            }
            else
            {
                equipments = await GET_Fetch(API.EDIT_EQUIPMENT_FILTERS, params);
            }
        }

        store.dispatch(FETCH_GET_EQUIPMENTS_SUCCESS(equipments));
        
        return equipments;
    } catch (error) {
        store.dispatch(RESET_EQUIPMENTS());

        return error;
    }
}

const FETCH_GET_EQUIPMENTS_SUCCESS = (equipments) => ({
    type: EDIT_EQUIPMENT_ACTION_TYPES.FETCH_GET_EQUIPMENTS_SUCCESS,
    payload: { equipments }
});

const RESET_EQUIPMENTS = () => ({
    type: EDIT_EQUIPMENT_ACTION_TYPES.RESET_EQUIPMENTS
});

export function addCurrentEquipment(currentEquipment) {
    return store.dispatch(ADD_CURRENT_EQUIPMENT(currentEquipment));
}

const ADD_CURRENT_EQUIPMENT = (currentEquipment) => ({
    type: EDIT_EQUIPMENT_ACTION_TYPES.ADD_CURRENT_EQUIPMENT,
    payload: { currentEquipment }
});