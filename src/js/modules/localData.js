'use strict';

var LocalData = function() {
	var bases = [
		'produtos'
	];

	for(var item in bases){
		if(!localStorage.getItem(bases[item])){
			localStorage.setItem(bases[item], '[]');
		};
	};

	function idGenerator() {
		return Date.now();
	};
	
	function getItem(baseName, id) {
		var baseData = JSON.parse(localStorage.getItem(baseName));
		var results = baseData.filter(function(obj) {
			if(id == undefined || id == obj.id){
				return obj;
			};
		});
		
		return results;
	};
	
	function setItem(baseName, data, fn) {
		var baseData = getItem(baseName);
		var id = idGenerator();

		data.id = id;
		data.amount = +1;
		data.price = parseFloat(data.price);
		
		baseData.push(data);
		localStorage.setItem(baseName, JSON.stringify(baseData));

		return (fn) ? fn(baseData) : null;
	};

	function updateItem(baseName, data, fn) {
		localStorage.setItem(baseName, JSON.stringify(data));

		return (fn) ? fn(data) : null;
	};

	return {
		insert: setItem,
		select: getItem,
		update: updateItem
	};
};

module.exports = LocalData;