import React, { Component } from 'react';
import request from 'superagent';

class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {categoryList:[], categoryFormData:{calories:0}};
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }
    
    componentDidMount() {
        this.fetchCategories();
    }

    getWorkoutInfo(id) {
        if(id) {
        request.get(`http://localhost:8080/getWorkout?id=${id}`)
        .then(res => {this.setState(prevState => Object.assign(prevState.categoryFormData, JSON.parse(res.text)))})
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
        this.setState((prevState) =>  Object.assign(prevState.categoryFormData, element));
    }

    handleFormSubmission(event) {
        event.preventDefault();
        if(this.state.categoryFormData.title && this.state.categoryFormData.category && this.state.categoryFormData.calories) {
            request.post('http://localhost:8080/addWorkout')
                    .send(this.state.categoryFormData)
                    .set('Accept', 'application/json')
                .then(res => this.props.history.push('/workouts'));
        }
    }

    incrementCalaries = (event) => {
        event.preventDefault();
        this.setState((prevState) => Object.assign(prevState.categoryFormData, {'calories': ++prevState.categoryFormData.calories}));
    }

    decrementCalaries = (event) => {
        event.preventDefault();
        this.setState((prevState) => Object.assign(prevState.categoryFormData, {'calories': prevState.categoryFormData.calories> 0 ? --prevState.categoryFormData.calories:0}));
    }

    render() {
        return (
            <div>
            {!this.props.match.params.id ? <h2> Add Workout</h2>:<h2> Edit Workout</h2> }
            <form className="form-horizontal" onSubmit= {this.handleFormSubmission}>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="title">Title:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name= "title" value={this.state.categoryFormData.title?this.state.categoryFormData.title:""} id="title" autoComplete="off" onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Note:</label>
                    <div className="col-sm-8">
                        <textarea className="form-control" name= "note" rows="5" value= {this.state.categoryFormData.note?this.state.categoryFormData.note:""} id="note" onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Calories Burnt Per Min:</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" autoComplete = "off" name="calories" id="calories" value={this.state.categoryFormData.calories?this.state.categoryFormData.calories:""} onChange={this.handleInputValue}/>
                    </div>
                    <div className="col-sm-1">
                        <button id="addCalories" onClick={this.incrementCalaries} > + </button>
                    </div>
                    <div className="col-sm-1">
                        <button id="reduceCalories" onClick={this.decrementCalaries}> - </button>
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
                        <button  className={this.state.categoryFormData.title && this.state.categoryFormData.category && this.state.categoryFormData.calories? "btn btn-default":"btn btn-default disabled"} id="note" > Add Workout</button>
                    </div>) : (<div className="col-sm-12">
                        <button id="note" className="btn btn-default"> Edit Workout</button>
                        <button id="note" className="btn btn-default" style={{marginLeft:"10px"}}  onClick={e => this.props.history.push('/workouts')}> Cancel</button>
                    </div> )}
                </div>
            </form>
            </div>
        );
    }
}

export default CreateWorkout;