import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import PatientModel, {PatientDocument, PatientInput} from "../models/patient.model";

export async function createPatient(input: PatientInput) {
    try {
        return await PatientModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function findPatients(
    query: FilterQuery<PatientDocument>,
    options: QueryOptions
) {
    return PatientModel.paginate(query, options)
}

export async function findPatient(
    query: FilterQuery<PatientDocument>,
    options: QueryOptions = {
        lean:true,
        populate: [{ path: 'createdBy', select: '-password' }, { path: 'updatedBy', select: '-password' }]
    }
) {
    return PatientModel.findOne(query, {},options)
}

export async function findAndUpdatePatient(
    query: FilterQuery<PatientDocument>,
    update: UpdateQuery<PatientDocument>,
    options: QueryOptions
) {
    return PatientModel.findOneAndUpdate(query, update, options)
}

export async function deletePatient(query: FilterQuery<PatientDocument>) {
    return PatientModel.deleteOne(query)
}