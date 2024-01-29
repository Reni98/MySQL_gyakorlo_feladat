const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Adatbázis kapcsolat beállítása
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tanker'
});

connection.connect();

// Express konfiguráció
app.get('/', (req, res) => {
  // Adatbázis lekérdezés
  const sqlQuery = 'SELECT * FROM szemelyek ';
  const values = ['Szolnok'];

  


  connection.query(sqlQuery, values, (error, results, fields) => {
    if (error) throw error;
  

    // Eredmények kiíratása a böngészőbe
    let output = '<h1>Szolnokon lakó dolgozók:</h1>';
    output += '<table border="1"><tr><th>Név</th><th>Cim</th></tr>';
   
    results.forEach((row) => {
      output += `<tr><td>${row.nev}</td> <td>${row.cim}</td></tr>`;
     
      // Itt az 'nev' a tábla oszlopainak nevére cserélendő
    });

    output += '</table>';   

    const szolnokLakok = results.filter((person) => person.telepules === 'Szolnok');
    output += '<h1>Szolnokon lakó személyek:</h1>';
    output += '<table border="1"><tr><th>Név</th><th>Cím</th></tr>';

    szolnokLakok.forEach((person) => {
      output += `<tr><td>${person.nev}</td><td>${person.cim}</td></tr>`;
    });

    output += '</table>';
    res.send(output);
  });
});
 

// Szerver indítása
app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen.`);
});
