import { Router } from 'express'
import validateResource from "../middleware/validateResource";
import {createSessionSchema} from "../schema/session.schema";
import {
    createUserSessionHandler,
    deleteUserSessionHandler,
    getUserSessionHandler
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";

const sessionRoutes = Router()

sessionRoutes.post('/', validateResource(createSessionSchema),createUserSessionHandler)
sessionRoutes.get('/', requireUser, getUserSessionHandler)
sessionRoutes.delete('/', requireUser, deleteUserSessionHandler)

export default sessionRoutes