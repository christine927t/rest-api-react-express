
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

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
        const { title } = this.state;
        const id = this.props.match.params.id;
        console.log(id)

        context.data.deleteCourse(id, authUseremail, authUserpass)
            .then(errors => {
                if (errors) {
                    this.setState({errors})
                        return { errors: [`Course ${title} was NOT deleted from database`] }
                } else {
                    this.props.history.push('/');
                    alert(`SUCCESS! course ${title} has been deleted!`);
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
        const estimatedTimeMarkdown = ` #### Estimated Time \n\n ### ${this.state.course.estimatedTime}`
        const materialsNeededMarkdown = `* ${this.state.course.materialsNeeded}`

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
                                    <ReactMarkdown source={estimatedTimeMarkdown}/>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={materialsNeededMarkdown}/>
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