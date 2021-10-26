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

const userRoute = Router()

userRoute.get('/me', requireUser,getMeUserHandler)
userRoute.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(createUserSchema)
    ],
    createUserHandler
)
userRoute.get(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')])
    ],
    getUsersHandler
)
userRoute.get(
    '/:userId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(getUserSchema)
    ],
    getUserHandler
)
userRoute.delete(
    '/:userId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(deleteUserSchema)
    ],
    deleteUserHandler
)
userRoute.put(
    '/:userId',
    [
        requireUser,
        roleRestriction([config.get<string>('superAdminRoleId')]),
        validateResource(updateUserSchema)
    ],
    updateUserHandler
)

export default userRoute