const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cateRoute = require('./routes/category.routes')
const User = require('./routes/user.routes')
const upload = require('./uploads/upload.product')
require('dotenv').config();
require('./config/db')
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.json('Welcome to my api');
});

app.use('/category', cateRoute)
app.use('/user', User)
app.use('/upload', upload)

const port = process.env.PORT || 8800;
app.listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
});




