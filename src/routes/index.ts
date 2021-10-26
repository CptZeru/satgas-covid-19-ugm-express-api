import {Request, Response, Router} from 'express'
import productRoute from "./product.routes";
import sessionRoute from "./session.routes";
import userRoute from "./user.routes";
import roleRoute from "./role.routes";

const routes = Router()

routes.get('/ping', (req: Request, res: Response) => res.sendStatus(200))
routes.use('/api/users', userRoute)
routes.use('/api/products', productRoute)
routes.use('/api/sessions', sessionRoute)
routes.use('/api/roles', roleRoute)

export default routes