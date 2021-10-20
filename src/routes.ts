import { Express, Request, Response } from 'express'
import {createUserHandler} from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserScema} from "./schema/user.schema";
import {
    createUserSessionHandler,
    deleteUserSessionHandler,
    getUserSessionHandler
} from "./controller/session.controller";
import {createSessionSchema} from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validateResource(createUserScema),createUserHandler)
    app.post('/api/sessions', validateResource(createSessionSchema),createUserSessionHandler)
    app.get('/api/sessions', requireUser, getUserSessionHandler)
    app.delete('/api/sessions', requireUser, deleteUserSessionHandler)
}

export default routes