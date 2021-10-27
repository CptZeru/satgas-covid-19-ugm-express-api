import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import TracingModel, {TracingDocument, TracingInput} from "../models/tracing.model";

export async function createTracing(input: TracingInput) {
    try {
        return await TracingModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function findTracings(
    query: FilterQuery<TracingDocument>,
    options: QueryOptions
) {
    return TracingModel.paginate(query, options)
}

export async function findTracing(
    query: FilterQuery<TracingDocument>,
    options: QueryOptions = {
        lean:true,
        populate: [
            { path: 'patient' },
            { path: 'createdBy', select: '-password' },
            { path: 'updatedBy', select: '-password' }
        ]
    }
) {
    return TracingModel.findOne(query, {},options)
}

export async function findAndUpdateTracing(
    query: FilterQuery<TracingDocument>,
    update: UpdateQuery<TracingDocument>,
    options: QueryOptions
) {
    return TracingModel.findOneAndUpdate(query, update, options)
}

export async function deleteTracing(query: FilterQuery<TracingDocument>) {
    return TracingModel.deleteOne(query)
}