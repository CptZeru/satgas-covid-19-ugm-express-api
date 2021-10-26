import {NextFunction, Request, Response} from "express";

const roleRestriction = (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.user.role._id

    if (!role || roles.indexOf(role)) return res.sendStatus(403)

    return next()
}

export default roleRestriction