'use strict';

var LocalData = require('./localData')();
var RenderTemplate = require('./renderTemplate');

var Product = function() {
	var touchTimeout;

	
	// Pegando Formdata
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

	// Setando altura para o HTML
	function fixHeight() {
		document.querySelector('html').style.height = window.innerHeight + 'px';
	}

	
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
		var updatedProducts = {};
		var deletedProduct = {};

		updatedProducts = loadedProducts.filter(function(obj){
			if(obj.id == id){
				obj.amount -= 1;
				deletedProduct = obj;
			};

			return obj.amount > 0;
		});

		LocalData.update('produtos', updatedProducts, function(data){
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
				element.addEventListener('touchstart', function(){
					clearTimeout(touchTimeout);

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

		fixHeight();
	});

	window.addEventListener('resize', function(){
		fixHeight();
	});

	document.addEventListener('touchstart', function(){	
		if(!Helper.classInParent(event.srcElement, 'product-list')){
			removeDeleteActions();			
		};
	});

	productList.addEventListener('scroll', function(){
		removeDeleteActions();
		clearTimeout(touchTimeout);
	});

	setBuyAction();
	setDeleteAction();
};

module.exports = Product;