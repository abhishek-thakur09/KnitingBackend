const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect(
        "mongodb+srv://katochsejal6:yG7vdPKOdfEayblR@knitingstore.8zgrzwu.mongodb.net/KnitingStore"
    )
};

module.exports = connectDb;

// above function return us a promise 
