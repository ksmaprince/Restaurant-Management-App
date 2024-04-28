const express = require('express')
const app = express();
const cors = require('cors')
const userRouter = require('./routes/UserRouter')
const foodRouter = require('./routes/FoodRouter');
const noteRouter = require('./routes/NoteRouter');
const userProfileRouter = require('./routes/UserProfileRouter');

const PRIVATE_KEY = "K-19-OCT-2023"
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

app.use('/', cors(), userRouter);

function auth(req, res, next) {
    if (!req.headers.authorization) {
        res.send({ success: false, error: "Please provide Authorization" })
    }
    const arr = req.headers.authorization.split(" ")
    if (arr.length != 2) {
        res.send({ success: false, error: "Please use Bearer Scheme" })
    }
    try {
        const decode = jwt.verify(arr[1], PRIVATE_KEY)
        if (decode) {
            next()
        } else {
            res.send({ success: false, error: "Wrong Token" })
        }
    } catch (error) {
        res.send({ success: false, error: "Wrong Token" })
    }
}

//route
app.use(auth) //comment for test

app.use('/', cors(), foodRouter);
app.use('/', cors(), noteRouter);
app.use('/', cors(), userProfileRouter)



app.listen(5001, () => console.log('Server is running at 5001 ... '))