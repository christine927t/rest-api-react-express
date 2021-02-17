// This component provides the "Courses" screen by retrieving 
// the list of courses from the REST API's /api/courses route 
// and rendering a list of courses. Each course needs to link 
// to its respective "Course Detail" screen. 
// This component also renders a link to the "Create Course" screen.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Course from './Course';

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
        return (

            <div className="bounds">
                <div className="grid-33"><Link className="course--module course--link" to="/courses/{id}">
                    <h4 className="course--label">Course</h4>
                    <Course data={this.state.courses} /></Link></div>
                    {/* <h3 className="course--title"><Course data={this.state.courses} /></h3></Link></div> */}


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