import logo from './logo.svg';
// import '././styles/global.css';
import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from 'react-router-dom';

// import withContext from './Context';
import Header from './components/Header';
import CourseDetails from './components/CourseDetails';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  async componentDidMount(){
    const response = await fetch('http://localhost:5000/api/courses')
    const json = await response.json();
    this.setState({ courses: json })  
  }

  render(){
          console.log(this.state.courses);
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route path="/" component={Courses}/>
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            {/* <Route path="/usersignout" component={UserSignOut} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}
