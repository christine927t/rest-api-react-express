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
        courses: [],
        user: []
    }

    componentDidMount() {
            axios.get(`http://localhost:5000/api/courses`)
              .then(data => {
                this.setState({ courses: data.data, user: data.data.User });
                console.log(this.state.courses.title)
                console.log(this.state.user)
                console.log(this.state.courses.userId)
              })
        .catch(err => {
            console.log(err)
        })
    }

    render() {        
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        const results = this.state.courses;
        console.log(results)
        let courses = results.map(course => 
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title" key={course.id}>{course.title} </h3>
                        <p>{course.User.firstName} {course.User.lastName}</p>
                    </div>
                    <div className="course--description">
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{course.estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    <li>{course.materialsNeeded}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                    {authUser && authUser.id === this.state.courses.userId ?
                        <React.Fragment>
                            <div className="grid-100"><span><Link className="button" to="/courses/{courses.id}/update">Update Course</Link><Link className="button" to="/courses" onClick={handleDelete}>Delete Course</Link></span><Link className="button button-secondary" to="/courses">Return to List</Link></div>
                        </React.Fragment>
                    : 
                        <React.Fragment>
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        </React.Fragment>
                    }
                    </div>
                </div>
                    {courses}
            </div>
        )
    }

}

function handleDelete(){
    const { context } =this.props;
    context.data.deleteCourse();
    
}