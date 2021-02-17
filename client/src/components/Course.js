import React from 'react';
import { Link } from 'react-router-dom'

const Course = props => {
    const results = props.data;
    console.log(results)
    let courses = results.map(course => course.title)
    console.log(courses)

    return(
        // <ul className="course--title">
        //    <li>{courses}</li>
        // </ul>
        
        // <h3 className="course--title">{courses}</h3>
        <h3 className="course--title" src={courses}></h3>

    )
}

export default Course;