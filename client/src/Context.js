import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
    }
    
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
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
            //Set cookie
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
        }
    }

    signOut = () => {
        this.setState(() => {
            return { 
                authenticatedUser: null 
            }
        })
        //Removes cookie containing user information
        Cookies.remove('authenticatedUser');
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


