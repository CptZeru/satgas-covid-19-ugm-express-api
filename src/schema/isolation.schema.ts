import {object, string, TypeOf} from "zod";
import dayjs from "dayjs";

const payload = {
    body: object({
        patient: string({
            required_error: 'patient is required'
        }),
        location: string({
            required_error: 'location is required'
        }),
        entryDate: string({
            required_error: 'entryDate is required'
        }),
        status: string({
            required_error: 'status is required'
        })
    }).refine((data) => dayjs(data.entryDate).isValid(), {
        message: 'entryDate is not valid',
        path: ['entryDate']
    })
}

const updatePayload = {
    body: object({
        patient: string().optional(),
        location: string().optional(),
        entryDate: string().optional(),
        status: string().optional(),
        actualReturnDate: string().optional(),
    }).refine((data) => dayjs(data.entryDate).isValid(), {
        message: 'entryDate is not valid',
        path: ['entryDate']
    }).refine((data) => dayjs(data.actualReturnDate).isValid(), {
        message: 'actualReturnDate is not valid',
        path: ['actualReturnDate']
    })
}

const params = {
    params: object({
        isolationId: string({
            required_error: 'isolationId is required'
        })
    })
}

export const createIsolationSchema = object({
    ...payload,
})
export const updateIsolationSchema = object({
    ...updatePayload,
    ...params
})
export const readIsolationSchema = object({
    ...params
})
export const deleteIsolationSchema = object({
    ...params
})

export type CreateIsolationInput = TypeOf<typeof createIsolationSchema>
export type UpdateIsolationInput = TypeOf<typeof updateIsolationSchema>
export type ReadIsolationInput = TypeOf<typeof readIsolationSchema>
export type DeleteIsolationInput = TypeOf<typeof deleteIsolationSchema>