import {FilterQuery, QueryOptions} from 'mongoose'
import { omit } from 'lodash'
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
    try {
        const user = await UserModel.create(input)
        return omit(user.toJSON(), 'password')
    } catch (e: any) {
        throw new Error(e)
    }
}

// called parameter destructuring
export async function validatePassword({email, password}:{email: string, password: string}) {
    const user = await UserModel.findOne({ email })

    if(!user) return false

    const isValid = await user.comparePassword(password)

    if(!isValid) return false

    return omit(user.toJSON(), 'password')
}

export async function findUser(query: FilterQuery<UserDocument>, options: QueryOptions = {lean:true}){
    return UserModel.findOne(query, {}, options)
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
    return UserModel.deleteOne(query)
}