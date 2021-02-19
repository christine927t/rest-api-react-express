// import { authenticateUser } from '../../api/routes';
import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        console.log(credentials)
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
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }

    async createCourse(course, encodedCredentials) {
        const response = await this.api('/courses', 'POST', course, true, { encodedCredentials });
        if(response.status === 201) {
            console.log('Course successfully created');
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }

    async deleteCourse() {
        const response = await this.api('/courses/:id', 'DELETE', null)
        if (response.status === 204){
            console.log('Course has been deleted');
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }
}