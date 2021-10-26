import {Request, Response} from "express";
import logger from "../utils/logger";
import { omit } from 'lodash'
import {createUser, deleteUser, findAndUpdateUser, findUser, findUsers} from '../service/user.service'
import {CreateUserInput, DeleteUserInput, ReadUserInput, UpdateUserInput} from "../schema/user.schema";
import mongoose from 'mongoose'
import {safeQuery} from "../utils/safeQuery.utils";
import {findRole} from "../service/role.service";

export async function createUserHandler(
    req: Request<{},{}, CreateUserInput["body"]>, res: Response
) {
    try {
        const { role, ...body } = req.body

        const newBody = { role: new mongoose.Types.ObjectId(role), ...body }

        const user = await createUser(newBody)
        return res.send(omit(user , 'password'))
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send({ error: e.message })
    }
}

export async function updateUserHandler(
    req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
    res: Response
) {
    try {
        const userId = req.params.userId

        const query = { _id: userId }

        const payload = req.body

        const user = await findUser(query)

        if (!user) return res.sendStatus(404)

        if(payload.email) user.email = payload.email
        if(payload.password) user.password = payload.password
        if(payload.name) user.name = payload.name
        if(payload.role) {
            const role = await findRole({ _id: payload.role })
            if (role) user.role = role._id
        }

        const updatedUser = await findAndUpdateUser(query, user, { new: true }) // return updated data

        return res.send(updatedUser)
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send({ error: e.message })
    }
}

export async function getUserHandler(req: Request<ReadUserInput["params"]>, res: Response) {
    const userId = req.params.userId
    const user = await findUser({ _id: userId })

    if(!user) return res.sendStatus(404)

    return res.send(user)
}

export async function getUsersHandler(req: Request, res: Response) {
    const {
        select,
        page,
        sort = 'createdAt',
        populate,
        lean = true,
        offset,
        limit,
        ...query
    }= safeQuery(req)
    const options = {
        select,
        page: page ? parseInt(page):1,
        sort,
        lean,
        offset: offset ? parseInt(offset):0,
        limit: limit ? parseInt(limit):5,
        populate: 'role'
    }
    const users = await findUsers(query, options)

    return res.send(users)
}

export async function getMeUserHandler(req: Request<ReadUserInput["params"]>, res: Response) {
    const userId = res.locals.user

    const user = await findUser({ _id: userId })

    if(!user) return res.sendStatus(404)

    return res.send(user)
}

export async function deleteUserHandler(req: Request<DeleteUserInput["params"]>, res: Response) {

    const userId = req.params.userId

    const user = await findUser({ _id: userId })

    if(!user) return res.sendStatus(404)

    await deleteUser({ _id: userId })

    return res.sendStatus(200)
}