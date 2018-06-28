import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import ListWorkouts from './ListWorkoutTask';
import CreateWorkout from './CreateWorkout';
import Category from './Category';
import TrackWorkout from './TrackWorkout';
import StartWorkout from './Task/StartWorkout';
import EndWorkout from './Task/EndWorkout';

const style = {
    paddingRight: '20px',
    fontSize:'20px'
}
class WorkoutTrackerDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="well"> 
                                                
                <ul className="list-inline">
                    <li style= {style} > <Link to="/workouts" > View All </Link> </li>
                    <li style= {style} > <Link to="/createWorkout" > Create </Link> </li> 
                    <li style= {style} > <Link to="/category" > Category </Link> </li>
                    <li style= {style} > <Link to="/trackWorkout" > Track </Link> </li>
                </ul>
                <hr/>
                <Switch>
                    <Redirect path="/" exact to="workouts" />
                    <Route path="/workouts" component={ListWorkouts} />
                    <Route path="/createWorkout" component={CreateWorkout} />
                    <Route path="/editWorkout/:id" component={CreateWorkout} />
                    <Route path="/category" component={Category} />
                    <Route path="/trackWorkout" component={TrackWorkout} />
                    <Route path="/startWorkout/:id" component={StartWorkout} />
                    <Route path="/endWorkout/:id" component={EndWorkout} />
                </Switch>
            </div>  
        );
    }
} 
export default WorkoutTrackerDetails;