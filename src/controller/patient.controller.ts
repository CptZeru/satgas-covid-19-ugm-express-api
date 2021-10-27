import {Request, Response} from "express";
import logger from "../utils/logger";
import config from "config";
import {CreatePatientInput, DeletePatientInput, ReadPatientInput, UpdatePatientInput} from "../schema/patient.schema";
import {
    createPatient,
    deletePatient,
    findAndUpdatePatient,
    findPatient,
    findPatients
} from "../service/patient.service";
import {PatientInput} from "../models/patient.model";
import {safeQuery} from "../utils/safeQuery.utils";
import {deleteVaccineEvent, findAndUpdateVaccineEvent, findVaccineEvent} from "../service/vaccineEvent.service";

export async function createPatientHandler(
    req: Request<{},{},CreatePatientInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const payload = req.body

        const input: PatientInput = { ...payload, createdBy: user, updatedBy: user }

        const patient = await createPatient(input)

        return res.send(patient)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getPatientsHandler(
    req: Request,
    res: Response
) {
    try {
        const {
            select,
            page,
            sort = 'createdAt',
            populate,
            lean = true,
            offset,
            limit,
            ...query
        }= safeQuery(req)
        const options = {
            select,
            page: page ? parseInt(page):1,
            sort,
            lean,
            offset: offset ? parseInt(offset):0,
            limit: limit ? parseInt(limit):5,
            populate: [{ path: 'createdBy', select: '-password' }, { path: 'updatedBy', select: '-password' }]
        }

        const patients = await findPatients(query, options)

        return res.send(patients)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getPatientHandler(
    req: Request<ReadPatientInput['params'],{},{}>,
    res: Response
) {
    try {
        const patientId = req.params.patientId

        const patient = await findPatient({ _id: patientId })

        return res.send(patient)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function updatePatientHandler(
    req: Request<UpdatePatientInput['params'],{},UpdatePatientInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const payload = req.body

        const query = { _id: req.params.patientId}

        const patient = await findPatient(query)

        if(!patient) return res.sendStatus(404)

        if(payload.name) patient.name = payload.name
        if(payload.nik) patient.nik = payload.nik
        if(payload.gender) patient.gender = payload.gender
        if(payload.address) patient.address = payload.address
        if(payload.phoneNumber) patient.phoneNumber = payload.phoneNumber
        if(payload.facultyWorkUnit) patient.facultyWorkUnit = payload.facultyWorkUnit
        if(payload.onsetDate) patient.onsetDate = payload.onsetDate
        if(payload.epidemiologyStatus) patient.epidemiologyStatus = payload.epidemiologyStatus
        if(payload.action) patient.action = payload.action
        patient.updatedBy = user

        const updatedPatient = await findAndUpdatePatient(
            query,
            patient,
            {
                new: true,
                populate: [{ path: 'createdBy', select: '-password' }, { path: 'updatedBy', select: '-password' }]
            }
        )

        return res.send(updatedPatient)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deletePatientHandler(
    req: Request<DeletePatientInput['params'],{},{}>,
    res: Response
) {
    try {
        const patientId = req.params.patientId

        const patient = await findPatient({ _id: patientId })

        if(!patient) return res.sendStatus(404)

        await deletePatient({ _id: patientId })

        return res.sendStatus(200)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}