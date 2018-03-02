const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
let Correlation = require('./correlation');
var bodyParser = require('body-parser');




// Required for POST Requests
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Set Port
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.resolve(__dirname,'./','bundle')));



app.post('/api', function(req,res){

  	console.log('post post');
  	// console.log(req.body);
  	Correlation.quandl_autocorrelation(req.body)
  		.then((results)=>{
  	
			res.json({autocorrdata: results}); 
		})
		.catch((err)=>{
			console.log(err);
			res.json({error: error});
			next(error);
		})

});


/**
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
***/

app.get('/history', function(req,res){

	let historicalprice = null;

	fetch('https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=QmmQMekx-LKbhz9eu47w',{
      method: 'get',
      mode: 'cors'
    })
    .then((response) => typeof response == 'object' ? response.json() : {} )
    .then((responseJson)=> {

   
      // res.json({historical_data: responseJson.dataset.data});
      historicalprice = responseJson.dataset.data;
      // this.dataFromTSV(history_data);
      return Correlation.quandl_autocorrelation(responseJson.dataset.data);
    })
 	.then((results)=>{

 		// console.log(results); 

		res.json({
			historical_data: historicalprice,
			autocorrdata: results
		}); 
	})



    .catch((err)=>{
      console.log(err);
      res.json({error: error});
      next(err);
    });
});


app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'./','bundle'));
});


app.listen(app.get('port'), ()=>{
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});