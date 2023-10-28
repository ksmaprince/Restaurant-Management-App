const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const nodemon = require("nodemon");
const e = require("express");
const PRIVATE_KEY = "K-19-OCT-2023"
require('dotenv').config();

let COLLECTION_NAME = 'users';
let db = null;

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.DB_URI)
        await client.connect();
        db = client.db("cs_571_mobile_app_dev");
        console.log("DB Connected");
        return db
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

connectDB();

exports.singupUser = async (user) => {
    try {
        let ret = await db.collection(COLLECTION_NAME).find({}).toArray()
        let found = ret.find(x => x.email === user.email);
        if (found) {
            throw new Error("This email was already in used")
        } else {
            let ret = await db.collection(COLLECTION_NAME).insertOne(user)
            return ret;
        }
    } catch (error) {
        throw error;
    }
}

exports.loginUser = async (email, password) => {
    try {
        let ret = await db.collection(COLLECTION_NAME).find({}).toArray()
        let user = ret.find(x => x.email === email && x.password === password)
        if (user) {
            const token = jwt.sign({ email }, PRIVATE_KEY)
            const profile = { id: user._id, name: user.name, address: user.address, phone: user.phone, email: user.email, image: user.image, token: token }
            return profile
        } else {
            throw new Error(`Invalid user name and password`)
            res.status(401).send({ success: false, error: `Invalid user name and password` });
        }
    } catch (error) {
        throw error
    }
}

exports.getAllUser = async () => {
    try {
        let ret = await db.collection(COLLECTION_NAME).find({}).toArray()
        return ret;
    } catch (error) {
        throw error
    }
}

exports.getAllFoods = async (userId) => {
    try {
        let ret = await db.collection(COLLECTION_NAME).findOne({
            _id: new ObjectId(userId)
        })
        if (ret && ret.foods) {
            return ret.foods;
        } else {
            return [];
        }
    } catch (error) {
        throw error
    }
}

exports.addNewFoods = async (userId, food) => {
    try {
        food._id = new ObjectId();
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(userId) },
            { $push: { foods: food } }
        );
        return ret
    } catch (error) {
        throw error
    }
}

exports.updateFood = async (userId, foodId, food) => {
    try {
        food._id = new ObjectId(foodId)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(userId),
                "foods._id": new ObjectId(foodId)
            },
            { $set: { "foods.$": food } }
        );
        return ret

    } catch (error) {
        throw error
    }
}

exports.deleteFood = async (userId, foodId) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(userId)
            },
            {
                $pull: { foods: { _id: new ObjectId(foodId) } }
            }
        );
        return ret;
    } catch (error) {
        throw error
    }
}

exports.getAllNotes = async (userId) => {
    try {
        let ret = await db.collection(COLLECTION_NAME).findOne({
            _id: new ObjectId(userId)
        })
        if (ret && ret.notes) {
            return ret.notes;
        } else {
            return [];
        }
    } catch (error) {
        throw error
    }
}

exports.addNewNote = async (userId, note) => {
    try {
        note._id = new ObjectId();
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(userId) },
            { $push: { notes: note } }
        );
        return ret
    } catch (error) {
        throw error
    }
}

exports.updateNote = async (userId, noteId, note) => {
    try {
        note._id = new ObjectId(noteId)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(userId),
                "notes._id": new ObjectId(noteId)
            },
            { $set: { "notes.$": note } }
        );
        return ret

    } catch (error) {
        throw error
    }
}

exports.deleteNote = async (userId, noteId) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(userId)
            },
            {
                $pull: { notes: { _id: new ObjectId(noteId) } }
            }
        );
        return ret;
    } catch (error) {
        throw error
    }
}

exports.updateProfile = async (token, userId, user) => {
    try {
        user._id = new ObjectId(userId)
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(userId)
            },
            { $set: { name: user.name, phone: user.phone, address: user.address } }
        );

        const userInfo = await db.collection(COLLECTION_NAME).findOne({
            _id: new ObjectId(userId)
        })
        const arr = token.split(" ")
        const profile = { id: userInfo._id, name: userInfo.name, address: userInfo.address, phone: userInfo.phone, email: userInfo.email, image: userInfo.image, token: arr[1] }
        return profile;
    } catch (error) {
        throw error
    }
}

exports.updateProfileImage = async (token, userId, imageUrl) => {
    try {
        const ret = await db.collection(COLLECTION_NAME).updateOne(
            {
                _id: new ObjectId(userId)
            },
            { $set: { image: imageUrl } }
        );
        const userInfo = await db.collection(COLLECTION_NAME).findOne({
            _id: new ObjectId(userId)
        })
        const arr = token.split(" ")
        const profile = { id: userInfo._id, name: userInfo.name, address: userInfo.address, phone: userInfo.phone, email: userInfo.email, image: userInfo.image, token: arr[1] }
        return profile;
    } catch (error) {
        throw error
    }
}

exports.changePassword = async (userId, data) => {
    try {
        const userInfo = await db.collection(COLLECTION_NAME).findOne({
            _id: new ObjectId(userId)
        })
        if (userInfo.password === data.currentPassword) {
            if (userInfo.password !== data.password) {
                const ret = await db.collection(COLLECTION_NAME).updateOne(
                    {
                        _id: new ObjectId(userId)
                    },
                    { $set: { password: data.password } }
                );
                return ret;
            } else {
                throw new Error("You cannot use the old password");
            }

        } else {
            throw new Error("Current password is incorrect. ");
        }
    } catch (error) {
        throw error
    }
}
