import {Request, Response} from "express";
import logger from "../utils/logger";
import { omit } from 'lodash'
import {createUser, deleteUser, findUser} from '../service/user.service'
import {CreateUserInput, DeleteUserInput, ReadUserInput} from "../schema/user.schema";
import mongoose from 'mongoose'

export async function createUserHandler(
    req: Request<{},{}, CreateUserInput["body"]>, res: Response
) {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user , 'password'))
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