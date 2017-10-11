const express = require('express'),
    bodyParser = require('body-parser'),
    handlebars = require('express-handlebars'),
    morgan = require('morgan'),
    path = require('path'),
    index = require('./routes/index'),
    port = process.env.PORT || 3000,
    application = express();





    /*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
// Register `hbs.engine` with the Express app.
application.engine('handlebars', handlebars({defaultLayout: 'main'}));
application.set('view engine', 'handlebars');

// Set Static Files
application.use('/assets', express.static(path.join(__dirname, 'public')));

application.use(morgan('dev'));
// application.use(morgan('combined'))

// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
application.use(bodyParser.json());



// sequelize model:create --name User --attributes

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
application.use('/', index);





/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
application.listen(port, () => {
console.log(`Server listening on port ${port}`);
});





