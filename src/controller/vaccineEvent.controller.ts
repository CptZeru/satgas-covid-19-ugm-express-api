import {Request, Response} from "express";
import logger from "../utils/logger";
import config from "config";
import {
    CreateVaccineEventInput,
    DeleteVaccineEventInput,
    ReadVaccineEventInput,
    UpdateVaccineEventInput
} from "../schema/vaccineEvent.schema";
import {
    createVaccineEvent,
    deleteVaccineEvent, findAndUpdateVaccineEvent,
    findVaccineEvent,
    findVaccineEvents
} from "../service/vaccineEvent.service";
import {VaccineEventInput} from "../models/vaccineEvent.model";
import {safeQuery} from "../utils/safeQuery.utils";

export async function createVaccineEventHandler(
    req: Request<{},{},CreateVaccineEventInput['body']>,
    res: Response
) {
    try {
        const user = res.locals.user._id

        const payload = req.body

        const input: VaccineEventInput = { ...payload, createdBy: user, updatedBy: user }

        const vaccineEvent = await createVaccineEvent(input)

        return res.send(vaccineEvent)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getVaccineEventsHandler(
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

        const vaccineEvents = await findVaccineEvents(query, options)

        return res.send(vaccineEvents)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getVaccineEventHandler(
    req: Request<ReadVaccineEventInput['params'],{},{}>,
    res: Response
) {
    try {
        const vaccineEventId = req.params.vaccineEventId

        const vaccineEvent = await findVaccineEvent({ _id: vaccineEventId })

        if(!vaccineEvent) return res.sendStatus(404)

        return res.send(vaccineEvent)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function updateVaccineEventHandler(
    req: Request<UpdateVaccineEventInput['params'],{},UpdateVaccineEventInput['body']>,
    res: Response
) {
    try {

        const user = res.locals.user._id

        const payload = req.body

        const query = { _id: req.params.vaccineEventId}

        const vaccineEvent = await findVaccineEvent(query)

        if(!vaccineEvent) return res.sendStatus(404)

        if(payload.title) vaccineEvent.title = payload.title
        if(payload.organiser) vaccineEvent.organiser = payload.organiser
        if(payload.vaccineType) vaccineEvent.vaccineType = payload.vaccineType
        if(payload.dose) vaccineEvent.dose = payload.dose
        if(payload.documentation) vaccineEvent.documentation = payload.documentation
        if(payload.location) vaccineEvent.location = payload.location
        if(payload.time) vaccineEvent.time = payload.time
        vaccineEvent.updatedBy = user

        const updatedVaccineEvent = await findAndUpdateVaccineEvent(
            query,
            vaccineEvent,
            { new: true, populate: ['createdBy', 'updatedBy'] }
        )

        return res.send(updatedVaccineEvent)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deleteVaccineEventHandler(
    req: Request<DeleteVaccineEventInput['params'],{},{}>,
    res: Response
) {
    try {
        const vaccineEventId = req.params.vaccineEventId

        const vaccineEvent = await findVaccineEvent({ _id: vaccineEventId })

        if(!vaccineEvent) return res.sendStatus(404)

        await deleteVaccineEvent({ _id: vaccineEventId })

        return res.sendStatus(200)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}