const express = require('express');
const config = require('./config')
require('./db');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);

app.listen(config.port, () => {
  console.log('Server now listening at', config.port);
});