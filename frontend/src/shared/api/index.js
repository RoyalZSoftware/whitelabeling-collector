import {environment} from '../../environments/environment';

export async function get(endpoint, queryParms) {
    const url = environment.BASE_URL + endpoint;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json());
}

export async function post(endpoint, body) {
    const url = environment.BASE_URL + endpoint;

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
}