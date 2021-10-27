import {Request, Response, Router} from 'express'
import productRoutes from "./product.routes";
import sessionRoutes from "./session.routes";
import userRoutes from "./user.routes";
import roleRoutes from "./role.routes";
import vaccineEventRoutes from "./vaccineEvent.routes";
import patientRoutes from "./patient.routes";

const routes = Router()

routes.get('/ping', (req: Request, res: Response) => res.sendStatus(200))
routes.use('/api/users', userRoutes)
routes.use('/api/products', productRoutes)
routes.use('/api/sessions', sessionRoutes)
routes.use('/api/roles', roleRoutes)
routes.use('/api/event/vaccine', vaccineEventRoutes)
routes.use('/api/patients', patientRoutes)

export default routes