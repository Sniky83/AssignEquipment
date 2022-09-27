import getAssignEquipments from "../../redux/reducers/assignEquipment/assignEquipmentActions";
import { API } from "../../utils/constantes";
import { PUT_Fetch, DELETE_Fetch, POST_Fetch } from "../../utils/requests";
import { GET_Fetch } from "../../utils/requests";

export default async function CreateAssignEquipment() {
	let { idEquipement, idCollaborateur } = document.forms.create;

	const params = {
		idEquipement: parseInt(idEquipement.value),
		idCollaborateur: parseInt(idCollaborateur.value)
	};

	try {
		return await POST_Fetch(API.ASSIGN_EQUIPMENT_ADD, params);
	} catch (error) {
		return error;
	}
}

export async function GetNonAssignedEquipments() {
    try {
        return await GET_Fetch(API.NON_ASSIGNED_EQUIPMENT);
    } catch (error) {
        return error;
    }
}

export async function GetAssignEquipmentsFilters() {
	let { keyword, numeroSerie } = document.forms.filter;

	const params = {
		keyword: keyword.value,
		numeroSerie: numeroSerie.value
	};

	return await getAssignEquipments(params);
}

export async function UpdateAssignEquipment() {
	let idCollaborateur = document.forms.edit.idCollaborateur;
	let idEquipement = document.forms.edit.idEquipement;
	let oldIdEquipement = document.forms.edit.currentIdEquipement;

	const params = {
		idCollaborateur: parseInt(idCollaborateur.value),
		idEquipement: parseInt(idEquipement.value),
		oldIdEquipement: parseInt(oldIdEquipement.value)
	};

	try {
		return await PUT_Fetch(API.ASSIGN_EQUIPMENT_UPDATE, params);
	} catch (error) {
		return error;
	}
}

export async function DeleteAssignEquipment(idAffectationEquipement) {
	const params = {
		idAffectationEquipement: idAffectationEquipement
	};

	try {
		return await DELETE_Fetch(API.ASSIGN_EQUIPMENT_DELETE, params);
	} catch (error) {
		return error;
	}
}