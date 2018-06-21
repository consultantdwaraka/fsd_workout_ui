import React, { Component } from 'react';
import request from 'superagent';

class CreateWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {categoryList:[], categoryFormData:{}};
        this.fetchCategories();
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    fetchCategories = () => {
        request.get('http://localhost:8080/listCategories')
        .then(res => {let categories = JSON.parse(res.text);
                      this.setState(prevState => ( {categoryList:[...categories]}))})
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
               .then();
    }

    render() {
        return (
            <div>
            <h2> Add Workout</h2>
            <form className="form-horizontal" onSubmit= {this.handleFormSubmission}>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="title">Title:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name= "title" id="title" onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Note:</label>
                    <div className="col-sm-8">
                        <textarea className="form-control" name= "note" rows="5" id="note" onChange={this.handleInputValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-4" htmlFor="note">Calories Burnt Per Min:</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" name="calories" id="calories" onChange={this.handleInputValue}/>
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
                    <select className="form-control" id="category" name="category" onChange={this.handleInputValue}>
                      <option value="none">Select Category</option>
                      {
                         this.state.categoryList.map((element, index) => <option key={index} value={element.id}>{element.category}</option>) 
                      }
                    </select>
                    </div>
                </div>
                <div className="form-group">
                    
                    <div className="col-sm-12">
                        <button id="note" > Add Workout</button>
                    </div>
                </div>
            </form>
            </div>
        );
    }
}

export default CreateWorkout;