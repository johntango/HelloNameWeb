let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;



let names = []; // Array to store names

app.get('/', (req, res) => {
    let greeting = '';
    if (names.length > 0) {
      greeting = `<h1>Hello ${names[names.length - 1]}</h1>`;
    }
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Enter Name</title>
      </head>
      <body>
          ${greeting}
          <form action="/submit-name" method="POST">
              <input type="text" name="username" placeholder="Enter your name" required>
              <button type="submit">Submit</button>
          </form>
      </body>
      </html>
    `);
  });

app.post('/submit-name', (req, res) => {
    const name = req.body.username;
    names.push(name);
    res.redirect('/');
  });
// New route to list all names
app.get('/names', (req, res) => {
    let namesList = '<ul>';
    for (let name of names) {
      namesList += `<li>${name}</li>`;
    }
    namesList += '</ul>';
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Name List</title>
      </head>
      <body>
          <h1>All Names</h1>
          ${namesList}
          <p><a href="/">Back</a></p>
      </body>
      </html>
    `);
  });
  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
