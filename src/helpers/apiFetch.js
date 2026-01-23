export default async function (method, path, body = null, token = null) {
    const url = 'http://ksjecvx-m1.prof.ru/public/api';

    const headers = {
        Client: 'kcbhnjus',
        Accept: 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const options = {
        method, headers,
    };

    if (body instanceof FormData) {
        options.body = body
    } else if (body) {
        headers['Content-type'] = 'applicarion/json'

        options.body = JSON.stringify(body)
    }

    const request = await fetch(url + path, options)

    try {
        return await  request.json()
    } catch (e) {
        return null
    }
}