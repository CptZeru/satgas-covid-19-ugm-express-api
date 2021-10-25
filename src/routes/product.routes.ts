import { Router } from 'express'
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema
} from "../schema/product.schema";
import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    updateProductHandler
} from "../controller/product.controller";

const productRoute = Router()

productRoute.post(
    '/',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
)
productRoute.put(
    '/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
)
productRoute.get(
    '/:productId',
    validateResource(getProductSchema),
    getProductHandler
)
productRoute.delete(
    '/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
)

export default productRoute