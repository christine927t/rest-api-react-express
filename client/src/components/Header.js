import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Header extends Component {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        //if there is an authenticated user stored in context, render a welcome message and a 'sign out' link
        //if not, render 'sign in' and 'sign up' links
        return (
            <nav>
                <div className="header">
                    <div className="bounds">
                        <div className="header--logo"><Link to="/courses">Courses</Link></div> 
                        {authUser ?
                            <React.Fragment>
                                <nav><span>Welcome, {authUser.firstName}!</span> <Link to="/signout">Sign Out</Link></nav>                                
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <nav><Link className="signup" to="/signup">Sign Up</Link> <Link className="signin" to="/signin">Sign In</Link></nav>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </nav>

        )
    }
}