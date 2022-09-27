import authenticate from "../../redux/reducers/login/loginActions";

export default async function Authentication() {
	let { uname, pass } = document.forms.login;
	
	const params = {
		uname: uname.value,
		pwd: pass.value
	};

	return await authenticate(params);
}