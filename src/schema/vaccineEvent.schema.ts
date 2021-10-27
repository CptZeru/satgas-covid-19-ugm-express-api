import {number, object, string, TypeOf} from "zod";
import dayjs from "dayjs";

const payload = {
    body: object({
        title: string({
            required_error: 'title is required'
        }),
        organiser: string({
            required_error: 'organiser is required'
        }),
        location: string({
            required_error: 'location is required'
        }),
        vaccineType: string({
            required_error: 'vaccineType is required'
        }),
        dose: number({
            required_error: 'dose is required'
        }),
        time: string({
            required_error: 'time is required'
        }),
        documentation: string().optional()
    }).refine((data) => dayjs(data.time).isValid(), {
        message: 'time is not valid',
        path: ['time']
    })
}

const updatePayload = {
    body: object({
        title: string().optional(),
        organiser: string().optional(),
        location: string().optional(),
        vaccineType: string().optional(),
        dose: number().optional(),
        time: string().optional(),
        documentation: string().optional()
    }).refine((data) => dayjs(data.time).isValid(), {
        message: 'time is not valid',
        path: ['time']
    })
}

const params = {
    params: object({
        vaccineEventId: string({
            required_error: 'vaccineEventId is required'
        })
    })
}

export const createVaccineEventSchema = object({
    ...payload,
})
export const updateVaccineEventSchema = object({
    ...updatePayload,
    ...params
})
export const readVaccineEventSchema = object({
    ...params
})
export const deleteVaccineEventSchema = object({
    ...params
})

export type CreateVaccineEventInput = TypeOf<typeof createVaccineEventSchema>
export type UpdateVaccineEventInput = TypeOf<typeof updateVaccineEventSchema>
export type ReadVaccineEventInput = TypeOf<typeof readVaccineEventSchema>
export type DeleteVaccineEventInput = TypeOf<typeof deleteVaccineEventSchema>