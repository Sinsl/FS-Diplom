import axios from 'axios';

const getToken = () => {
    const token = localStorage.getItem('token');
    return {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
    }
} 

const exemplar = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    withCredentials: true,
  });

export const requests = async ( method: string, url: string, data: any ) => {
    let resp = null;

    switch (method) {
        case 'get':
            const param = data ? new URLSearchParams(data) : undefined;
            resp = await exemplar.get(url, { params: param, headers: getToken() } );
            break;

        case 'post':
            resp = await exemplar.post(url, JSON.stringify(data), {headers: getToken()});
            break;

        case 'put':
            resp = await exemplar.put(url, JSON.stringify(data), {headers: getToken()});
            break;

        case 'delete':
            resp = await exemplar.delete(url, {headers: getToken()});
            break;
        
        default:
            break;
        }
    return resp;
}