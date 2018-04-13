'use stricts';

var Helpers = {
	accounting: (function(){
		var lib = require('accounting-js');

		lib.settings.symbol = '';
		lib.settings.decimal = ",";
		lib.settings.thousand = ".";
		
		return lib;
	})(),

	futureSelect: (selector, callback, parent = document) => {
		let request = null;

		return new Promise((resolve) => {
			const select = () => {
				const elements = parent && [ ...parent.querySelectorAll(selector) ] || [];

				if (!elements.length) {
					request = requestAnimationFrame(select);
					return;
				};

				cancelAnimationFrame(request);
				resolve(elements);
			};

			select();
		}).then(
			(elements) => {
				elements.map(function(element){
					element.addEventListener('click', callback);
				});
			}
		);
	}
};

module.exports = Helpers;