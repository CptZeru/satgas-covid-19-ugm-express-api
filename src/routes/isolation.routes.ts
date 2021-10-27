import {Router} from "express";
import requireUser from "../middleware/requireUser";
import roleRestriction from "../middleware/roleRestriction";
import config from "config";
import validateResource from "../middleware/validateResource";
import {
    createIsolationHandler, deleteIsolationHandler,
    getIsolationHandler,
    getIsolationsHandler,
    updateIsolationHandler
} from "../controller/isolation.controller";
import {
    createIsolationSchema,
    deleteIsolationSchema,
    readIsolationSchema,
    updateIsolationSchema
} from "../schema/isolation.schema";

const isolationRoutes = Router()

isolationRoutes.get(
    '/',
    requireUser,
    getIsolationsHandler
)
isolationRoutes.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(createIsolationSchema)
    ],
    createIsolationHandler
)
isolationRoutes.get(
    '/:isolationId',
    [
        requireUser,
        validateResource(readIsolationSchema)
    ],
    getIsolationHandler
)
isolationRoutes.put(
    '/:isolationId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(updateIsolationSchema)
    ],
    updateIsolationHandler
)
isolationRoutes.delete(
    '/:isolationId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(deleteIsolationSchema)
    ],
    deleteIsolationHandler
)

export default isolationRoutes