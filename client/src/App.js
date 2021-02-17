// import logo from './logo.svg';
// import '././styles/global.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import CourseDetails from './components/CourseDetails';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

import withContext from './Context';
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseDetailsWithContext = withContext(CourseDetails);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        {/* <PrivateRoute path="/authenticated" component={Authenticated} /> */}
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
        <PrivateRoute path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id" component={CourseDetailsWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/" component={Courses} />
      </Switch>
    </div>
  </Router>
)
