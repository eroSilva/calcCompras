'use strict';

// Reconfigurando a Lib para padrão Brasileiro
Accounting.settings.symbol = '';
Accounting.settings.decimal = ",";
Accounting.settings.thousand = ".";


var RenderTemplate = function() {
	
	// Renderizador de produtos
	function productRender(data) {
		data.price = Accounting.formatMoney(data.price);

		return `
			<li class="product-items">
				<h3 class="product-name">${data.name}</h3>
				<strong class="product-price">R$ <span class="price-value">${data.price}</span></strong>
				<button type="button" class="btn product-add" data-id="${data.id}">Buy</button>
			</li>
		`;
	};

	return {
		produtos: productRender
	};
};

module.exports = RenderTemplate;