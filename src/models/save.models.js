import mongoose from "mongoose";


const saveSchema = new mongoose.Schema
(
    {

        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        content:
        {
            type:String,
            required:true
        },
        imageUrl:
        {
            type:String
        }
    },
    {
        timestamps:true
    }
)

export const Saved =  mongoose.model("Saved",saveSchema);