var express = require('express');
var mysql = require('mysql');
var app = express();

app.get('/api/v1/books/:id', function (request, response) {
  var connection = mysql.createConnection({
    host     : 'itp460.usc.edu',
    user     : 'student',
    password : 'ttrojan',
    database : 'itp405-midterm'
  });

  connection.connect();
  connection.query('SELECT * FROM books WHERE id = ?', [ request.params.id ], function(error, books) {
    if (error) {
      throw error;
    }

    var book = books[0];

    connection.query('SELECT * FROM publishers WHERE id = ?', [ book.publisher_id ], function(error, publishers) {
      if (error) {
        throw error;
      }

      var publisher = publishers[0];
      book.publisher = publisher;
      delete book.publisher_id;

      connection.query('SELECT * FROM authors WHERE id = ?', [ book.author_id ], function(error, authors) {
      if (error) {
        throw error;
      }

      var author = authors[0];
      book.author = author;
      delete book.author_id;
      response.json(book);

      connection.end();
          });
    });
  });
});

app.listen(8000);