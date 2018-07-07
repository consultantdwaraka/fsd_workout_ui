import React from 'react';
import {Bar} from 'react-chartjs-2';
import request from 'superagent';

const dataModel = (props) => ({
    labels: props.label,
    datasets: [
      {
        label: `${props.range} Total Calories Burnt: ${props.data.reduce((total, num) => total + num)}`,
        backgroundColor: 'rgba(68, 191, 68,0.2)',
        borderColor: 'rgba(68, 191, 68,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(68, 130, 191,0.4)',
        hoverBorderColor: 'rgba(68, 130, 191,1)',
        data: props.data
      }
    ]
  });

  const YearWorkout = (props) => <div>
                                    <h2>&nbsp;&nbsp;&nbsp;</h2>
                                        <Bar
                                        data={dataModel(props)}
                                        width={100}
                                        height={200}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                        />
                                </div>

const MonthWorkout = (props) => <div>
                                    <h2>   &nbsp; &nbsp;   &nbsp;</h2>
                                        <Bar
                                        data={dataModel(props)}
                                        width={100}
                                        height={200}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                        />
                                </div>

const WeekWorkout = (props) => <div>
                                    <h2>   &nbsp; &nbsp;   &nbsp;</h2>
                                        <Bar
                                        data={(dataModel(props))}
                                        width={100}
                                        height={200}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                        />
                                </div>

class TrackWorkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {week:[0,0,0,0,0,0,0], month:[0,0,0,0,0], year:[0,0,0,0,0,0,0,0,0,0,0,0]},
                     label: {week:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], month:['Week1', 'Week2', 'Week3', 'Week4'], year:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}};
    }
    componentDidMount() {
        this.trackWorkoutDetails();
    }

    trackWorkoutDetails = () => {
        request.get('http://localhost:8080/trackWorkout')
               .then(res => this.setState(prevState => Object.assign(prevState.data, {week:JSON.parse(res.text).dailyWorkouts}, {month:JSON.parse(res.text).weeklyWorkouts}, {year:JSON.parse(res.text).monthlyWorkouts})));
    }

    render() {
        return(
            <div>
                    <WeekWorkout {...this.props} range="Week" data={this.state.data.week} label={this.state.label.week}> </WeekWorkout>
                    <MonthWorkout {...this.props} range="Month" data={this.state.data.month} label={this.state.label.month}> </MonthWorkout>
                    <YearWorkout {...this.props} range="Year" data={this.state.data.year} label={this.state.label.year}> </YearWorkout>
            </div>
        );
    }

}
export default TrackWorkout;