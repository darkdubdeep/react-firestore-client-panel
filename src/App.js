import React, { Component } from "react";
import "./App.css";
import NavbarPannel from "./components/layout/NavbarPannel";
import { BrowserRouter as Router, Route, SWitch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavbarPannel />
          <div className="container">
            <h1>Hello</h1>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
