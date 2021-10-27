import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import bcrypt from "bcrypt";
import config from "config";
import {UserDocument} from "./user.model";

export interface IsolationInput {
    patient: mongoose.Types.ObjectId,
    location: string,
    entryDate: string,
    status: string,
    estimatedReturnDate?: string,
    actualReturnDate?: string,
    createdBy: mongoose.Types.ObjectId,
    updatedBy: mongoose.Types.ObjectId
}

export interface IsolationDocument extends IsolationInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

const isolationSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patient' },
    location: { type: String, required: true },
    entryDate: { type: Date, required: true },
    estimatedReturnDate: { type: Date },
    actualReturnDate: { type: Date },
    status: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

isolationSchema.pre("save", async function(next) {
    let isolation = this as IsolationDocument

    if (!isolation.isModified("entryDate")) {
        return next()
    }

    const entryDate = new Date(isolation.entryDate)

    isolation.estimatedReturnDate = entryDate.setDate(entryDate.getDate() + config.get<number>('isolationDuration'))

    return next();
})

isolationSchema.plugin(mongoosePaginate)

const IsolationModel = mongoose.model<IsolationDocument>("Isolation", isolationSchema)

export default IsolationModel