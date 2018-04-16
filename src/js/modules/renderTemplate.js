'use strict';

var RenderTemplate = {
	insertProduct: function(data) {
		var formatedPrice = Helper.accounting.formatMoney(data.price);
		var html = `
			<li class="product-items" data-product="${data.id}">
				<h3 class="product-name">${data.name}</h3>
				<span class="product-amount"><span class="amount-value">${data.amount}</span> x</span>
				<strong class="product-price">R$ <span class="price-value">${formatedPrice}</span></strong>
				<button type="button" class="btn product-add" data-buy="${data.id}">Buy</button>
			</li>`;

		productList.insertAdjacentHTML('afterbegin', html);
	},

	updateProduct: function(data, id) {
		var productElm = document.querySelector('[data-product="' + id + '"]');
		var formatedPrice = Helper.accounting.formatMoney(data.price);
		
		productElm.querySelector('.product-name').innerText = data.name;
		productElm.querySelector('.amount-value').innerText = data.amount;
		productElm.querySelector('.price-value').innerText = formatedPrice;
	},
	
	updatePurchase: function(data) {
		var result = data.reduce(function(prevVal, elem) {
			return prevVal + (elem.price * elem.amount);
		}, 0);

		purchaseValue.innerText = Helper.accounting.formatMoney(result);
	}
};

module.exports = RenderTemplate;