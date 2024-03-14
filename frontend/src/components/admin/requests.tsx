import axios from 'axios';

const exemplar = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
      }
  });

export const requests = async ( method: string, url: string, data: any ) => {
    let resp = null;

    switch (method) {
        case 'get':
            const param = data ? new URLSearchParams(data) : undefined;
            resp = await exemplar.get(url, { params: param });
            break;

        case 'post':
            resp = await exemplar.post(url, JSON.stringify(data));
            break;

        case 'put':
            resp = await exemplar.put(url, JSON.stringify(data));
            break;

        case 'delete':
            resp = await exemplar.delete(url);
            break;
        
        default:
            break;
        }
    return resp;
}