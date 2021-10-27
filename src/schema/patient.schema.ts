import {object, string, TypeOf} from "zod";
import dayjs from "dayjs";

const payload = {
    body: object({
        name: string({
            required_error: 'name is required'
        }),
        nik: string({
            required_error: 'nik is required'
        }),
        gender: string({
            required_error: 'gender is required'
        }),
        address: string({
            required_error: 'address is required'
        }),
        phoneNumber: string({
            required_error: 'phoneNumber is required'
        }),
        facultyWorkUnit: string({
            required_error: 'facultyWorkUnit is required'
        }),
        onsetDate: string({
            required_error: 'onsetDate is required'
        }),
        epidemiologyStatus: string({
            required_error: 'epidemiologyStatus is required'
        }),
        action: string({
            required_error: 'action is required'
        }),
    }).refine((data) => dayjs(data.onsetDate).isValid(), {
        message: 'onsetDate is not valid',
        path: ['onsetDate']
    })
}

const updatePayload = {
    body: object({
        name: string().optional(),
        nik: string().optional(),
        gender: string().optional(),
        address: string().optional(),
        phoneNumber: string().optional(),
        facultyWorkUnit: string().optional(),
        onsetDate: string().optional(),
        epidemiologyStatus: string().optional(),
        action: string().optional(),
    }).refine((data) => dayjs(data.onsetDate).isValid(), {
        message: 'onsetDate is not valid',
        path: ['onsetDate']
    })
}

const params = {
    params: object({
        patientId: string({
            required_error: 'patientId is required'
        })
    })
}

export const createPatientSchema = object({
    ...payload,
})
export const updatePatientSchema = object({
    ...updatePayload,
    ...params
})
export const readPatientSchema = object({
    ...params
})
export const deletePatientSchema = object({
    ...params
})

export type CreatePatientInput = TypeOf<typeof createPatientSchema>
export type UpdatePatientInput = TypeOf<typeof updatePatientSchema>
export type ReadPatientInput = TypeOf<typeof readPatientSchema>
export type DeletePatientInput = TypeOf<typeof deletePatientSchema>