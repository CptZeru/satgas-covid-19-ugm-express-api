import {Request, Response} from "express";
import logger from "../utils/logger";
import config from "config";

export async function createHandler(
    req: Request<{},{},{}>,
    res: Response
) {
    try {

    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getsHandler(
    req: Request,
    res: Response
) {
    try {

    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getHandler(
    req: Request<{},{},{}>,
    res: Response
) {
    try {

    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function updateHandler(
    req: Request<{},{},{}>,
    res: Response
) {
    try {

    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deleteHandler(
    req: Request<{},{},{}>,
    res: Response
) {
    try {

    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}