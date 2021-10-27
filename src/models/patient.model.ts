import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface PatientInput {
    name: string,
    nik: string,
    gender: string,
    address: string
    phoneNumber: string,
    facultyWorkUnit: string,
    onsetDate: string,
    epidemiologyStatus: string,
    action: string,
    createdBy: mongoose.Types.ObjectId,
    updatedBy: mongoose.Types.ObjectId
}

export interface PatientDocument extends PatientInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nik: { type: String, required: true, min: 16, max: 16 },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    facultyWorkUnit: { type: String, required: true },
    onsetDate: { type: Date, required: true },
    epidemiologyStatus: { type: String, required: true },
    action: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

patientSchema.plugin(mongoosePaginate)

const PatientModel = mongoose.model<PatientDocument>("Patient", patientSchema)

export default PatientModel