import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface TracingInput {
    patient: mongoose.Types.ObjectId,
    place: string
    description: string,
    identificationMethod: string,
    createdBy: mongoose.Types.ObjectId,
    updatedBy: mongoose.Types.ObjectId
}

export interface TracingDocument extends TracingInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

const tracingSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patient' },
    place: { type: String, required: true },
    description: { type: String, required: true },
    identificationMethod: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

tracingSchema.plugin(mongoosePaginate)

const TracingModel = mongoose.model<TracingDocument>("Tracing", tracingSchema)

export default TracingModel