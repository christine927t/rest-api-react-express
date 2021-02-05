import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import withContext from './Context';

let listCourses = withContext(Component)
console.log(listCourses)

function App() {
      // attempting api call here instead of Data.js
    listCourses = async () =>{
        const response = await this.data.getCourses();
        console.log(response)
        if (response.status === 200){
            console.log('Successfully getting courses!')
            return response.json().then(data => data)
        }
        else if (response.status === 401) {
          console.log('Not getting courses!')
          return null;
        }
        else {
          console.log('Not getting courses!')
          throw new Error();
        }
    }
  // console.log(this.data.getCourses())

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <ul>
              <li>
                {listCourses.response}
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

export default App;
