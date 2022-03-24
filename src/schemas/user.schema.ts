import {Schema} from 'mongoose';

export const UserSchema=({
    _id: { required: false, type: Schema.Types.ObjectId },
    userName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
})

