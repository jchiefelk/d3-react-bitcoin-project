var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');



var Actions = {

  updateHistoricalData: function(item){

      //console.log(item);
     
      AppDispatcher.handleAction({
        actionType: appConstants.BITCOIN_HISTORY,
        data: item
      });
  
  }

};


module.exports = Actions;