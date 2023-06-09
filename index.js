require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const port = 8080;
main()
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

// inbuilt middleware  app level
app.use(express.json());
// app.use(express.urlencoded());
app.use(morgan('default'));

app.use(express.static('public')); ////make static hosting

app.use('/products', productRouter.routes);
app.use('/users', userRouter.routes);

//create api
async function main() {
  await mongoose.connect(
    `mongodb+srv://roshan:${process.env.DB_PASSWORD}@shoping.gltusxu.mongodb.net/products?retryWrites=true&w=majority`
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port, () => console.log('server is running' + ' ' + port));
