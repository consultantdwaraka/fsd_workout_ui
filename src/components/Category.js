import React from 'react';
import request from 'superagent';
import DeleteCategory from './category/DeleteCategory';

const ListCategories = (props) => <div className="row" style={{padding:"10px"}} key = {props.index}>
                                        <div className="col-sm-9"> {props.category.category} </div>
                                        <div className="col-sm-3"> <button> Edit </button> <DeleteCategory {...props}></DeleteCategory> </div> 
                                   </div> 



const AddCategory = (props) => <div className="row" style={{padding:"10px"}}>
                                <div className="col-sm-9"> <input name="categoryName" type="text" style={{width:"100%"}} ref= {(input) => {this.input =input}} /></div>
                                <div className="col-sm-3"> <button onClick={ ()=> {let value = this.input.value; this.input.value= ''; props.categoryList(value)}}> + </button> </div> 
                           </div>


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {categoryList:[]};
        this.addToCategories = this.addToCategories.bind();
        this.fetchCategories();
    }
    addToCategories = (category) => {this.saveCategory(category)}; 
    saveCategory = (category) => { request
                                        .post('http://localhost:8080/addCategory')
                                        .send({'category':category})
                                        .set('Accept','application/json')
                                        .then(res => {console.log('Done!..'); this.fetchCategories()})};
    fetchCategories = () => {
        console.log(`Fetching categories.....`);
        request.get('http://localhost:8080/listCategories')
        .then(res => {let categories = JSON.parse(res.text);
                      this.setState(prevState => ( {categoryList:[...categories]}))})
        .catch(error => {
                console.log('Error fetching workout details!');
        });
    }
    render() {
        return (<div> <h3>Add Category </h3>
            <AddCategory categoryList= {this.addToCategories} > </AddCategory>
            {this.state.categoryList.map((category, index) => (
            <ListCategories key ={index}  index={index} category={category} fetchCategories={this.fetchCategories} > </ListCategories> ))}
       </div>);
    }
}
export default Category