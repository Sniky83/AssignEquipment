import { API } from "../../../utils/constantes";
import { GET_Fetch } from "../../../utils/requests";
import { HOME_ACTION_TYPES } from "./homeActionTypes";
import store from "../../store";

export default async function getCollaboraters (params = null) {
    try {
        let collaboraters = null;

        if(params === null) {
            collaboraters = await GET_Fetch(API.HOME);
        }
        else {
            collaboraters = await GET_Fetch(API.HOME_FILTERS, params);
        }

        store.dispatch(FETCH_GET_COLLABORATERS_SUCCESS(collaboraters));

        return collaboraters;
    } catch (error) {
        store.dispatch(RESET_COLLABORATERS());

        return error;
    }
}

const FETCH_GET_COLLABORATERS_SUCCESS = (collaboraters) => ({
    type: HOME_ACTION_TYPES.FETCH_GET_COLLABORATERS_SUCCESS,
    payload: { collaboraters }
});

const RESET_COLLABORATERS = () => ({
    type: HOME_ACTION_TYPES.RESET_COLLABORATERS
});

export function addCurrentCollaborater(currentCollaborater) {
    return store.dispatch(ADD_CURRENT_COLLABORATER(currentCollaborater));
}

const ADD_CURRENT_COLLABORATER = (currentCollaborater) => ({
    type: HOME_ACTION_TYPES.ADD_CURRENT_COLLABORATER,
    payload: { currentCollaborater }
});