var express = require('express');
var app = express();
var findAll = require('./review/findAll');
var findRecord = require('./book/findRecord');

app.get('/api/v1/reviews', function (request, response) {
  findAll('id').then(function(reviews) {
    response.json(reviews);
});
});

app.get('/api/v1/books/:id', function (request, response) {
	findRecord(request.params.id).then(function(book) {
		response.json(book);
	}, function(error) {
		response.json({
			error: 'Book not found'
		});
	});
	});



app.listen(8000);


