import request from 'superagent';
const intialState = {workouts: []};

const getWorkoutList = ()=> {
    return request.get('http://localhost:8080/workouts')
    .then(res => JSON.parse(res.text))
    .catch(error => {
            console.log('Error fetching workout details!');
    });
}

const workoutReducer = (state = intialState, action) => {
    switch(action.type) {
        case 'LIST_WORKOUTS':
            return [...state, {workouts: [{title:'sample title', note:'sample note'}]}]
    }
    return [...state, {workouts: [{title:'sample title', note:'sample note'}]}];
}
export default workoutReducer;