import { API } from "../../utils/constantes";
import { PUT_Fetch, DELETE_Fetch, POST_Fetch } from "../../utils/requests";
import getCollaboraters from "../../redux/reducers/editCollaborater/editCollaboraterActions";

export default async function CreateCollaborater() {
	let { nom, prenom, uname, pwd, isActif, idFonction } = document.forms.create;

	const params = {
		nom: nom.value,
		prenom: prenom.value,
		uname: uname.value,
		pwd: pwd.value,
		isActif: isActif.checked,
		idFonction: parseInt(idFonction.value)
	};

	try {
		return await POST_Fetch(API.EDIT_COLLABORATER_ADD, params);
	} catch (error) {
		return error;
	}
}

export async function GetEditCollaboratersFilters() {
	const { keyword, idFonction, isActif } = document.forms.filter;

	const params = {
		keyword: keyword.value,
		idFonction: parseInt(idFonction.value),
		isActif: isActif.checked
	};

	return await getCollaboraters(params);
}

export async function UpdateCollaborater(idCollaborateur, currentCollaborater = null) {
	let params = {};

	if(currentCollaborater === null)
	{
		let { nom, prenom, uname, pwd, isActif, idFonction } = document.forms.edit;
	
		params = {
			nom: nom.value,
			prenom: prenom.value,
			uname: uname.value,
			pwd: pwd.value,
			isActif: isActif.checked,
			idFonction: parseInt(idFonction.value),
			idCollaborateur: idCollaborateur
		};
	}
	else
	{
		params = {
			nom: currentCollaborater.nom,
			prenom: currentCollaborater.prenom,
			uname: currentCollaborater.uname,
			isActif: !currentCollaborater.isActif,
			idFonction: currentCollaborater.idFonction,
			idCollaborateur: idCollaborateur
		};
	}

	try {
		return await PUT_Fetch(API.EDIT_COLLABORATER_MODIFY, params);
	} catch (error) {
		return error;
	}
}

export async function UpdateEquipmentType(idTypeEquipement, libelle = null, isActif = null) {
	let params = {};

	if(isActif === null && libelle === null)
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
			libelle: libelle,
			isActif: isActif
		};
	}

	try {
		return await PUT_Fetch(API.EDIT_EQUIPMENT_TYPE_UPDATE, params);
	} catch (error) {
		return error;
	}
}

export async function DeleteCollaborater(idCollaborateur) {
	const params = {
		idCollaborateur: idCollaborateur
	};

	try {
		return await DELETE_Fetch(API.EDIT_COLLABORATER_DELETE, params);
	} catch (error) {
		return error;
	}
}

export async function GetCollaborater(idCollaborateur) {
	const params = {
		idCollaborateur: parseInt(idCollaborateur)
	};

	return await getCollaboraters(params, true);
}