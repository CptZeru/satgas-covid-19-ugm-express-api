import VaccineEventModel, {VaccineEventDocument, VaccineEventInput} from "../models/vaccineEvent.model";
import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";

export async function createVaccineEvent(input: VaccineEventInput) {
    try {
        return await VaccineEventModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function findVaccineEvents(
    query: FilterQuery<VaccineEventDocument>,
    options: QueryOptions
) {
    return VaccineEventModel.paginate(query, options)
}

export async function findVaccineEvent(
    query: FilterQuery<VaccineEventDocument>,
    options: QueryOptions = {
        lean:true,
        populate: [{ path: 'createdBy', select: '-password' }, { path: 'updatedBy', select: '-password' }]
    }
) {
    return VaccineEventModel.findOne(query, {},options)
}

export async function findAndUpdateVaccineEvent(
    query: FilterQuery<VaccineEventDocument>,
    update: UpdateQuery<VaccineEventDocument>,
    options: QueryOptions
) {
    return VaccineEventModel.findOneAndUpdate(query, update, options)
}

export async function deleteVaccineEvent(query: FilterQuery<VaccineEventDocument>) {
    return VaccineEventModel.deleteOne(query)
}