import React from 'react';

const ListCategories = (props) => <div className="row" style={{padding:"10px"}} key = {props.index}>
                                        <div className="col-sm-9"> {props.category} </div>
                                        <div className="col-sm-3"> <button> Edit </button> <button> Delete </button> </div> 
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
    }
    addToCategories = (category) => {this.setState(prevState => ( {categoryList:[category, ...prevState.categoryList,]}))}; 

    render() {
        return (<div> <h3>Add Category </h3>
            <AddCategory categoryList= {this.addToCategories} > </AddCategory>
            {this.state.categoryList.map((category, index) => (
            <ListCategories key ={index}  index={index} category={category} > </ListCategories> ))}
       </div>);
    }
}
export default Category