var mysql = require('mysql');

function findRecord(id) {
  return new Promise(function (resolve, reject) {
    var connection = mysql.createConnection({
      host: 'itp460.usc.edu',
      user: 'student',
      password: 'ttrojan',
      database: 'itp405-midterm'
    });

    function findPublisher(id) {
      return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM publishers WHERE id = ?', [ id ], function(error, publishers) {
          if (error) {
            reject();
          }

          var publisher = publishers[0];
          resolve(publisher);
        });
      });
    };

    function findAuthor(id) {
      return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM authors WHERE id = ?', [ id ], function(error, authors) {
          if (error) {
            reject();
          }

          var author = authors[0];
          resolve(author);
        });
      });
    }

    connection.connect();
    connection.query('SELECT * FROM books WHERE id = ?', [ request.params.id ], function(error, books) {
      if (error) {
        reject();
      }

      var book = books[0];
      findPublisher(book.publisher_id).then(function(publisher) {
        book.publisher = publisher;
        findAuthor(book.author_id).then(function(author) {
          book.author = author;
          resolve(book);
        });
      });
    });
  });
}

module.exports = findRecord;