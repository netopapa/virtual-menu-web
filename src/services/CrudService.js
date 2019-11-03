import * as rest from './RestService';

export const save = (url, obj) => {
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

export const remove = (url, id) => {
    const urlRemove = rest.baseURL + url + id
    return rest.remove(urlRemove);
};