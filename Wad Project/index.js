const express = require('express');
const app = express();

const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());  //body-parser middleware
app.use(express.json());

//Routes
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const ordersRouter = require('./routes/orderRoute'); 

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', ordersRouter);

app.listen(5000,
     () => console.log
     ('Server running on port 5000')
    );
