import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/App.css';

import Navigation from './components/Navigation';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <div className="container">
          <Route exact path="/" component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route exact path="/create" component={CreateExercise} />
          <Route exact path="/user" component={CreateUser} />
        </div>
      </Router>
    </div>
  );
}

export default App;
