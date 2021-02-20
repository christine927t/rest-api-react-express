// This component provides the "Update Course" screen by rendering 
// a form that allows a user to update one of their existing courses. 
// The component also renders an "Update Course" button that when 
// clicked sends a PUT request to the REST API's /api/courses/:id 
// route. This component also renders a "Cancel" button that returns 
// the user to the "Course Detail" screen.

import React, { Component} from 'react';
import axios from 'axios';
import Form from './Form';

export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
        course: [],
        user: []
    }

    componentDidMount() {
            axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
              .then(data => {
                this.setState({ course: data.data, user: data.data.User });
              })
                .catch(err => {
                console.log(err)
        })
    }

    render(){
        const { errors } = this.state; 
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
                                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.change}/></div>
                                        <p>By Joe Smith</p>
                                    </div>
                                    <div className="course--description">
                                        <div><textarea id="description" name="description" placeholder="Course description..." value={this.state.description} onChange={this.change}></textarea></div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.estimatedTime}  onChange={this.change}/></div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.change}></textarea></div>
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
                [name]: value
            }
        })
    }

    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authUseremail = authUser.emailAddress;
        const authUserpass = authUser.password;
        const userId = authUser.id;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const course = { title, description, estimatedTime, materialsNeeded, userId }
        const id = this.props.match.params.id;
        console.log(id)

        context.data.updateCourse(id, course, authUseremail, authUserpass)
            .then(errors => {
                if (errors) {
                    this.setState({errors})
                        return { errors: [`Course ${title} was NOT updated in database`] }
                } else {
                    this.props.history.push('/');
                    console.log(`SUCCESS! course ${title} has been updated!`);
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