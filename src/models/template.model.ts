import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface Input {
    name: string,
}

export interface Document extends Input, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
})

Schema.plugin(mongoosePaginate)

const Model = mongoose.model<Document>("", Schema)

export default Model