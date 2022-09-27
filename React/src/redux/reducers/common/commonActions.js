import { API } from "../../../utils/constantes";
import { GET_Fetch } from "../../../utils/requests";
import { FONCTIONS_ACTION_TYPES } from "./commonActionTypes";
import store from "../../store";

export default async function getFonctions() {
    try {
        let fonctions = await GET_Fetch(API.GET_FONCTIONS);

        store.dispatch(FETCH_GET_FONCTIONS_SUCCESS(fonctions));

        return fonctions;
    } catch (error) {
        return error;
    }
}

const FETCH_GET_FONCTIONS_SUCCESS = (fonctions) => ({
    type: FONCTIONS_ACTION_TYPES.FETCH_GET_FONCTIONS_SUCCESS,
    payload: { fonctions }
});