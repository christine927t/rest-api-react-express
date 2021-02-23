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

    //makes GET request to API to request user emailAddress and password
    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            console.log('User successfully signed in');
            return response.json().then(data => data)
        } else if (response.status === 401) {
            return null;
        } else if (response.status === 500) {    
            this.props.history.push('/error')
        } else {
            throw new Error();
        }
    }

    //makes POST request to API to create a new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            console.log('User successfully created');
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 500) {    
            this.props.history.push('/error')
        } else {
            throw new Error();
        }
    }

    //makes POST request to API to create a new course
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
        if(response.status === 201) {
            console.log('Course successfully created');
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 500) {    
            this.props.history.push('/error')
        } else {
            throw new Error();
        }
    }

    //makes DELETE request to API to delete course that matches ID in the URL
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password })
        if (response.status === 204){
            console.log('Course has been deleted');
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 500) {    
            this.props.history.push('/error')
        } else {
            throw new Error();
        }
    }

    //makes PUT request to API to update course information for a course that matches ID in the url
    async updateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password })
        if (response.status === 204){
            console.log('Course has been updated');
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 500) {    
            this.props.history.push('/error')
        } else {
            throw new Error();
        }
    }

    async getCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'GET', course, true, { emailAddress, password })
        if (response.status === 200){
            console.log(course)
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 500) {    
            this.props.history.push('/error')
        } else {
            throw new Error();
        }
    }
}