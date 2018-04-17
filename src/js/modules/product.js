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

	
	// Funções para realizar a compra do produto
	function buyProduct() {
		var id = Helper.classInParent(this, 'product-items').dataset.product;
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

	function setBuyAction() {
		Helper.futureSelect('.product-items .product-add').then(function(elements) {
			elements.map(function(element) {
				element.addEventListener('click', buyProduct);
			});
		});
	};



	// Funções para deletar um produto dacompra
	function deleteProduct() {
		var productElem = Helper.classInParent(this, 'product-items');
		var id = productElem.dataset.product;
		var loadedProducts = LocalData.select('produtos');
		var deletedProduct = {};

		loadedProducts.map(function(obj, index){
			if(obj.id == id){
				obj.amount -= 1;
				deletedProduct = obj;
			}
			
			if(obj.amount == 0){
				productElem.remove();
				loadedProducts.splice(index, index+1);
			}
		});

		LocalData.update('produtos', loadedProducts, function(data){
			RenderTemplate.updatePurchase(data);
			RenderTemplate.updateProduct(deletedProduct, id);
		});
	};

	function removeDeleteActions() {
		[... document.querySelectorAll('.product-items')].map(function(element){	
			element.classList.remove('open');
		});
	};

	function setDeleteAction() {
		Helper.futureSelect('.product-items').then(function(elements) {
			elements.map(function(element) {
				var touchTimeout;
				
				element.addEventListener('touchstart', function(){
					touchTimeout = setTimeout(function(){
						removeDeleteActions();
						element.classList.toggle('open');
					}, 200);
				});
				
				element.addEventListener('touchend', function(){
					clearTimeout(touchTimeout);
				});
			});
		});
		
		Helper.futureSelect('.product-items .product-delete').then(function(elements) {
			elements.map(function(element) {
				element.addEventListener('click', deleteProduct);
			});
		});		
	};



	// Eventos
	formInsert.addEventListener('submit', function(e) {
		e.preventDefault();

		var dataProducts = getFormData(this);

		LocalData.insert('produtos', dataProducts, function(data) {
			RenderTemplate.insertProduct(dataProducts);
			RenderTemplate.updatePurchase(data);
		});

		setBuyAction();
		setDeleteAction();
		
		this.reset();
	});

	window.addEventListener('load', function() {
		var loadedProducts = LocalData.select('produtos');

		RenderTemplate.updatePurchase(loadedProducts);

		loadedProducts.map(function(object) {
			RenderTemplate.insertProduct(object);
		});
	});

	document.addEventListener('touchstart', function(){	
		if(!Helper.classInParent(event.srcElement, 'product-list')){
			removeDeleteActions();			
		};
	});

	setBuyAction();
	setDeleteAction();
};

module.exports = Product;