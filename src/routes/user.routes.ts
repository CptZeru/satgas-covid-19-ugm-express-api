import { Router } from 'express'
import validateResource from "../middleware/validateResource";
import {createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema} from "../schema/user.schema";
import {
    createUserHandler,
    deleteUserHandler,
    getUserHandler,
    getMeUserHandler,
    getUsersHandler, updateUserHandler
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import roleRestriction from "../middleware/roleRestriction";
import config from "config";

const userRoutes = Router()

userRoutes.get('/me', requireUser,getMeUserHandler)
userRoutes.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(createUserSchema)
    ],
    createUserHandler
)
userRoutes.get(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')])
    ],
    getUsersHandler
)
userRoutes.get(
    '/:userId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(getUserSchema)
    ],
    getUserHandler
)
userRoutes.delete(
    '/:userId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(deleteUserSchema)
    ],
    deleteUserHandler
)
userRoutes.put(
    '/:userId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(updateUserSchema)
    ],
    updateUserHandler
)

export default userRoutes