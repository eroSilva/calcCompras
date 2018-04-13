'use strict';

var RenderTemplate = {
	insertProduct: function(data) {
		var formatedPrice = Helper.accounting.formatMoney(data.price);
		var html = `
			<li class="product-items">
				<h3 class="product-name">${data.name}</h3>
				<span class="product-amount">${data.amount} x</span>
				<strong class="product-price">R$ <span class="price-value">${formatedPrice}</span></strong>
				<button type="button" class="btn product-add" data-id="${data.id}">Buy</button>
			</li>`;

		productList.insertAdjacentHTML('afterbegin', html);
	},
	
	updatePurchase: function(data) {
		var result = data.reduce(function(prevVal, elem) {
			return prevVal + (elem.price * elem.amount);
		}, 0);

		purchaseValue.innerText = Helper.accounting.formatMoney(result);
	}
};

module.exports = RenderTemplate;