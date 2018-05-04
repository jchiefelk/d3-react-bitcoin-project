import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/line-chart.css';
import './css/main.css';

ReactDOM.render(
  	<BrowserRouter>
		<Routes/>
	</BrowserRouter>,
  document.getElementById('root')
);