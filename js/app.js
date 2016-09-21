$(function() {
	// MODEL
	var data = {
		lastID: 0,
		pizzas: []
	};
	// octopus
	var octopus = {
		addPizza: function() {
			var thisID = ++data.lastID;

			data.pizzas.push({
				id: thisID,
				visible: true
			});
			view.render();
		},

		removePizza: function(pizza) {
			var clickedPizza = data.pizzas[ pizza.id - 1];
			clickedPizza.visible = false;
			view.render();
		},

		getVisiblePizzas: function() {
			var visiblePizzas = data.pizzas.filter(function(pizza){
				return pizza.visible;
			});
			return visiblePizzas;
		},

		init: function() {
			view.init();
		}
	}
	// view
	var view = {
		init: function() {
			var addPizzaBtn = $('.add-pizza');
			addPizzaBtn.click(function(){
				octopus.addPizza();
			});

			this.$pizzaList = $('.pizza-list');
			this.pizzaTemplate = $('script[data-template="pizza"]').html();

			this.$pizzaList.on('click', '.remove-pizza', function(e) {
				var pizza = $(this).parents('.pizza').data();
				octopus.removePizza(pizza);
				return false; //???????
			});

			this.render();
		},
		render: function() {
			var $pizzaList = this.$pizzaList,
				pizzaTemplate = this.pizzaTemplate;

			$pizzaList.html('');
			octopus.getVisiblePizzas().forEach(function(pizza){
				var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
				$pizzaList.append(thisTemplate);
			});
		}
	};

	octopus.init();
}());
