import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./assets/css/App.css";

import CreateTask from "./components/CreateTask";
import CreateUser from "./components/CreateUser";
import EditTask from "./components/EditTask";
import Navigation from "./components/Navigation";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <div className="container">
          <Route exact path="/" component={TaskList} />
          <Route path="/edit/:id" component={EditTask} />
          <Route exact path="/create" component={CreateTask} />
          <Route exact path="/user" component={CreateUser} />
        </div>
      </Router>
    </div>
  );
}

export default App;
