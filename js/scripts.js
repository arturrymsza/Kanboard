$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
			str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * cars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnAddCard = $('<button>').addClass('add-card').text('Add a card');

			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt ("Enter the name of the card")));
			});

			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);

			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.element.remove();
		}
	};

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard(){
			var $card = $('<li>').addClass('card'),
				$cardDescription = $('<p>').addClass('card-description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete').text('x');

			$cardDelete.click(function() {
				self.removeCard();
			});

			$card.append($cardDelete)
				.append($cardDescription);

				return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}
})