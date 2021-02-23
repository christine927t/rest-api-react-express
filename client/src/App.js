import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

import withContext from './Context';
const UserSignInWithContext = withContext(UserSignIn); //gives context to each component
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse)

const App = () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/courses" Redirect to="/" component={Courses} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route exact path="/" component={Courses} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default App;
