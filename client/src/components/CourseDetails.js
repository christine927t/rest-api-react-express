// This component provides the "Course Detail" screen by retrieving 
// the detail for a course from the REST API's /api/courses/:id route 
// and rendering the course. The component also renders a "Delete Course" 
// button that when clicked should send a DELETE request to the REST 
// API's /api/courses/:id route in order to delete a course. This component 
// also renders an "Update Course" button for navigating to the "Update Course" 
// screen.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CourseDetails extends Component {
    state = {
        course: [],
        user: [],
        errors: [],
    }

    handleDelete = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authUseremail = authUser.emailAddress;
        const authUserpass = authUser.password;
        const userId = authUser.id;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const course = { title, description, estimatedTime, materialsNeeded, userId }
        const id = this.props.match.params.id;
        console.log(id)

        context.data.deleteCourse(id, authUseremail, authUserpass)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors})
                        return { errors: [`Course ${title} was deleted from database`] }
                } else {
                    this.props.history.push('/');
                    console.log(`SUCCESS! course ${title} was NOT deleted!`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error')
            })
        
    }

    componentDidMount() {
            axios.get(`http://localhost:5000/api/${this.props.match.url}`)
              .then(data => {
                this.setState({ course: data.data, user: data.data.User });
              })
                .catch(err => {
                console.log(err)
        })
    }

    render() {        
        const { context } = this.props;
        const authUser = context.authenticatedUser;
       if (authUser) {console.log(authUser.id)}
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                    {authUser && authUser.id === this.state.course.userId ?
                        <React.Fragment>
                            <div className="grid-100"><span><Link className="button" to={`${this.props.match.url}/update`}>Update Course</Link><Link className="button" to="/courses" onClick={this.handleDelete}>Delete Course</Link></span><Link className="button button-secondary" to="/courses">Return to List</Link></div>
                        </React.Fragment>
                    : 
                        <React.Fragment>
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        </React.Fragment>
                    }
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title" key={this.state.course.id}>{this.state.course.title} </h3>
                            <p>{this.state.user.firstName} {this.state.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p>{this.state.course.description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <li>{this.state.course.materialsNeeded}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}