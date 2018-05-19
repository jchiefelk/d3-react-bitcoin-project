let Promise = require('bluebird');
const autocorrelation = require('./build/Release/autocorrelation');
const fetch = require('node-fetch');

function Correlation(){
	this.data = {
		date: null,
		close: null,
		volume: null
	};
}; 
//
Correlation.prototype.quandl_autocorrelation = function(data){
	
	if(data.data!=undefined){
			let object = {	
				'close': []
			};
			for(let x=data.data.length-1; x>=0 ;x--){
				object.close.push(data.data[x].close);
			}
			return new Promise(function(resolve,reject){
				autocorrelation(object,function(results){
					resolve(results);
				});
			});
	}

};
module.exports = new Correlation();



    