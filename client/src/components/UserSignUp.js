// This component provides the "Sign Up" screen by rendering a form that 
// allows a user to sign up by creating a new account. The component also 
// renders a "Sign Up" button that when clicked sends a POST request to the 
// REST API's /api/users route and signs in the user. This component also 
// renders a "Cancel" button that returns the user to the default route 
// (i.e. the list of courses).

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    // handleChange(event) {
    //     this.handleChange = this.handleChange.bind(this);

    //     this.setState({ firstName: event.target.firstName })

    // }
    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            // errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <React.Fragment>
                                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} onChange={this.change} />
                                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} onChange={this.change} />
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={this.change} />
                                <input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={this.change} />
                                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={confirmPassword} onChange={this.change} />
                                <div className="grid-100 pad-bottom"><button className="button" type="submit" onSubmit={this.submit}>Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
                            </React.Fragment>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
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

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        }
        console.log(user)

        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/');
                        })
                    console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
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