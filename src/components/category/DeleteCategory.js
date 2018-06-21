import React from 'react';
import request from 'superagent';
const deleteCategoryById = (id)=> {
    console.log(`Delete by Id:${id}`)
     return request.delete('http://localhost:8080/deleteCategory')
    .send({id})
    .set('Accept', 'application/json');
    
}
const DeleteCategory = (props) => (<button onClick={(event)=> {event.preventDefault(); deleteCategoryById(props.category.id).then(res => props.fetchCategories())}}> Delete </button> )
export default DeleteCategory;