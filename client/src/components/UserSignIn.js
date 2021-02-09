// This component provides the "Sign In" screen by rendering a form 
// that allows a user to sign using their existing account information. 
// The component also renders a "Sign In" button that when clicked signs 
// in the user and a "Cancel" button that returns the user to the default 
// route (i.e. the list of courses).

import React, { Component } from 'react';

export default class UserSignIn extends Component {
    submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful'] }
                    })
                } else {
                    this.props.history.push('/authenticated');
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error')
            })
    }
    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value="" /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                </div>
            </div>
        )
    }
}