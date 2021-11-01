let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoDb = require('./config/db.mongo.config');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database sucessfully connected ')
},
  error => {
    console.log('Database error: ' + error)
  }
)

const expenseRoute = require('./routes/expense.route')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const permissionRoute = require('./routes/permission.route')
const rolRoute = require('./routes/rol.route')

const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/Eureka')));

//-----------------------------------------------------------------
var request = require("request");
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var options = { method: 'POST',
  url: 'https://dev-truedessing.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"8T3ntBn8tijlEFtbhoPPx88F9OYurE9W","client_secret":"zCicRWfnKpeZKX521JFapnu6sicQZu_f0RuPP5zLWtWp3lMJp8m4P6SG64YqTiqk","audience":"https://dev-truedessing.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };


  var port = process.env.PORT || 8080;

  var jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://dev-truedessing.eu.auth0.com/.well-known/jwks.json'
      }),
      audience: 'http://localhost:4200',
      issuer: 'https://dev-truedessing.eu.auth0.com/',
      algorithms: ['RS256']
  });
  
  app.use(jwtCheck);
  
  app.get('/authorized', function (req, res) {
      res.send('Secured Resource');
  });
  


request(options, function (error, response, body) {
  if (error) throw new Error(error);
  else{
    token = body;
    //console.log(response);
  }
 
});
// API root
app.get('/api', (req, res) => {
  res.send('welcome to Api of Eureka');
});
// API root
app.use('/api/expense', expenseRoute);
app.use('/api/rol', rolRoute);
app.use('/api/permission', permissionRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get('/', (req, res) => {
  
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'dist/Eureka/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});



function createError(code) {
  console.error(code);
}
