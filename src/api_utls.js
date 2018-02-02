var Actions = require('./actions/actions');




class API {
	

	getCrashAnalysis(){

		return fetch('/api',{
			method: 'get',
			mode: 'cors'
		})
		.then((response) => {return response.json()} )
		.then((data)=> {return data.crashdata})
		.catch((err)=> {console.log(err)})

	}

	getCorrelationData(){

	}

	getHistoricalData() {
		return fetch('/history', {
				method: 'get',
				mode: 'cors'
			})
			.then((response)=> {return response.json()})
			.then((data)=> {
				// return data;
				//console.log('api utilities');
				// console.log(data);
				Actions.updateHistoricalData(data);
			})
			.then((err)=> {console.log(err)})
	}


}

module.exports = new API();