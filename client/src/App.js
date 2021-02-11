// import logo from './logo.svg';
// import '././styles/global.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import CourseDetails from './components/CourseDetails';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

import withContext from './Context';
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      users: []
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:5000/api/courses')
    const json = await response.json();
    this.setState({ courses: json })
  }

  render() {
    console.log(this.state.courses);
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            {/* <Route path="/usersignout" component={UserSignOut} /> */}
            <Route exact path="/" component={Courses} />
          </Switch>
        </div>
      </Router>
    )
  }
}
