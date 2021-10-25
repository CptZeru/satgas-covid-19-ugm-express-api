import { Router } from 'express'
import validateResource from "../middleware/validateResource";
import {createSessionSchema} from "../schema/session.schema";
import {
    createUserSessionHandler,
    deleteUserSessionHandler,
    getUserSessionHandler
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";

const sessionRoute = Router()

sessionRoute.post('/', validateResource(createSessionSchema),createUserSessionHandler)
sessionRoute.get('/', requireUser, getUserSessionHandler)
sessionRoute.delete('/', requireUser, deleteUserSessionHandler)

export default sessionRoute