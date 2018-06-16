import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import request from 'superagent'


const ViewWorkout = (props) => <div className="panel panel-default" key={props.index}> <div className="panel-body"> <div className="row"> <div className="col-sm-9">{props.workout.title} </div> <div className="col-sm-1"> <Link to="/category" className="btn btn-default" > Edit </Link> </div> <div className="col-sm-2"> <Link to="/category" className="btn btn-default" > Remove </Link> </div></div> </div></div>

class ListWorkoutTask extends Component {

        constructor(props) {
                super(props)
                this.state = {data:[]};
                this.getWorkoutList = this.getWorkoutList.bind(this);
        }
        componentDidMount() {
                this.getWorkoutList().then(data => this.setState({data:data}));
        }

        getWorkoutList () {
                return request.get('http://localhost:8080/workouts')
                .then(res => JSON.parse(res.text))
                .catch(error => {
                        console.log('Error fetching workout details!');
                });
        }
        render() {
                return (
                        <div> { this.state.data.map((workout, index) => <ViewWorkout key={index} workout={workout} index={index}> </ViewWorkout>)}</div>     
                );
        }
} 
export default ListWorkoutTask;