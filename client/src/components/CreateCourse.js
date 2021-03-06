
import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }
    
    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state; 

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    
                                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.change} /></div>
                                    <p>By: {authUser.firstName} {authUser.lastName}</p>
                                </div>
                                
                                <div className="course--description">
                                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.change}></textarea></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.change} /></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.change}></textarea></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                /> 
            </div>
        )
    }

    //when the value of the input field changes, the [name]: value pair is updated accordingly
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

        //triggers createCourse API call on submit
        context.data.createCourse(course, authUseremail, authUserpass)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors})
                        return { errors: ['Course was not created'] }
                } else {
                    this.props.history.push('/');
                    console.log(`SUCCESS! course ${title} has been created!`);
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