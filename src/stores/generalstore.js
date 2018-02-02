'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

class BitcoinInfo {

	constructor(){
    this.status = {success: false, message: "first load"};
    this.history=null;
    this.autocorrelation=null;
	}

	setHistory(item){

		this.history = item;
	}

  setAutocorrelation(item) {
    this.autocorrelation = item;
    console.log(this.autocorrelation);
  }



};

let Bitcoin = new BitcoinInfo();

var GeneralStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getHistory: function(){
    return Bitcoin.history;
  }

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.BITCOIN_HISTORY:
      Bitcoin.setHistory(action.data.historical_data);
      GeneralStore.emitChange(CHANGE_EVENT);
      break;
    case appConstants.PRICE_AUTOCORR:
      // console.log(action.data);
      Bitcoin.setAutocorrelation(action.data);
      // GeneralStore.emitChange(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});
module.exports = GeneralStore;