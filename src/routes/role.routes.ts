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

const roleRoutes = Router()

roleRoutes.get(
    '/',
   [
       requireUser,
       roleRestriction([config.get<string>('superAdminRoleId')])
   ],
    getRolesHandler
)
roleRoutes.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(createRoleSchema)
    ],
    createRoleHandler
)
roleRoutes.get(
    '/:roleId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(readRoleSchema)
    ],
    getRoleHandler
)
roleRoutes.put(
    '/:roleId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(updateRoleSchema)
    ],
    updateRoleHandler
)
roleRoutes.delete(
    '/:roleId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(deleteRoleSchema)
    ],
    deleteRoleHandler
)

export default roleRoutes
