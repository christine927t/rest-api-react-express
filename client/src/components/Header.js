//stateless component

// Displays the top menu bar for the application and includes buttons for 
// signing in and signing up (if there's not an authenticated user) or the user's 
// name and a button for signing out (if there's an authenticated user).

import React, { Component } from 'react';
import {
    NavLink
} from 'react-router-dom';


export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav><NavLink className="signup" to="/signup">Sign Up</NavLink><NavLink className="signin" to="/signin">Sign In</NavLink></nav>
                </div>
            </div>
        )
    }
}