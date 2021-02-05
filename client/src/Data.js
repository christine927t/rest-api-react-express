import config from './config';

export default class Data {
    api(path, method, body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };

        if(body !== null) {
            options.body = JSON.stringify(body);
        }

        if(body !== null) {
            if(requiresAuth){
                const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
                options.headers['Authorization'] = `Basic ${encodedCredentials}`;
            }
        }

        return fetch(url, options)
    }

    async getCourses(username, password){
        const response = await this.api('/courses', 'GET', null, true, { username, password });
        if (response.status === 200){
            console.log('Successfully getting courses!')
            return response.json().then(data => data)
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
}