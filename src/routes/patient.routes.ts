import { Router} from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import roleRestriction from "../middleware/roleRestriction";
import config from "config";
import {
    createPatientHandler, deletePatientHandler,
    getPatientHandler,
    getPatientsHandler,
    updatePatientHandler
} from "../controller/patient.controller";
import {
    createPatientSchema,
    deletePatientSchema,
    readPatientSchema,
    updatePatientSchema
} from "../schema/patient.schema";

const patientRoutes = Router()

patientRoutes.get(
    '/',
    requireUser,
    getPatientsHandler
)
patientRoutes.post(
    '/',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(createPatientSchema)
    ],
    createPatientHandler
)
patientRoutes.get(
    '/:patientId',
    [
        requireUser,
        validateResource(readPatientSchema)
    ],
    getPatientHandler
)
patientRoutes.put(
    '/:patientId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(updatePatientSchema)
    ],
    updatePatientHandler
)
patientRoutes.delete(
    '/:patientId',
    [
        requireUser,
        roleRestriction([config.get<string>('operatorRoleId'), config.get<string>('superAdminRoleId')]),
        validateResource(deletePatientSchema)
    ],
    deletePatientHandler
)

export default patientRoutes
