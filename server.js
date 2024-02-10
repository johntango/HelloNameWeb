let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
const ejs = require('ejs'); // Import the ejs module
let app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//let ejs = require('ejs');
const port = 3001;

// serve from public
// Set the view engine to ejs
app.set('view engine', 'ejs');

let names = ['Fred']; // Array to store names

app.get('/', (req, res) => {
  let namelist = "";
  if (names.length > 0) {
    namelist = '<ul>';
    names.map((name) => {
      namelist += `<li>${name}</li>`;
    });
    namelist += '</ul>';
  }

  // Render the index.ejs template and pass the namelist as a variable
  ejs.renderFile( path.join(__dirname, './views', 'index.ejs'), { namelist: namelist });
});

app.post('/add-name', (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.redirect('/');
  });
// New route to list all names
app.get('/names', (req, res) => {
    res.json(names);
  });
  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
