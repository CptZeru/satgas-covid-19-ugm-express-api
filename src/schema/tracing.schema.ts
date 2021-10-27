import {object, string, TypeOf} from "zod";

const payload = {
    body: object({
        patient: string({
            required_error: 'patient is required'
        }),
        place: string({
            required_error: 'place is required'
        }),
        description: string({
            required_error: 'description is required'
        }),
        identificationMethod: string({
            required_error: 'identificationMethod is required'
        }),
    })
}

const updatePayload = {
    body: object({
        patient: string().optional(),
        place: string().optional(),
        description: string().optional(),
        identificationMethod: string().optional()
    })
}

const params = {
    params: object({
        tracingId: string({
            required_error: 'tracingId is required'
        })
    })
}

export const createTracingSchema = object({
    ...payload,
})
export const updateTracingSchema = object({
    ...updatePayload,
    ...params
})
export const readTracingSchema = object({
    ...params
})
export const deleteTracingSchema = object({
    ...params
})

export type CreateTracingInput = TypeOf<typeof createTracingSchema>
export type UpdateTracingInput = TypeOf<typeof updateTracingSchema>
export type ReadTracingInput = TypeOf<typeof readTracingSchema>
export type DeleteTracingInput = TypeOf<typeof deleteTracingSchema>