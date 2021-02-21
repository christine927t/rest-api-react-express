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
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null, //retrieves value of the stored cookie to set initial state of authenticatedUser (or sets to null)
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

    //signIn method passes user emailAddress and password to data.getUser to authenticate user credentials via the API 
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

    //signOut method signs user out and sets authenticatedUser state back to null
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


