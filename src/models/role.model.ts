import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface RoleInput {
    name: string,
}

export interface RoleDocument extends RoleInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
})

roleSchema.plugin(mongoosePaginate)

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema)

export default RoleModel