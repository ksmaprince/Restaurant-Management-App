const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')
const PRIVATE_KEY = "K-19-OCT-2023"
require('dotenv').config();

let db = null;
let COLLECTION_NAME = 'users'

async function connectDB() {
    try {
        const DB_URI = "mongodb://localhost:27017"
        const client = new MongoClient(DB_URI)
        //const client = new MongoClient(process.env.DB_URI)
        await client.connect();
        db = client.db("cs_571_mobile_app_dev");
        console.log("DB Connected");
    } catch (error) {
        console.log(error.message);
    }
}
connectDB()

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    try {
        const user = req.body;
        let ret = await db.collection(COLLECTION_NAME).find({}).toArray()
        let found = ret.find(x => x.email === user.email);
        if (found) {
            res.send({ success: false, error: "This email was already used" });
        } else {
            let ret = await db.collection(COLLECTION_NAME).insertOne(user)
            res.status(200).send({ success: true, data: ret });
        }

    } catch (error) {
        res.status(500).send({ success: false, error: `cannot create user: ${error.message}` });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        let ret = await db.collection(COLLECTION_NAME).find({}).toArray()
        let user = ret.find(x => x.email === email && x.password === password)
        if (user) {
            const token = jwt.sign({ email }, PRIVATE_KEY)
            const profile = { id: user._id, name: user.name, phone: user.phone, email: user.email, image: user.image, token: token }
            return res.send({ success: true, data: profile })
        } else {
            res.status(401).send({ success: false, error: `Invalid user name and password` });
        }
    } catch (error) {
        res.status(500).send({ success: false, error: `cannot login: ${error.message}` });
    }

})

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
app.use(auth)

//Get All Users
app.get("/users", async (req, res) => {
    try {
        let ret = await db.collection(COLLECTION_NAME).find({}).toArray()
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
})

//Get All Food from a specific user
app.get("/users/:userId/foods", async (req, res) => {
    try {
        let ret = await db.collection(COLLECTION_NAME).findOne({
            _id: new Object(req.params.userId)
        })
        console.log(ret)
        if (ret) {
            res.status(200).send({ success: true, data: ret });
        }
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: `DB Error: ${error.message}` });
    }
})

//Add new food
app.post("/users/:userId/foods", async (req, res) => {
    try {
        const food = req.body;
        food._id = new ObjectId();
        console.log(food)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(req.params.userId) },
            { $push: { foods: food } }
        );
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't add food: " + error.message });
    }
});

//Update a food
app.put("/users/:userId/food/:foodId", async (req, res) => {
    try {
        const food = req.body;
        food._id = new ObjectId(req.params.foodId)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(req.params.userId),
                "foods._id": new ObjectId(req.params.foodId)
            },
            { $set: { "foods.$": food } }
        );
        res.status(200).send({ success: true, data: ret });

    } catch (error) {
        res.status(500).send({ success: false, error: "Can't update food: " + error.message });
    }
})

//Delete a food
app.delete("/users/:userId/foods/:foodId", async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(req.params.userId)
            },
            {
                $pull: { foods: { _id: new ObjectId(req.params.userId) } }
            }
        );
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't delete food: " + error.message });
    }
})

//Add new note
app.post("/users/:userId/notes", async (req, res) => {
    try {
        const note = req.body;
        note._id = new ObjectId();
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(req.params.userId) },
            { $push: { notes: note } }
        );
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't add teacher: " + error.message });
    }
});

//Update a note
app.put("/users/:userId/notes/:noteId", async (req, res) => {
    try {
        const note = req.body;
        note._id = new ObjectId(req.params.noteId)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(req.params.userId),
                "notes._id": new ObjectId(req.params.noteId)
            },
            { $set: { "notes.$": note } }
        );
        res.status(200).send({ success: true, data: ret });

    } catch (error) {
        res.status(500).send({ success: false, error: "Can't update note: " + error.message });
    }
})

//Delete a note
app.delete("/users/:userId/notes/:noteId", async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(req.params.userId)
            },
            {
                $pull: { notes: { _id: new ObjectId(req.params.noteId) } }
            }
        );
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't delete notes: " + error.message });
    }
})

//Add new order
app.post("/users/:userId/orders", async (req, res) => {
    try {
        const order = req.body;
        order._id = new ObjectId();
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(req.params.userId) },
            { $push: { orders: order } }
        );
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't add order: " + error.message });
    }
});

//Update an order
app.put("/users/:userId/orders/:orderId", async (req, res) => {
    try {
        const order = req.body;
        order._id = new ObjectId(req.params.orderId)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(req.params.userId),
                "orders._id": new ObjectId(req.params.orderId)
            },
            { $set: { "orders.$": order } }
        );
        res.status(200).send({ success: true, data: ret });

    } catch (error) {
        res.status(500).send({ success: false, error: "Can't update order: " + error.message });
    }
})

//Delete an order
app.delete("/users/:userId/orders/:orderId", async (req, res) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(req.params.userId)
            },
            {
                $pull: { orders: { _id: new ObjectId(req.params.orderId) } }
            }
        );
        res.status(200).send({ success: true, data: ret });
    } catch (error) {
        res.status(500).send({ success: false, error: "Can't delete order: " + error.message });
    }
})

app.listen(5001, () => console.log('Server is running at 5001 ... '))
