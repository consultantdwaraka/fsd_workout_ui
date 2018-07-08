import React, {Component} from 'react';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { error:{}};
        this.validate = this.validate.bind(this);
    }
    componentDidMount() {
        this.setState({category: this.props.defaultCategory.category})
    }
    componentWillReceiveProps() {
        this.setState({category: this.props.defaultCategory.category}) 
        this.setState({action: this.props.action});
    }
    handleInputValue(event) {
        this.setState((prevState) =>Object.assign(prevState, {error:''}));
        if(event.target.value) {
            let element = {[event.target.name]:event.target.value}
            console.log(element)
            this.setState((prevState) =>  Object.assign(prevState, element));
        } else {
            this.setState((prevState) =>Object.assign(prevState, {error:'Provide a valid category name'}));
        }
    }
    validate(){
        if(!this.state.category) {
            this.setState((prevState) =>Object.assign(prevState, {error:'Provide a valid category name'}));
            return false;
        }
        return true;
    }
    
    render() {
        return (<div>
                <h3>{this.state.action? 'Edit Category':'Add Category' } </h3>
                <div className="row" style={{padding:"10px"}}>
                    <div className="col-sm-9" style={{textAlign:"left"}}> <input name="category" value ={this.state.category} type="text" style={{width:"100%"}} onBlur= {e => this.handleInputValue(e)}/></div>
                    <div className="col-sm-3"> <button onClick={ ()=> {if(this.validate()) {this.props.categoryList({category:this.state.category, id:this.props.defaultCategory.id});  this.setState({category:''})}}}> + </button> </div> 
                </div>
               
                <div className="row" style={{padding:"10px", color:'red'}}>
                   <p> {`${this.state.error === 'Provide a valid category name'?this.state.error:''}`} </p>
                </div> 
              
                </div>)
    }
}
export default AddCategory;