import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface VaccineEventInput {
    title: string,
    organiser: string,
    location: string,
    vaccineType: string
    dose: number,
    time: string,
    documentation?: string,
    createdBy: mongoose.Types.ObjectId,
    updatedBy: mongoose.Types.ObjectId
}

export interface VaccineEventDocument extends VaccineEventInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}
const vaccineEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    organiser: { type: String, required: true },
    location: { type: String, required: true },
    vaccineType: { type: String, required: true },
    dose: { type: Number, required: true },
    time: { type: Date, required: true },
    documentation: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

vaccineEventSchema.plugin(mongoosePaginate)

const VaccineEventModel = mongoose.model<VaccineEventDocument>("VaccineEvent", vaccineEventSchema)

export default VaccineEventModel