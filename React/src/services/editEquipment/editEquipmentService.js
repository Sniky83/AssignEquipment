import getEquipments from "../../redux/reducers/editEquipment/editEquipmentActions";
import { API } from "../../utils/constantes";
import { PUT_Fetch, DELETE_Fetch, POST_Fetch } from "../../utils/requests";

export default async function CreateEquipment() {
	let { marque, modele, numeroSerie, commentaire, idTypeEquipement } = document.forms.create;

	const params = {
		idTypeEquipement: parseInt(idTypeEquipement.value),
		marque: marque.value,
		modele: modele.value,
		numeroSerie: numeroSerie.value,
		commentaire: commentaire.value
	};

	try {
		return await POST_Fetch(API.EDIT_EQUIPMENT_ADD, params);
	} catch (error) {
		return error;
	}
}

export async function GetEquipmentsFilters() {
	let { keyword, numeroSerie } = document.forms.filter;

	const params = {
		keyword: keyword.value,
		numeroSerie: numeroSerie.value
	};

	return await getEquipments(params);
}

export async function UpdateEquipment(idEquipement) {
	let { marque, modele, numeroSerie, commentaire, idTypeEquipement } = document.forms.edit;

	const params = {
		idEquipement: idEquipement,
		idTypeEquipement: parseInt(idTypeEquipement.value),
		marque: marque.value,
		modele: modele.value,
		numeroSerie: numeroSerie.value,
		commentaire: commentaire.value
	};

	try {
		return await PUT_Fetch(API.EDIT_EQUIPMENT_UPDATE, params);
	} catch (error) {
		return error;
	}
}

export async function DeleteEquipment(idEquipement) {
	const params = {
		idEquipement: idEquipement
	};

	try {
		return await DELETE_Fetch(API.EDIT_EQUIPMENT_DELETE, params);
	} catch (error) {
		return error;
	}
}

export async function GetEquipment(idEquipement) {
	const params = {
		idEquipement: parseInt(idEquipement)
	};

	return await getEquipments(params, true);
}