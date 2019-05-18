const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

//IMPORT ROUTE
const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const workRoute = require('./routes/work');
const skillRoute = require('./routes/skills');

//INIT ROUTE
app.use('/user',userRoute)
app.use('/posts',postRoute)
app.use('/work',workRoute)
app.use('/skill',skillRoute)

//MONGODB CONNECTION
mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser : true })
    .then(() => console.log("MongoDB conected ..."))
    .catch(err => console.log(err));
//START SERVER
app.listen(8000)