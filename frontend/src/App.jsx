import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/css/App.css';

import CreateTask from './components/CreateTask';
import CreateUser from './components/CreateUser';
import EditTask from './components/EditTask';
import NavBar from './components/Navbar';
import TaskList from './components/TaskList';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={TaskList} />
            <Route exact path="/task/create" component={CreateTask} />
            <Route path="/task/:id" component={EditTask} />
            <Route exact path="/user" component={UserList} />
            <Route exact path="/user/create" component={CreateUser} />
            <Route path="*">
              <h1>NOT FOUND</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
