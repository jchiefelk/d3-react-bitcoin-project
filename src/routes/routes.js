import React from 'react';
import { Route,  Switch } from 'react-router-dom';
import Charts from '../components/charts';
import Finance from '../components/finance';
import Computers from '../components/computers';
import Science from '../components/science'
import {hashHistory} from 'react-router';

const Routes = () => (
	  		<div>
	  			<Switch>
				    <Route exact path="/" component={Charts} />
				    <Route exact path="/science" component={Science}/>
				    <Route exact path="/computers" component={Computers}/>
				    <Route exact path="/science" component={Science} />
		 		</Switch>
		    </div>
);

export default Routes;