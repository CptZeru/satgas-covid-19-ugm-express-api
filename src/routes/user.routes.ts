import { Router } from 'express'
import validateResource from "../middleware/validateResource";
import {createUserScema} from "../schema/user.schema";
import {createUserHandler} from "../controller/user.controller";

const userRoute = Router()

userRoute.post('/', validateResource(createUserScema),createUserHandler)

export default userRoute