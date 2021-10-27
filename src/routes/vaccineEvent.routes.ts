import {Router} from "express";
import requireUser from "../middleware/requireUser";
import {
    createVaccineEventHandler, deleteVaccineEventHandler,
    getVaccineEventHandler,
    getVaccineEventsHandler, updateVaccineEventHandler
} from "../controller/vaccineEvent.controller";
import roleRestriction from "../middleware/roleRestriction";
import config from "config";
import validateResource from "../middleware/validateResource";
import {
    createVaccineEventSchema,
    deleteVaccineEventSchema,
    readVaccineEventSchema, updateVaccineEventSchema
} from "../schema/vaccineEvent.schema";

const vaccineEventRoutes = Router()

vaccineEventRoutes.get('/', requireUser, getVaccineEventsHandler)
vaccineEventRoutes.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(createVaccineEventSchema)
    ],
    createVaccineEventHandler
)
vaccineEventRoutes.get(
    '/:vaccineEventId',
    [
        requireUser,
        validateResource(readVaccineEventSchema)
    ],
    getVaccineEventHandler
)
vaccineEventRoutes.put(
    '/:vaccineEventId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(updateVaccineEventSchema)
    ],
    updateVaccineEventHandler
)
vaccineEventRoutes.delete(
    '/:vaccineEventId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(deleteVaccineEventSchema)
    ],
    deleteVaccineEventHandler
)

export default vaccineEventRoutes