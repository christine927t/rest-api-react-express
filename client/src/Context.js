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
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
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
        user.password = password;
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

    // createCourse = async (course, encodedCredentials) => {
    //     const newCourse = await this.data.createCourse(course, encodedCredentials)
    //     console.log(newCourse)
    //     if (newCourse !== null) {
    //         this.setState(() => {
    //             return {
    //                 // authenticatedUser: user,
    //                 newCourse: newCourse
    //             }
    //         })
    //     }    
    // }
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


