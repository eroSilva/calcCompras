'use strict';

var LocalData = require('./localData')();
var RenderTemplate = require('./renderTemplate');

var Product = function() {
	function getFormData(form) {
		var mainForm = form;
		var result = {};

		[... mainForm.elements].map(function(element){
			if(element.name !== ''){	
				result[element.name] = element.value;
			};
		});

		return result;
	};

	function buyProduct() {
		var id = this.dataset.id;
		var loadedProducts = LocalData.select('produtos');
		
		loadedProducts.map(function(obj){
			if(obj.id == id)
				obj.amount += 1;
		});

		LocalData.update('produtos', loadedProducts, function(data){
			RenderTemplate.updatePurchase(data);
		});
	};

	formInsert.addEventListener('submit', function(e){
		e.preventDefault();

		var dataProducts = getFormData(this);

		LocalData.insert('produtos', dataProducts, function(data){
			RenderTemplate.insertProduct(dataProducts);
			RenderTemplate.updatePurchase(data);
		});

		Helper.futureSelect('[data-id]', buyProduct);
		
		this.reset();
	});

	window.addEventListener('load', function(){
		var loadedProducts = LocalData.select('produtos');

		RenderTemplate.updatePurchase(loadedProducts);

		loadedProducts.map(function(object){
			RenderTemplate.insertProduct(object);
		});
	});

	Helper.futureSelect('[data-id]', buyProduct);
};

module.exports = Product;