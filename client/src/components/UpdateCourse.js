import React, { Component} from 'react';
import axios from 'axios';
import Form from './Form';
import {Redirect} from 'react-router-dom'

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
    

    //when component first mounts(or on reload), makes axios call to API to retrieve the course that matches the ID in the URL
    componentDidMount() {
        const { context } = this.props
        const authUser = context.authenticatedUser;
        const authUseremail = authUser.emailAddress;
        const authUserpass = authUser.password;
        const id = this.props.match.params.id;

        context.data.getCourse(id, authUseremail, authUserpass)
        .then(data => {
            this.setState({ course: data.data, user: data.data.User });
            console.log(user)
            console.log(course)
            console.log(course.data)
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/forbidden')
        })
    //     axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
    //         .then(data => {
    //             this.setState({ course: data.data, user: data.data.User });
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             this.props.history.push('/notfound')
    //         })
    }

    render(){
        // const {
        //     title,
        //     description,
        //     estimatedTime,
        //     materialsNeeded,
        // } = this.state; 

        const { errors } = this.state; 
        const { context } = this.props;
        // console.log(this.state.course)

        const authUser = context.authenticatedUser;

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                {/* {authUser && authUser.id === this.state.course.userId ? */}
                {/* <Form
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
                                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder={this.state.course.title} value={this.state.title} onChange={this.change}/></div>
                                        <p>By: {authUser.firstName} {authUser.lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div><textarea id="description" name="description" placeholder={this.state.course.description} value={this.state.description} onChange={this.change}></textarea></div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder={this.state.course.estimatedTime} value={this.state.estimatedTime} onChange={this.change}/></div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder={this.state.course.materialsNeeded} value={this.state.materialsNeeded} onChange={this.change}></textarea></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                /> */}
                {/* :
                    <Redirect to="/forbidden" />
                } */}
            </div>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const placeholder = event.target.placeholder;
        const value = event.target.value;
        console.log(`${placeholder} is the placeholder`)
        console.log(`${value} is the value`)
        if (value !== placeholder){
            this.setState(() => {
                return {
                    [name]: value
                }
            })
        } else {
            this.setState(() => {
                return {
                    [name]: placeholder
                }
            })
        }
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

        //triggers updateCourse API call on submit
        context.data.updateCourse(id, course, authUseremail, authUserpass)
            .then(errors => {
                if (errors) {
                    this.setState({errors})
                        return { errors: [`Course ${title} was NOT updated in database`] }
                } else {
                    // this.setState(() =>{
                    //     return {
                    //         title: newTitle
                    //     }
                    // })
                    this.props.history.push('/');
                    console.log(`SUCCESS! course ${title} has been updated!`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/forbidden')
            })
    }

    cancel = () => {
        const { from } = this.props.location.state || { from: { pathname: '/' }}
        this.props.history.push(from); //redirects user to previous page or home page

    }
}