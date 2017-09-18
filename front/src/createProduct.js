import fetch from 'isomorphic-fetch';

export function createBlogPost() {
    return fetch('/cotizacion', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify({'nombreCliente':'AACC', 'email':'aa@cc.com','fecha':'28/05/1015','telefono':'311525055'}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}