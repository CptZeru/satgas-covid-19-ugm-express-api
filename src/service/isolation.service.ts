import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import PatientModel, {PatientDocument, PatientInput} from "../models/patient.model";
import IsolationModel, {IsolationDocument, IsolationInput} from "../models/isolation.model";

export async function createIsolation(input: IsolationInput) {
    try {
        return await IsolationModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function findIsolations(
    query: FilterQuery<IsolationDocument>,
    options: QueryOptions
) {
    return IsolationModel.paginate(query, options)
}

export async function findIsolation(
    query: FilterQuery<IsolationDocument>,
    options: QueryOptions = {
        lean:true,
        populate: [{ path: 'patient' }, { path: 'createdBy', select: '-password' }, { path: 'updatedBy', select: '-password' }]
    }
) {
    return IsolationModel.findOne(query, {},options)
}

export async function findAndUpdateIsolation(
    query: FilterQuery<IsolationDocument>,
    update: UpdateQuery<IsolationDocument>,
    options: QueryOptions
) {
    return IsolationModel.findOneAndUpdate(query, update, options)
}

export async function deleteIsolation(query: FilterQuery<IsolationDocument>) {
    return IsolationModel.deleteOne(query)
}