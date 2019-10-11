const apiUrl = 'http://localhost:8080/'
export let baseURL = apiUrl;

export const post = (url, data) => {
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' },
        mode: 'cors',
        cache: 'default'
    };

    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((obj) => {
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

    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((obj) => {
            console.table(obj);
            return obj;
        });
};