import {Request, Response} from "express";
import {validatePassword} from "../service/user.service";
import {createSession, findSessions, updateSession} from "../service/session.service";
import {signJwt} from "../utils/jwt.utils";
import config from "config";
import logger from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        // Validate user password
        const user = await validatePassword(req.body)

        if(!user) return res.status(401).send({ message: 'Invalid email or password' })

        // Create Session
        const session = await createSession(user._id, req.get("user-agent") || "")

        // Create access token
        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get<string>("accessTokenTtl") } // 15 minutes
        )

        // Create refresh token
        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get<string>("refreshTokenTtl") } // 1 year
        )
        // Return access and refresh token
        return res.send({ accessToken, refreshToken })
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function getUserSessionHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id

        const sessions = await findSessions({ user: userId, valid: true })

        return res.send(sessions)
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
    try {
        const sessionId = res.locals.user.session

        await updateSession({ _id: sessionId }, { valid: false })

        return res.send({
            accessToken: null,
            refreshToken: null
        })
    } catch (e: any) {
        logger.error(e)
        return res.status(config.get<number>('catchErrorStatusCode')).send({ error: e.message })
    }
}