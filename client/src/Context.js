import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
    }
    
    state = {
        authenticatedUser: null,
        courses: []
    }

    render() {
        const { authenticatedUser, courses } = this.state;
        const value = {
            authenticatedUser,
            courses,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                listCourses: this.listCourses
            }
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                } 
            })
        }
    }

    signOut = () => {
        this.setState({ authenticatedUser: null })
    }

    
    listCourses = async () => {
        const courses = await this.data.getCourses()
        if (courses !== null) {
            this.setState(()=> { 
                return {
                   courses: courses
                }
             })            
        }
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}


