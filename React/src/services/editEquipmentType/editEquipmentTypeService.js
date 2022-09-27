import getEquipmentTypes from "../../redux/reducers/editEquipmentType/editEquipmentTypeActions";
import { API } from "../../utils/constantes";
import { PUT_Fetch, DELETE_Fetch, POST_Fetch } from "../../utils/requests";

export default async function CreateEquipmentType() {
	let { libelle, isActif } = document.forms.create;

	const params = {
		libelle: libelle.value,
		isActif: isActif.checked
	};

	try {
		return await POST_Fetch(API.EDIT_EQUIPMENT_TYPE_ADD, params);
	} catch (error) {
		return error;
	}
}

export async function GetEquipmentTypesFilters() {
	let { libelle, isActif } = document.forms.filter;

	const params = {
		libelle: libelle.value,
		isActif: isActif.checked
	};

	return await getEquipmentTypes(params);
}

export async function UpdateEquipmentType(idTypeEquipement, currentEquipementType = null) {
	let params = {};

	if(currentEquipementType === null)
	{
		let { libelle, isActif } = document.forms.edit;

		params = {
			idTypeEquipement: idTypeEquipement,
			libelle: libelle.value,
			isActif: isActif.checked
		};
	}
	else
	{
		params = {
			idTypeEquipement: idTypeEquipement,
			libelle: currentEquipementType.libelle,
			isActif: !currentEquipementType.isActif
		};
	}

	try {
		return await PUT_Fetch(API.EDIT_EQUIPMENT_TYPE_UPDATE, params);
	} catch (error) {
		return error;
	}
}

export async function DeleteEquipmentType(idTypeEquipement) {
	const params = {
		idTypeEquipement: idTypeEquipement
	};

	try {
		return await DELETE_Fetch(API.EDIT_EQUIPMENT_TYPE_DELETE, params);
	} catch (error) {
		return error;
	}
}