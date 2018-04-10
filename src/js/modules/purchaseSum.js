'use strict';

var Purchase = function() {
	function sumValuePurchase(value){
		// data.total += value;
	}

	function sumQtdPurchase(value){
		// data.total += value;
	}

	return {
		sumValue: sumValuePurchase,
		sumQtd: sumQtdPurchase
	}
};

module.exports = Purchase;