import * as rest from './RestService';

export const saveOne = (url, obj) => {
    return rest.post(rest.baseURL + url, obj);
};

export const update = (url, obj) => {
    return rest.put(rest.baseURL + url, obj);
};

export const getAll = (url) => {
    return rest.get(rest.baseURL + url);
};

export const getOne = (url, id) => {
    const urlOne = rest.baseURL + url + id
    return rest.get(urlOne);
};