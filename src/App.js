import React, { Component } from 'react';
import WorkoutTracker from './components/WorkoutTracker';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorkoutTracker />
      </div>
    );
  }
}

export default App;
