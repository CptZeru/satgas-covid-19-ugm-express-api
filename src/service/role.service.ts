import RoleModel, {RoleDocument, RoleInput} from "../models/role.model";
import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";

export async function createRole(input: RoleInput) {
    return RoleModel.create(input)
}

export async function findRole(query: FilterQuery<RoleDocument>, options: QueryOptions = { lean: true }) {
    return RoleModel.findOne(query, {},options)
}

export async function findRoles(query: FilterQuery<RoleDocument>, options: QueryOptions) {
    return RoleModel.paginate(query, options)
}

export async function findAndUpdateRole(
    query: FilterQuery<RoleDocument>,
    update: UpdateQuery<RoleDocument>,
    options: QueryOptions
) {
    return RoleModel.findOneAndUpdate(query, update, options)
}

export async function deleteRole(query: FilterQuery<RoleDocument>) {
    return RoleModel.deleteOne(query)
}