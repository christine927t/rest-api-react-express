import React, { Component } from 'react';
import Form from './Form';

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

    //when component first mounts(or on reload), makes call to API via context to retrieve the course that matches the ID in the URL
    componentDidMount() {

        const { context } = this.props
        const authUser = context.authenticatedUser;
        const authUseremail = authUser.emailAddress;
        const authUserpass = authUser.password;
        const id = this.props.match.params.id;

        context.data.getCourse(id, authUseremail, authUserpass)
            .then(data => {
                if (authUser.id !== data.userId){
                    this.props.history.push('/forbidden')
                }
                else {
                    this.setState({
                        title: data.title,
                        description: data.description,
                        estimatedTime: data.estimatedTime,
                        materialsNeeded: data.materialsNeeded,
                        userId: data.userId,
                        user: data.User
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/forbidden')
            })
    }

    render() {
        const { errors } = this.state;
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
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
        //redirects user to previous page
        this.props.history.push(this.props.history.go(-1)); 
    }
}