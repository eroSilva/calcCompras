var LocalData = require('./modules/localData')();
var Purchase = require('./modules/purchaseSum')();
var sumButton = document.querySelectorAll('[data-product]');


sumButton.forEach(function(elem){
	this.addEventListener('click', function(){
		Purchase.sumValue(1);
	});
});