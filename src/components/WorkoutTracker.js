import React from 'react';
import WorkoutTrackerDetails from './WorkoutTrackerDetails'

const WorkoutTrackerHeader = () => <div className="well"> <h1>Workout Tracker</h1> </div>

const WorkoutTracker = (props) => (<div className="container" style={{width:"50%"}}>
                                        <WorkoutTrackerHeader /> 
                                        <WorkoutTrackerDetails />
                                    </div>);

export default WorkoutTracker;