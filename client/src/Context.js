import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
    }

    render(){
        const value = {
            data: this.data,
            actions: {
                listCourses: this.listCourses
            }
        }
            
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    //attempting api call here instead of Data.js
    listCourses = async () =>{
        const response = await this.api('/courses', 'GET', null, true);
        if (response.status === 200){
            console.log('Successfully getting courses!')
            console.log(response.status)
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

export const Consumer = Context.Consumer;

export default function withContext(Component){
    return function ContextComponent(props){
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}


