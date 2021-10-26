import { Router} from "express";
import requireUser from "../middleware/requireUser";
import {
    createRoleHandler,
    deleteRoleHandler,
    getRoleHandler,
    getRolesHandler,
    updateRoleHandler
} from "../controller/role.controller";
import validateResource from "../middleware/validateResource";
import {createRoleSchema, deleteRoleSchema, readRoleSchema, updateRoleSchema} from "../schema/role.schema";

const roleRoute = Router()

roleRoute.get('/', requireUser, getRolesHandler)
roleRoute.post('/', [requireUser, validateResource(createRoleSchema)], createRoleHandler)
roleRoute.get('/:roleId', [requireUser, validateResource(readRoleSchema)], getRoleHandler)
roleRoute.put('/:roleId', [requireUser, validateResource(updateRoleSchema)], updateRoleHandler)
roleRoute.delete('/:roleId', [requireUser, validateResource(deleteRoleSchema)], deleteRoleHandler)

export default roleRoute
