let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
const ejs = require('ejs'); // Import the ejs module
let app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//let ejs = require('ejs');
const port = 3001;

app.use(express.static('./views'));
// serve from public
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

let names = ['Fred']; // Array to store names

app.get('/', (req, res) => {
  let namelist = "";
  if (names.length > 0) {
    names.map((name) => {
      namelist += `<li>${name}</li>`;
    });
  }
  // Render the index.ejs template and pass the namelist as a variable
  res.render('index', { namelist: namelist });
  //ejs.renderFile( path.join(__dirname, './views', 'index.ejs'), { namelist: namelist });
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
