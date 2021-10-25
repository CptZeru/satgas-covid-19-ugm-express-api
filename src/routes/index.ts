import {Request, Response, Router} from 'express'
import productRoute from "./product.routes";
import sessionRoute from "./session.routes";
import userRoute from "./user.routes";

const routes = Router()

routes.get('/ping', (req: Request, res: Response) => res.sendStatus(200))
routes.use('/api/users', userRoute)
routes.use('/api/products', productRoute)
routes.use('/api/sessions', sessionRoute)

export default routes