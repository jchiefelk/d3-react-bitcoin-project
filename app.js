const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
let Correlation = require('./correlation');
app.set('port',process.env.PORT || 3000);
app.use(express.static(path.resolve(__dirname,'./','bundle')));
app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'./','bundle'));
});

let entire_history = {
	'one': 'https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT'
};

let data = {
	'one': {
		history: null,
		correlation: null
	}
};

app.get('/api', function(req,res){  
	fetch('https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT',{
		method: 'get',
		mode: 'cors'
	})
	.then((response) => typeof response == 'object' ? response.json() : {} )
	.then((responseJson)=>{
		console.log(responseJson.dataset.data);
		return Correlation.quandl_autocorrelation(responseJson.dataset.data)
	})
	.then((results)=>{
		crashData.three['correlation'] = results;
		res.json({crashdata: crashData}); 
	})
	.catch((err)=>{
		console.log(err);
		res.json({error: error});
		next(error);
	})  
});


app.listen(app.get('port'), ()=>{
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});