import React from 'react';
import request from 'superagent';
import moment from 'moment';
class EndWorkout extends React.Component {
    constructor(props){
        super(props);
        this.state = {workoutFormData:{}};
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    componentDidMount() {
        this.getWorkoutInfo(this.props.match.params.id);
    }

    getWorkoutInfo(id) {
        console.log(`Id: ${id}`);
        if(id) {
        request.get(`http://localhost:8080/getWorkout?id=${id}`)
        .then(res => {this.setState(prevState => Object.assign(prevState.workoutFormData, JSON.parse(res.text), {endDate: moment().format('DD-MM-YYYY')}, { endTime: moment().format('HH:MM')}))})
        .catch(error => {
                console.log('Error fetching workout details!');
        });
    }
    }

    handleInputValue(event) {
        let element = {[event.target.name]:event.target.value}
        this.setState((prevState) =>  Object.assign(prevState.workoutFormData, element));
    }
    handleFormSubmission(event) {
        event.preventDefault();
        request.post('http://localhost:8080/startWorkout')
                .send(this.state.workoutFormData)
                .set('Accept', 'application/json')
               .then(res => this.props.history.push('/workouts'));
    }

    render() {
        return (<form className="form-horizontal" onSubmit= {this.handleFormSubmission}>
                <div className="form-group">
                    <div class="col-xs-12">
                    <label className="control-label col-xs-12" htmlFor="heading" style={{textAlign:"center"}}>End Workout</label>
                    </div>
                </div>
                <div className="form-group">
                <label className="control-label col-xs-4" htmlFor="title">Title:</label>
                    <div class="col-xs-8">
                        <input name="title" className="form-control" value= {this.state.workoutFormData.title?this.state.workoutFormData.title:""} onChange={this.handleInputValue}/> 
                    </div>
                </div>
                <div className="form-group">
                <label className="control-label col-xs-4" htmlFor="comment">Comment:</label>
                    <div class="col-xs-8" >
                        <textarea name="note" className="form-control" rows="5" value= {this.state.workoutFormData.note?this.state.workoutFormData.note:""} onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                <label className="control-label col-xs-4" htmlFor="startDate">End Date:</label>
                    <div class="col-xs-8">
                        <input  name="endDate" className="form-control"   value ={this.state.workoutFormData.endDate} onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                <label className="control-label col-xs-4" htmlFor="startTime">End Time:</label>
                    <div class="col-xs-8">
                        <input name="endTime" className="form-control"  value ={this.state.workoutFormData.endTime} onChange={this.handleInputValue} />
                    </div>
                </div>
                <div className="form-group">
                    <div class="col-xs-12">
                        <button type="submit" class="btn btn-default"> End</button>  <button type="button" class="btn btn-default" onClick={e => this.props.history.push('/workouts')}> Cancel</button>
                    </div>
                </div>
                    
        </form>);
    }
}
export default EndWorkout;