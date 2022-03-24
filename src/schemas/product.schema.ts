import {Schema} from 'mongoose';

export const ProductSchema=({
    _id: { required: false, type: Schema.Types .ObjectId },
    name:{type:String,require:true},
    brand:{type:String,require:true},
    amount:{type:Number,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:false},
    image:{type:String,require:false}
})

