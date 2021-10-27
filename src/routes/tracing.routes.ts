import { Router} from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import roleRestriction from "../middleware/roleRestriction";
import config from "config";
import {
    createTracingHandler, deleteTracingHandler,
    getTracingHandler,
    getTracingsHandler,
    updateTracingHandler
} from "../controller/tracing.controller";
import {
    createTracingSchema,
    deleteTracingSchema,
    readTracingSchema,
    updateTracingSchema
} from "../schema/tracing.schema";

const tracingRoutes = Router()

tracingRoutes.get(
    '/',
    requireUser,
    getTracingsHandler
)
tracingRoutes.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(createTracingSchema)
    ],
    createTracingHandler
)
tracingRoutes.get(
    '/:tracingId',
    [
        requireUser,
        validateResource(readTracingSchema)
    ],
    getTracingHandler
)
tracingRoutes.put(
    '/:tracingId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(updateTracingSchema)
    ],
    updateTracingHandler
)
tracingRoutes.delete(
    '/:tracingId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(deleteTracingSchema)
    ],
    deleteTracingHandler
)

export default tracingRoutes
