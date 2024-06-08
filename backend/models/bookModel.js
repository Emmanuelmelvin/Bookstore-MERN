import mongoose from "mongoose";

const bookShema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publichYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('Cat' , bookShema)