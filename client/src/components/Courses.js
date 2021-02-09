// This component provides the "Courses" screen by retrieving 
// the list of courses from the REST API's /api/courses route 
// and rendering a list of courses. Each course needs to link 
// to its respective "Course Detail" screen. 
// This component also renders a link to the "Create Course" screen.

import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

export default class Courses extends Component {
    render() {
        return (
            <div className="bounds">
                <div className="grid-33"><Link className="course--module course--link" to="/courses/:id">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">Build a Basic Bookcase</h3>
                </Link></div>
                <div className="grid-33"><Link className="course--module course--link" href="course-detail.html">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">Learn How to Program</h3>
                </Link></div>
                <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">Learn How to Test Programs</h3>
                </a></div>
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