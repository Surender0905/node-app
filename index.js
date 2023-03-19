const express = require('express');
const morgan = require('morgan');

const app = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const port = 8080;

// inbuilt middleware  app level
app.use(express.json());
// app.use(express.urlencoded());
app.use(morgan('tiny'));

app.use(express.static('public')); ////make static hosting

app.use('/products', productRouter.routes);
app.use('/users', userRouter.routes);

//create api

app.listen(port, () => console.log('server is running' + ' ' + port));
