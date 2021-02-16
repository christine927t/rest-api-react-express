import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options)
    }

    // async getCourses(username, password) {
    //     const response = await this.api('/courses', 'GET', null, true, { username, password });
    //     if (response.status === 200) {
    //         console.log('Successfully getting courses!')
    //         return response.json().then(data => data)
    //     }
    //     else if (response.status === 401) {
    //         return null;
    //     }
    //     else {
    //         throw new Error();
    //     }
    // }

    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            console.log('User successfully signed in');
            return response.json().then(data => data)
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            console.log('User successfully created');
            return [];
        } else if (response.status === 401) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }
}