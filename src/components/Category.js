import React from 'react';
import request from 'superagent';
import AddCategory from './category/AddCategory';
import DeleteCategory from './category/DeleteCategory';

const ListCategories = (props) => <div className="row" style={{padding:"10px"}} key = {props.index}>
                                        <div className="col-sm-9"> {props.category.category} </div>
                                        <div className="col-sm-3"> <button onClick={e => props.handleEditCategory(props.category)}> Edit </button> <DeleteCategory {...props}></DeleteCategory> </div> 
                                   </div> 


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {categoryList:[], category:{}};
        this.addToCategories = this.addToCategories.bind();
        this.fetchCategories();
    }
    addToCategories = (category) => {this.saveCategory(category)}; 
    saveCategory = (category) => { request
                                        .put('http://localhost:8080/addCategory')
                                        .send(category)
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

    handleEditCategory = (category) => {
        this.setState({category});
     }
    render() {
        return (<div> <h3>Add Category </h3>
            <AddCategory categoryList= {this.addToCategories} defaultCategory= {this.state.category}> </AddCategory>
            {this.state.categoryList.map((category, index) => (
            <ListCategories key ={index}  index={index} category={category} handleEditCategory = {this.handleEditCategory} fetchCategories={this.fetchCategories} > </ListCategories> ))}
       </div>);
    }
}
export default Category