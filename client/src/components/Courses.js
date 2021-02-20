// This component provides the "Courses" screen by retrieving 
// the list of courses from the REST API's /api/courses route 
// and rendering a list of courses. Each course needs to link 
// to its respective "Course Detail" screen. 
// This component also renders a link to the "Create Course" screen.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {
    state = {
        courses: []
    }

    componentDidMount() {
            axios.get('http://localhost:5000/api/courses')
              .then(data => {
                this.setState({ courses: data.data, user: data.data.User });
                console.log(this.state.courses)
              })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const results = this.state.courses;
        let courses = results.map(course => 
            <React.Fragment key={course.id}>
                <div className="grid-33"><Link className="course--module course--link" to={`/courses/${course.id}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link></div>
            </React.Fragment>
        )

        return (

            <div className="bounds">
                    {courses}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link></div>
            </div>
        )
    }
} 