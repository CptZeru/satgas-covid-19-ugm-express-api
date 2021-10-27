import {Request, Response} from "express";
import logger from "../utils/logger";
import config from "config";
import {CreateTracingInput, DeleteTracingInput, ReadTracingInput, UpdateTracingInput} from "../schema/tracing.schema";
import {TracingInput} from "../models/tracing.model";
import {
    createTracing,
    deleteTracing,
    findAndUpdateTracing,
    findTracing,
    findTracings
} from "../service/tracing.service";
import {findPatient} from "../service/patient.service";
import * as mongoose from "mongoose";
import {safeQuery} from "../utils/safeQuery.utils";

export async function createTracingHandler(
    req: Request<{},{},CreateTracingInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const { patient, ...payload } = req.body

        const getPatient = await findPatient({ _id: patient })

        if(!getPatient) return res.sendStatus(404)

        const input: TracingInput = { ...payload, patient: getPatient._id, createdBy: user, updatedBy: user }

        const tracing = await createTracing(input)

        return res.send(tracing)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getTracingsHandler(
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

        const tracings = await findTracings(query, options)

        return res.send(tracings)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getTracingHandler(
    req: Request<ReadTracingInput['params'],{},{}>,
    res: Response
) {
    try {
        const tracingId = req.params.tracingId

        const tracing = await findTracing({ _id: tracingId })

        return res.send(tracing)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function updateTracingHandler(
    req: Request<UpdateTracingInput['params'],{},UpdateTracingInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const payload = req.body

        const query = { _id: req.params.tracingId }

        const tracing = await findTracing(query)

        if(!tracing) return res.sendStatus(404)

        if(payload.patient) {
            const patient = await findPatient({ _id: payload.patient })

            if(!patient) return res.sendStatus(404)

            tracing.patient = new mongoose.Types.ObjectId(payload.patient)
        }
        if(payload.place) tracing.place = payload.place
        if(payload.description) tracing.description = payload.description
        if(payload.identificationMethod) tracing.identificationMethod = payload.identificationMethod
        tracing.updatedBy = user

        const updatedTracing = await findAndUpdateTracing(
            query,
            tracing,
            {
                new: true,
                populate: [{ path: 'createdBy', select: '-password' }, { path: 'updatedBy', select: '-password' }]
            }
        )

        return res.send(updatedTracing)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deleteTracingHandler(
    req: Request<DeleteTracingInput['params'],{},{}>,
    res: Response
) {
    try {
        const tracingId = req.params.tracingId

        const tracing = await findTracing({ _id: tracingId })

        if(!tracing) return res.sendStatus(404)

        await deleteTracing({ _id: tracingId })

        return res.sendStatus(200)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}