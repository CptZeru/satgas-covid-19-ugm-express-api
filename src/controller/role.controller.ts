import {Request, Response} from "express";
import {CreateRoleInput, DeleteRoleInput, ReadRoleInput, UpdateRoleInput} from "../schema/role.schema";
import {createRole, deleteRole, findAndUpdateRole, findRole, findRoles} from "../service/role.service";
import {safeQuery} from "../utils/safeQuery.utils";

export async function createRoleHandler(req: Request<{}, {}, CreateRoleInput['body']>, res: Response) {
    const role = await createRole(req.body)

    return res.send(role)
}

export async function getRoleHandler(req: Request<ReadRoleInput['params']>, res: Response) {
    const roleId = req.params.roleId

    const role = await findRole({ _id: roleId })

    if(!role) return res.sendStatus(404)

    return res.send(role)
}

export async function getRolesHandler(req: Request, res: Response) {
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
}

export async function updateRoleHandler(
    req: Request<UpdateRoleInput['params'], {}, UpdateRoleInput['body']>,
    res: Response
) {
    const roleId = req.params.roleId

    const update = req.body

    const query = { _id: roleId }

    const role = await findRole({ _id: roleId })

    if(!role) return res.sendStatus(404)

    const updatedRole = await findAndUpdateRole(query, update, { new: true })

    return res.send(updatedRole)
}

export async function deleteRoleHandler(req: Request<DeleteRoleInput['params']>, res: Response) {
    const roleId = req.params.roleId

    const query = { _id: roleId }

    const role = await findRole(query)

    if(!role) return res.sendStatus(404)

    await deleteRole(query)

    return res.sendStatus(200)
}