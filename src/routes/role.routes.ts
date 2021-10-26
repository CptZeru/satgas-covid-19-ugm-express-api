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
import roleRestriction from "../middleware/roleRestriction";
import config from "config";

const roleRoute = Router()

roleRoute.get(
    '/',
   [
       requireUser,
       roleRestriction([config.get<string>('superAdminRoleId')])
   ],
    getRolesHandler
)
roleRoute.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(createRoleSchema)
    ],
    createRoleHandler
)
roleRoute.get(
    '/:roleId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(readRoleSchema)
    ],
    getRoleHandler
)
roleRoute.put(
    '/:roleId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(updateRoleSchema)
    ],
    updateRoleHandler
)
roleRoute.delete(
    '/:roleId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(deleteRoleSchema)
    ],
    deleteRoleHandler
)

export default roleRoute
