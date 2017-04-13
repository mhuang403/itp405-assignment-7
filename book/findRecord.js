var mysql = require('mysql');

function findRecord(id) {
  return new Promise(function (resolve, reject) {
    var connection = mysql.createConnection({
      host: 'itp460.usc.edu',
      user: 'student',
      password: 'ttrojan',
      database: 'itp405-midterm'
    });

    connection.connect();
    connection.query('SELECT * FROM books WHERE id = ?', [id], function (error, books) {
      if (error) {
        reject();
      } else {
        if (books.length === 0) {
          reject({
            errorType: 'Book not found',
            id: id
          });
        } else {
          resolve(books[0]);
        }
      }
    });
  });
}

module.exports = findRecord;