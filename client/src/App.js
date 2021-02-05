import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
// import withContext from './Context';

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
    // .then(response => response.json())
      // .then(responseData => {
      //   this.setState({ courses: responseData.data });
      //   console.log(responseData.data)
      // })
      // .catch(error => {
      //   console.log('Error fetching and parsing data', error)
      // })
  }

  render(){
    console.log(this.state.courses);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <ul>
                <li>
                </li>
              </ul>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    )
  }
}
