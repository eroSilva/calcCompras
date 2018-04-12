'use strict';

var LocalData = function() {
	var bases = [
		'produtos', 
		'compra'
	];

	for(var item in bases){
		if(!localStorage.getItem(bases[item])){
			localStorage.setItem(bases[item], '[]');
		};
	};
	
	function getItem(baseName) {
		return JSON.parse(localStorage.getItem(baseName));
	};
	
	function setItem(baseName, data) {
		var baseData = getItem(baseName);
		
		data.price = Accounting.unformat(data.price);
		
		baseData.push(data);
		localStorage.setItem(baseName, JSON.stringify(baseData));
	};

	return {
		insert: setItem,
		select: getItem,
	};
};

module.exports = LocalData;