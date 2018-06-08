import React from 'react';

const style = {
    paddingRight: '20px',
    fontSize:'20px'
}

const WorkoutTrackerDetails = (props) => <div className="well"> 
                                                <ul className="list-inline">
                                                    <li style= {style} > <a href="#" > View All </a> </li>
                                                    <li style= {style} > <a href="#" > Create </a> </li>
                                                    <li style= {style} > <a href="#" > Category </a> </li>
                                                    <li style= {style} > <a href="#" > Tracker </a> </li>
                                                </ul>
                                         </div> 

export default WorkoutTrackerDetails;