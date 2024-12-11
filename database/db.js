const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
     const connect = await mongoose.connect(process.env.dbURL);
     console.log('Connected establish');
    }catch(err){
        console.log('Errro while connecting to the db', err)
        throw err;
    }
}

module.exports = connectDB;