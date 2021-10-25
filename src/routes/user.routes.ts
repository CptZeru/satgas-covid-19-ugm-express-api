import { Router } from 'express'
import validateResource from "../middleware/validateResource";
import {createUserSchema, deleteUserSchema, getUserSchema} from "../schema/user.schema";
import {
    createUserHandler,
    deleteUserHandler,
    getUserHandler,
    getMeUserHandler,
    getUsersHandler
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";

const userRoute = Router()

userRoute.post('/', [requireUser, validateResource(createUserSchema)],createUserHandler)
userRoute.get('/', requireUser,getUsersHandler)
userRoute.get('/me', requireUser,getMeUserHandler)
userRoute.get('/:userId', [requireUser, validateResource(getUserSchema)],getUserHandler)
userRoute.delete('/:userId', [requireUser, validateResource(deleteUserSchema)],deleteUserHandler)

export default userRoute