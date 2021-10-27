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

const productRoutes = Router()

productRoutes.post(
    '/',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
)
productRoutes.put(
    '/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
)
productRoutes.get(
    '/:productId',
    validateResource(getProductSchema),
    getProductHandler
)
productRoutes.delete(
    '/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
)

export default productRoutes