const API_BASE_URL = "https://localhost:44337/api/";

export const API = {
    LOGIN: API_BASE_URL + "Login/Authenticate",

    HOME: API_BASE_URL + "Home/GetCollaboraters",
    HOME_FILTERS: API_BASE_URL + "Home/GetCollaboraters/Filters",
    HOME_EQUIPMENTS_COLLABORATER: API_BASE_URL + "Home/GetEquipmentsCollaborater",

    EDIT_COLLABORATER: API_BASE_URL + "EditCollaborater/GetCollaboraters",
    EDIT_COLLABORATER_FILTERS: API_BASE_URL + "EditCollaborater/GetCollaboraters/Filters",
    EDIT_COLLABORATER_SINGLE: API_BASE_URL + "EditCollaborater/GetCollaborater",
    EDIT_COLLABORATER_ADD: API_BASE_URL + "EditCollaborater/NewCollaborater",
    EDIT_COLLABORATER_DELETE: API_BASE_URL + "EditCollaborater/DeleteCollaborater",
    EDIT_COLLABORATER_MODIFY: API_BASE_URL + "EditCollaborater/UpdateCollaborater",

    GET_FONCTIONS: API_BASE_URL + "Common/GetAllFonctions",

    EDIT_EQUIPMENT_TYPE: API_BASE_URL + "EditEquipmentType/GetEquipmentTypes",
    EDIT_EQUIPMENT_TYPE_FILTERS: API_BASE_URL + "EditEquipmentType/GetEquipmentTypes/Filters",
    EDIT_EQUIPMENT_TYPE_ADD: API_BASE_URL + "EditEquipmentType/NewEquipmentType",
    EDIT_EQUIPMENT_TYPE_UPDATE: API_BASE_URL + "EditEquipmentType/UpdateEquipmentType",
    EDIT_EQUIPMENT_TYPE_DELETE: API_BASE_URL + "EditEquipmentType/DeleteEquipmentType",

    EDIT_EQUIPMENT: API_BASE_URL + "EditEquipment/GetEquipments",
    EDIT_EQUIPMENT_FILTERS: API_BASE_URL + "EditEquipment/GetEquipments/Filters",
    EDIT_EQUIPMENT_SINGLE: API_BASE_URL + "EditEquipment/GetEquipment",
    EDIT_EQUIPMENT_ADD: API_BASE_URL + "EditEquipment/NewEquipment",
    EDIT_EQUIPMENT_UPDATE: API_BASE_URL + "EditEquipment/UpdateEquipment",
    EDIT_EQUIPMENT_DELETE: API_BASE_URL + "EditEquipment/DeleteEquipment",

    ASSIGN_EQUIPMENT: API_BASE_URL + "AssignEquipment/GetAssignEquipments",
    NON_ASSIGNED_EQUIPMENT: API_BASE_URL + "AssignEquipment/GetNonAssignedEquipments",
    ASSIGN_EQUIPMENT_FILTERS: API_BASE_URL + "AssignEquipment/GetAssignEquipments/Filters",
    ASSIGN_EQUIPMENT_ADD: API_BASE_URL + "AssignEquipment/NewAssignEquipment",
    ASSIGN_EQUIPMENT_UPDATE: API_BASE_URL + "AssignEquipment/UpdateAssignEquipment",
    ASSIGN_EQUIPMENT_DELETE: API_BASE_URL + "AssignEquipment/DeleteAssignEquipment"
};
