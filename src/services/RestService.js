const apiUrl = 'https://virtual-menu-server.herokuapp.com/'
export let baseURL = apiUrl;

export const post = (url, data) => {
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' },
        mode: 'cors',
        cache: 'default'
    };

    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((obj) => {
            console.log('-- response POST:' + url);
            console.table(obj);
            return obj;
        });
};

export const put = (url, data) => {
    let options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' },
        mode: 'cors',
        cache: 'default'
    };

    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((obj) => {
            console.log('-- response POST:' + url);
            console.table(obj);
            return obj;
        });
};

export const get = (url) => {
    let options = {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        mode: 'cors',
        cache: 'default'
    };

    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((obj) => {
            return obj;
        });
};

export const remove = (url) => {
    let options = {
        method: 'DELETE'
    };

    return fetch(url, options)
        .then((response) => {
            return response;
        })
        .then((obj) => {
            return obj;
        });
};