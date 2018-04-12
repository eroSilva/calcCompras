'use strict';

var Product = function() {
	var productView = {
		list: document.getElementById('productList'),
		formInsert: document.getElementById('formInsert')
	};

	function getFormData(form){
		var mainForm = form;
		var result = {};
		
        for(var i = 0; i < mainForm.elements.length; i++){
            if(mainForm.elements[i].name == '') continue;

            result[mainForm.elements[i].name] = mainForm.elements[i].value;
		};

		return result;
	};

	function renderHTML(data, template) {
		var productElm = RenderTemplate[template](data);

		productView.list.insertAdjacentHTML('afterbegin', productElm);
	};

	window.addEventListener('load', function(){
		var loadedProducts = LocalData.select('produtos');

		for(var product in loadedProducts){
			renderHTML(loadedProducts[product], 'produtos');
		};
	});

	formInsert.addEventListener('submit', function(e){
		e.preventDefault();

		var data = getFormData(this);

		renderHTML(data, 'produtos');
		LocalData.insert('produtos', data);
		
		this.reset();
	});
};

module.exports = Product;