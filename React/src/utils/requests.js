import Cookies from 'js-cookie';

const methodGet = 'GET';
const methodPost = 'POST';
const methodPut = 'PUT';
//const methodPatch = 'PATCH';
const methodDelete = 'DELETE';

async function Generic_FETCH(method_used, url, params = null) {
    let options = null;

    let token = Cookies.get('token');

    if(token)
    {
        if(method_used !== methodGet)
        {
            options = {
                method: method_used,
                headers: {'Content-Type': 'application/json ; charset=UTF-8', 'Authorization': token},
                body: JSON.stringify(params)
            };
        }
        else
        {
            options = {
                method: method_used,
                headers: {'Authorization': token},
            };
        }
    }
    else
    {
        if(method_used !== methodGet)
        {
            options = {
                method: method_used,
                headers: {'Content-Type': 'application/json ; charset=UTF-8'},
                body: JSON.stringify(params)
            };
        }
        else
        {
            options = {
                method: method_used
            };
        }
    }

    if(method_used === methodGet && params !== null) {
        //On prends l'objet params et on le converti pour passer l'url final au fetch
        let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

        url = url + "?" + query;
    }
    
    const res = await fetch(url, options);
    const data = await res.json();

    if(res.status === 200) {
        //Si on récupère un message au lieu d'une liste
        if(data.message !== undefined)
        {
            return {status: res.status, message: data.message};
        }
        else
        {
            return {status: res.status, data: data};
        }
    }
    else {
        // eslint-disable-next-line
        throw {status: res.status, message: data.message};
    }
}

//SELECT SQL
export async function GET_Fetch(url, params = null)
{
    return await Generic_FETCH(methodGet, url, params)
}

//INSERT SQL ou données sensibles à cacher
export async function POST_Fetch(url, params)
{
    return await Generic_FETCH(methodPost, url, params)
}

//DELETE SQL
export async function DELETE_Fetch(url, params)
{
    return await Generic_FETCH(methodDelete, url, params)
}

//UPDATE SQL
export async function PUT_Fetch(url, params)
{
    return await Generic_FETCH(methodPut, url, params)
}

export default POST_Fetch;