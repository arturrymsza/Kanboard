function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.$element = createColumn();

	function createColumn() {
		var x = Math.round(0xffffff * Math.random()).toString(16);
		var y = (6-x.length);
		var z = '000000';
		var z1 = z.substring(0,y);
		var color = '#' + z1 + x;
		var $column = $('<div>').addClass('column').css("background-color", color);
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name).css({"color": "white", "font-weight": "900"});
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('col-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		$columnDelete.on('click', function() {
			self.removeColumn();
		});

		$columnAddCard.on('click', function() {
			var cardName = prompt("Enter the name of the card");
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
				name: cardName,
				bootcamp_kanban_column_id: self.id
				},
				succses: function(response) {
					var card = new Card(response.id, cardName);
					self.addCard(card);
				}
			});
			self.addCard(new Card(self.id, cardName));
			console.log(self.id, cardName);
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
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.$element.remove();
			}
		});
	}
};