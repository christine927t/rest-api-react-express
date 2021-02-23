import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import { Redirect } from 'react-router-dom'

export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        course: [],
        errors: [],
        user: []
    }



    //when component first mounts(or on reload), makes axios call to API to retrieve the course that matches the ID in the URL
    componentDidMount() {

        const { context } = this.props
        const authUser = context.authenticatedUser;
        const authUseremail = authUser.emailAddress;
        const authUserpass = authUser.password;
        const id = this.props.match.params.id;
        // {
        // authUser && authUser.id === this.state.userId ?

        context.data.getCourse(id, authUseremail, authUserpass)
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    estimatedTime: data.estimatedTime,
                    materialsNeeded: data.materialsNeeded,
                    userId: data.userId,
                    user: data.User
                });
                console.log(this.state)
                console.log(this.state.user)
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/forbidden')
            })
        //     :
        //     <Redirect to="/forbidden" />
        // }
    }

    render() {
        const { errors } = this.state;
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        console.log(authUser.id)
        console.log(authUser)
        console.log(this.state.userId)

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                {authUser && authUser.id === this.state.userId ?
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => (
                            <React.Fragment>
                                <div>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div><input id="title" name="title" type="text" className="input-title course--title--input" value={this.state.title} onChange={this.change} /></div>
                                            <p>By: {authUser.firstName} {authUser.lastName}</p>
                                        </div>
                                        <div className="course--description">
                                            <div><textarea id="description" name="description" value={this.state.description} onChange={this.change}></textarea></div>
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" value={this.state.estimatedTime} onChange={this.change} /></div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div><textarea id="materialsNeeded" name="materialsNeeded" value={this.state.materialsNeeded} onChange={this.change}></textarea></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                    :
                    <React.Fragment>
                        <Redirect to="/forbidden" />
                    </React.Fragment>
                }
            </div>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {

                [name]: value,

            }
        })
        console.log(this.state)
    }

    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authUseremail = authUser.emailAddress;
        const authUserpass = authUser.password;
        const course = this.state
        console.log(course)
        const id = this.props.match.params.id;

        //triggers updateCourse API call on submit
        context.data.updateCourse(id, course, authUseremail, authUserpass)
            .then(errors => {
                if (errors) {
                    this.setState({ errors })
                    return { errors: [`Course ${course.title} was NOT updated in database`] }
                } else {
                    this.setState({ course })
                    this.props.history.push('/');
                    console.log(`SUCCESS! course ${course.title} has been updated!`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/forbidden')
            })
    }

    cancel = () => {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        this.props.history.push(from); //redirects user to previous page or home page

    }
}