import {NextFunction, Request, Response} from "express";

const roleRestriction = (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.user.role._id

    if (!role || roles.indexOf(role) < 0) return res.status(403).send({ message: 'Unauthorized m-2'})

    return next()
}

export default roleRestriction