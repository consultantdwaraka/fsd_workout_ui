import React, {Component} from 'react';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleInputValue(event) {
        let element = {[event.target.name]:event.target.value}
        console.log(element)
        this.setState((prevState) =>  Object.assign(prevState, element));
    }
    
    render() {
        return (<div className="row" style={{padding:"10px"}}>
                    <div className="col-sm-9"> <input name="category" value ={this.props.defaultCategory.category} type="text" style={{width:"100%"}} onBlur= {e => this.handleInputValue(e)}/></div>
                    <div className="col-sm-3"> <button onClick={ ()=> {this.props.categoryList({category:this.state.category, id:this.props.defaultCategory.id})}}> + </button> </div> 
                </div>)
    }
}
export default AddCategory;