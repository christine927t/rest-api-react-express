// This component provides the "Update Course" screen by rendering 
// a form that allows a user to update one of their existing courses. 
// The component also renders an "Update Course" button that when 
// clicked sends a PUT request to the REST API's /api/courses/:id 
// route. This component also renders a "Cancel" button that returns 
// the user to the "Course Detail" screen.

import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Form from './Form';

export default class UpdateCourse extends Component {
    state = {
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
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        console.log(this.state.course.userId)

        return (
            <div class="bounds course--detail">
                <h1>Update Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
                    elements={() => (
                        <React.Fragment>
                            <div>
                                <div class="grid-66">
                                    <div class="course--header">
                                        <h4 class="course--label">Course</h4>
                                        <div><input id="title" name="title" type="text" class="input-title course--title--input" placeholder={this.state.course.title}  onChange={this.change}/></div>
                                        <p>By Joe Smith</p>
                                    </div>
                                    <div class="course--description">
                                        <div><textarea id="description" name="description" class="" placeholder={this.state.course.description} value={this.state.course.description} onChange={this.change}></textarea></div>
                                    </div>
                                </div>
                                <div class="grid-25 grid-right">
                                    <div class="course--stats">
                                        <ul class="course--stats--list">
                                            <li class="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div><input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input" placeholder={this.state.course.estimatedTime} value={this.state.course.estimatedTime} onChange={this.change}/></div>
                                            </li>
                                            <li class="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div><textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder={this.state.course.estimatedTime} value={this.state.course.estimatedTime}>
                                                * 1/2 x 3/4 inch parting strip
                                                </textarea></div>
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

    cancel = () => {
        this.props.history.push('/');
    }
}