var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var Actions = {

  updateHistoricalData: function(item){

      AppDispatcher.handleAction({
        actionType: appConstants.BITCOIN_HISTORY,
        data: item
      });
  
  },


  updateAutocorrelation: function(item){
  	AppDispatcher.handleAction({
  		actionType: appConstants.PRICE_AUTOCORR,
  		data: item
  	});
  }


};


module.exports = Actions;