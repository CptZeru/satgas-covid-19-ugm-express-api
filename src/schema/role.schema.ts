import {object, string, TypeOf} from "zod";

const payload = {
    body: object({
        name: string({
            required_error: 'name is required'
        })
    })
}

const params = {
    params: object({
        roleId: string({
            required_error: 'roleId is required'
        })
    })
}

export const createRoleSchema = object({
    ...payload
})

export const updateRoleSchema = object({
    ...payload,
    ...params
})

export const readRoleSchema = object({
    ...params
})

export const deleteRoleSchema = object({
    ...params
})

export type CreateRoleInput = TypeOf<typeof createRoleSchema>
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>
export type ReadRoleInput = TypeOf<typeof readRoleSchema>
export type DeleteRoleInput = TypeOf<typeof deleteRoleSchema>