// This component provides the "Sign In" screen by rendering a form 
// that allows a user to sign using their existing account information. 
// The component also renders a "Sign In" button that when clicked signs 
// in the user and a "Cancel" button that returns the user to the default 
// route (i.e. the list of courses).

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }
    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <React.Fragment>
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={this.change} />
                                <input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={this.change} />
                                <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit}>Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
                            </React.Fragment>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signin">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            }
        })
    }

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

    cancel = () => {
        this.props.history.push('/');
    }
}