import React, { Component } from 'react';
import request from 'superagent';

class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {categoryList:[], categoryFormData:{}};
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }
    
    componentDidMount() {
        this.fetchCategories();
    }

    getWorkoutInfo(id) {
        if(id) {
        request.get(`http://localhost:8080/getWorkout?id=${id}`)
        .then(res => {let workout = JSON.parse(res.text);
            console.log(`This is a test: ${workout.title}`);
                      this.setState(prevState => Object.assign(prevState.categoryFormData, workout))})
        .catch(error => {
                console.log('Error fetching workout details!');
        });
    }
    }

    fetchCategories = () => {
        request.get('http://localhost:8080/listCategories')
        .then(res => {let categories = JSON.parse(res.text);
                      this.setState(prevState => ( {categoryList:[...categories]}));
                      this.getWorkoutInfo(this.props.match.params.id)})
        .catch(error => {
                console.log('Error fetching workout details!');
        });
    }
    handleInputValue(event) {
        let element = {[event.target.name]:event.target.value}
        console.log(element)
        this.setState((prevState) =>  Object.assign(prevState.categoryFormData, element));
    }
    handleFormSubmission(event) {
        event.preventDefault();
        request.post('http://localhost:8080/addWorkout')
                .send(this.state.categoryFormData)
                .set('Accept', 'application/json')
               .then(res => this.props.history.push('/workouts'));
    }

    render() {
        return (
            <div>
            <h2> Add Workout</h2>
            <form className="form-horizontal" onSubmit= {this.handleFormSubmission}>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="title">Title:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name= "title" id="title" value={this.state.categoryFormData.title} autoComplete="off" onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Note:</label>
                    <div className="col-sm-8">
                        <textarea className="form-control" name= "note" rows="5" value= {this.state.categoryFormData.note} id="note" onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Calories Burnt Per Min:</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" autoComplete = "off" name="calories" id="calories" value={this.state.categoryFormData.calories} onChange={this.handleInputValue}/>
                    </div>
                    <div className="col-sm-1">
                        <button id="addCalories" > + </button>
                    </div>
                    <div className="col-sm-1">
                        <button id="reduceCalories" > - </button>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Category:</label>
                    <div className="col-sm-8">
                    <select className="form-control" id="category" name="category" value= {this.state.categoryFormData.category} onChange={this.handleInputValue}>
                      <option value="none">Select Category</option>
                      {
                         this.state.categoryList.map((element, index) => <option key={index} value={element.id}>{element.category}</option>) 
                      }
                    </select>
                    </div>
                </div>
                <div className="form-group">
                   {!this.props.match.params.id ? 
                    (<div className="col-sm-12">
                        <button id="note" > Add Workout</button>
                    </div>) : (<div className="col-sm-12">
                        <button id="note" > Edit Workout</button>
                        <button id="note" style={{marginLeft:"10px"}} onClick={e => this.props.history.push('/workouts')}> Cancel</button>
                    </div> )}
                </div>
            </form>
            </div>
        );
    }
}

export default CreateWorkout;