import {Request, Response} from "express";
import {CreateRoleInput, DeleteRoleInput, ReadRoleInput, UpdateRoleInput} from "../schema/role.schema";
import {createRole, deleteRole, findAndUpdateRole, findRole, findRoles} from "../service/role.service";
import {safeQuery} from "../utils/safeQuery.utils";
import logger from "../utils/logger";
import config from "config";

export async function createRoleHandler(req: Request<{}, {}, CreateRoleInput['body']>, res: Response) {
    try {
        const role = await createRole(req.body)

        return res.send(role)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getRoleHandler(req: Request<ReadRoleInput['params']>, res: Response) {
    try {
        const roleId = req.params.roleId

        const role = await findRole({ _id: roleId })

        if(!role) return res.sendStatus(404)

        return res.send(role)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getRolesHandler(req: Request, res: Response) {
    try {
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
            limit: limit ? parseInt(limit):5
        }

        const roles = await findRoles(query, options)

        return res.send(roles)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function updateRoleHandler(
    req: Request<UpdateRoleInput['params'], {}, UpdateRoleInput['body']>,
    res: Response
) {
    try {
        const roleId = req.params.roleId

        const update = req.body

        const query = { _id: roleId }

        const role = await findRole({ _id: roleId })

        if(!role) return res.sendStatus(404)

        const updatedRole = await findAndUpdateRole(query, update, { new: true })

        return res.send(updatedRole)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deleteRoleHandler(req: Request<DeleteRoleInput['params']>, res: Response) {
    try {
        const roleId = req.params.roleId

        const query = { _id: roleId }

        const role = await findRole(query)

        if(!role) return res.sendStatus(404)

        await deleteRole(query)

        return res.sendStatus(200)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}