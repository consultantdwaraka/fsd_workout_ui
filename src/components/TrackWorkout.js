import React from 'react';
import {Bar} from 'react-chartjs-2';


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
        this.state = {data: {week:[650, 590, 800, 810, 560, 550, 40], month:[650, 590, 800, 810], year:[650, 590, 800, 810, 560, 550, 40,50,100,100,150,140]},
                     label: {week:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], month:['Week1', 'Week2', 'Week3', 'Week4'], year:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}};
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