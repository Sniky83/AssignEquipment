import { API } from "../../utils/constantes";
import { PUT_Fetch, DELETE_Fetch, POST_Fetch, GET_Fetch } from "../../utils/requests";

export default async function GetCollaboratersFilters(from) {
	let { nom, prenom, uname, isActif, idFonction } = document.forms.create;

	const params = {
		nom: nom.value,
		prenom: prenom.value,
		uname: uname.value,
		isActif: isActif.checked,
		idFonction: parseInt(idFonction.value)
	};

	try {
        if(from === "HOME")
        {
            return await GET_Fetch(API.HOME_FILTERS, params);
        }
        else
        {
            return await GET_Fetch(API.EDIT_COLLABORATER_FILTERS, params);
        }

	} catch (error) {
		return error;
	}
}
