import * as rest from './RestService';

let mainUrl = '';

export let setEndpoint = (endpoint) => {
    mainUrl = endpoint;
};

export const saveOne = (obj) => {
    return rest.post(rest.baseURL + mainUrl, obj);
};

export const getAll = () => {
    return rest.get(rest.baseURL + mainUrl);
};

export const getOne = (id) => {
    const urlOne = rest.baseURL + mainUrl + id
    return rest.get(urlOne);
};