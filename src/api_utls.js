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

	getCorrelationData(data){

		let obj= {
			data: data
		};
	
		return fetch('/api', {
            method: 'post',
            mode: 'cors',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
		})
		.then((response) => {return response.json()} )
		.then((data)=> {
		 Actions.updateAutocorrelation(data.autocorrdata);
		})
		.catch((err)=> {console.log(err)});
	}

	getHistoricalData() {
		return fetch('/history', {
				method: 'get',
				mode: 'cors'
			})
			.then((response)=> {return response.json()})
			.then((data)=> {
				Actions.updateHistoricalData(data);
			})
			.then((err)=> {console.log(err)})
	}


}

module.exports = new API();