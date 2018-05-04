import React, {Component} from 'react';

import LineChart from './LineChart';
import AutoCorrelation from './autocorrelation';
import Header from './header';



export default class Charts extends Component {
	
	render(){

		return (
			<div className="app">
				<Header/>
				<div className="charts">
					<LineChart elementWidth={window.innerWidth} elementHeight={window.innerHeight}/>
					<AutoCorrelation elementWidth={window.innerWidth} elementHeight={window.innerHeight} />
				</div>
			</div>
			);
	}




};