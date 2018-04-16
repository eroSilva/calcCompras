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
		var id = this.dataset.buy;
		var loadedProducts = LocalData.select('produtos');
		var boughtProduct = {};
		
		loadedProducts.map(function(obj){
			if(obj.id == id){
				obj.amount += 1;
				boughtProduct = obj;
			}
		});

		LocalData.update('produtos', loadedProducts, function(data){
			RenderTemplate.updatePurchase(data);
			RenderTemplate.updateProduct(boughtProduct, id);
		});
	};

	formInsert.addEventListener('submit', function(e){
		e.preventDefault();

		var dataProducts = getFormData(this);

		LocalData.insert('produtos', dataProducts, function(data){
			RenderTemplate.insertProduct(dataProducts);
			RenderTemplate.updatePurchase(data);
		});

		Helper.futureSelect('[data-buy]', buyProduct);
		
		this.reset();
	});

	window.addEventListener('load', function(){
		var loadedProducts = LocalData.select('produtos');

		RenderTemplate.updatePurchase(loadedProducts);

		loadedProducts.map(function(object){
			RenderTemplate.insertProduct(object);
		});
	});

	Helper.futureSelect('[data-buy]', buyProduct);
};

module.exports = Product;