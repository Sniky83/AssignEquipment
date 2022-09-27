import { API } from "../../utils/constantes";
import { GET_Fetch } from "../../utils/requests";
import getCollaboraters from "../../redux/reducers/home/homeActions";

export default async function GetEquipmentsCollaborater(idCollaborateur) {
	const params = {
		idCollaborateur: idCollaborateur
	};

	try {
		return await GET_Fetch(API.HOME_EQUIPMENTS_COLLABORATER, params);
	} catch (error) {
		return error;
	}
}

export async function GetCollaboratersFilters() {
	const { keyword, idFonction } = document.forms.filter;

	const params = {
		keyword: keyword.value,
		idFonction: parseInt(idFonction.value)
	};

	return await getCollaboraters(params);
}