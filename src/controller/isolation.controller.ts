import {Request, Response} from "express";
import logger from "../utils/logger";
import config from "config";
import {
    CreateIsolationInput,
    DeleteIsolationInput,
    ReadIsolationInput,
    UpdateIsolationInput
} from "../schema/isolation.schema";
import {findPatient} from "../service/patient.service";
import {IsolationInput} from "../models/isolation.model";
import {
    createIsolation,
    deleteIsolation,
    findAndUpdateIsolation,
    findIsolation,
    findIsolations
} from "../service/isolation.service";
import {safeQuery} from "../utils/safeQuery.utils";
import mongoose from "mongoose";

export async function createIsolationHandler(
    req: Request<{},{},CreateIsolationInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const { patient, ...payload } = req.body

        const getPatient = await findPatient({ _id: patient })

        if(!getPatient) return res.sendStatus(404)

        const input: IsolationInput = {
            ...payload,
            patient: getPatient._id,
            createdBy: user,
            updatedBy: user,
        }

        const isolation = await createIsolation(input)

        return res.send(isolation)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getIsolationsHandler(
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
            populate: [
                { path: 'patient' },
                { path: 'createdBy', select: '-password' },
                { path: 'updatedBy', select: '-password' }
            ]
        }

        const isolations = await findIsolations(query, options)

        return res.send(isolations)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getIsolationHandler(
    req: Request<ReadIsolationInput['params'],{},{}>,
    res: Response
) {
    try {
        const isolationId = req.params.isolationId

        const isolation = await findIsolation({ _id: isolationId })

        return res.send(isolation)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function updateIsolationHandler(
    req: Request<UpdateIsolationInput['params'],{},UpdateIsolationInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const payload = req.body

        const query = { _id: req.params.isolationId }

        const isolation = await findIsolation(query)

        if(!isolation) return res.sendStatus(404)

        if(payload.patient) {
            const patient = await findPatient({ _id: payload.patient })

            if(!patient) return res.sendStatus(404)

            isolation.patient = new mongoose.Types.ObjectId(payload.patient)
        }
        if(payload.location) isolation.location = payload.location
        if(payload.status) isolation.status = payload.status
        if(payload.entryDate) isolation.entryDate = payload.entryDate
        if(payload.actualReturnDate) isolation.actualReturnDate = payload.actualReturnDate
        isolation.updatedBy = user

        const updatedIsolation = await findAndUpdateIsolation(
            query,
            isolation,
            {
                new: true,
                populate: [
                    { path: 'patient' },
                    { path: 'createdBy', select: '-password' },
                    { path: 'updatedBy', select: '-password' }
                ]
            }
        )

        return res.send(updatedIsolation)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deleteIsolationHandler(
    req: Request<DeleteIsolationInput['params'],{},{}>,
    res: Response
) {
    try {
        const isolationId = req.params.isolationId

        const isolation = await findIsolation({ _id: isolationId })

        if(!isolation) return res.sendStatus(404)

        await deleteIsolation({ _id: isolationId })

        return res.sendStatus(200)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}