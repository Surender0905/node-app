require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const port = 8080;
main()
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

// inbuilt middleware  app level
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(morgan('default'));

app.use(express.static(path.resolve(__dirname, 'public'))); ////make static hosting

app.use('/products', productRouter.routes);
app.use('/users', userRouter.routes);

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'file path'));
});

//create api
async function main() {
  await mongoose.connect(
    'mongodb+srv://roshan:roshan@shoping.gltusxu.mongodb.net/products?retryWrites=true&w=majority'
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port, () => console.log('server is running' + ' ' + port));
