import mongoose from 'mongoose';

interface pinPointEvent{
    name: String,
    id?: String,
    url?:String,
    locale?: String,
    image?:String,
    address?:String,
    distance?:Number,
    startDate?:Date,
    endDate?:Date,
}

const eventSchema = new mongoose.Schema<pinPointEvent>({
     name: {type:String,required:true},
     id: {type:String},
     url: {type:String},
     locale:  {type:String},
     image: {type:String},
     address: {type:String},
     distance: {type:Number},
     startDate: {type:Date},
     endDate: {type:Date},
    });
const EventModel = mongoose.model<pinPointEvent>('events', eventSchema);

export default EventModel;