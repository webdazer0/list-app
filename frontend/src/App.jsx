import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/css/App.css';

import CreateTask from './components/CreateTask';
import CreateUser from './components/CreateUser';
import EditTask from './components/EditTask';
import NavBar from './components/Navbar';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={TaskList} />
            <Route path="/edit/:id" component={EditTask} />
            <Route exact path="/create" component={CreateTask} />
            <Route exact path="/user" component={CreateUser} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
