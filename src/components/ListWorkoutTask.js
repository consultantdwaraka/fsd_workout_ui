import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import request from 'superagent'


const ViewWorkout = (props) => (<div className="panel panel-default" key={props.index}> 
                                        <div className="panel-body">
                                                <div className="row"> 
                                                        <div className="col-sm-12" style={{textAlign:'left'}}>{props.workout.title } </div> 
                                                        <hr/>
                                                </div> 
                                                <div className="row">
                                                        <div className="col-sm-4" > </div> 
                                                        <div className="col-sm-2" style={{paddingTop:"10px"}}> <Link to="/editWorkout" className="btn btn-default"  > Edit </Link> </div> 
                                                        <div className="col-sm-2" style={{paddingTop:"10px"}}> <DeleteWorkout {...props}> </DeleteWorkout> </div>
                                                        <div className="col-sm-2" style={{paddingTop:"10px"}}> <Link to="/startWorkout" className="btn btn-default"  > Start </Link> </div>
                                                        <div className="col-sm-2" style={{paddingTop:"10px"}}> <Link to="/endWorkout" className="btn btn-default disabled"  > End </Link> </div>
                                                </div> 
                                        </div>
                                </div>)
const DeleteWorkout = (props) => (
        <div>
                <button className="btn btn-default" onClick= {e => { e.preventDefault(); 
                 deleteWorkout(props.workout.id).then(res => props.getWorkoutList()) }}> Delete </button>
        </div>
);

const deleteWorkout = (id)=> { return request.delete('http://localhost:8080/deleteWorkout')
.send({id})
.set('Accept','application/json')};

class ListWorkoutTask extends Component {

        constructor(props) {
                super(props)
                this.state = {data:[]};
                this.getWorkoutList = this.getWorkoutList.bind(this);
        }
        componentDidMount() {
                this.getWorkoutList();
        }

        getWorkoutList () {
                return request.get('http://localhost:8080/workouts')
                .then(res => this.setState({data: JSON.parse(res.text)}))
                .catch(error => {
                        console.log('Error fetching workout details!');
                });
        }
        render() {
                return (
                        <div> { this.state.data.map((workout, index) => <ViewWorkout key={index} workout={workout} getWorkoutList= {this.getWorkoutList} index={index}> </ViewWorkout>)}</div>     
                );
        }
} 
export default ListWorkoutTask;