import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
     name: String,
     type: String,
     id: String,
     test: Boolean,
     url:String,
     locale: String,
     image:String,
     location:String,
     summary:String,
     date:Date,
     time:Date,
     about:String,
     price:Number
    });
const eventModel = mongoose.model('events', eventSchema);

export default eventModel;