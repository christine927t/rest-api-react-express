//stateless component

// Displays the top menu bar for the application and includes buttons for 
// signing in and signing up (if there's not an authenticated user) or the user's 
// name and a button for signing out (if there's an authenticated user).

import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link 
  } from 'react-router-dom';


export default class Header extends Component {
    render() {
        return (
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav><Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></nav>
                    </div>
                </div>        
        )
    }
}