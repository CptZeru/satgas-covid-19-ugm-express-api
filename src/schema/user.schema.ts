import { object, string, TypeOf } from 'zod'

const params = {
    params: object({
        userId: string({
            required_error: 'userId is required'
        })
    })
}

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'name is required'
        }),
        password: string({
            required_error: 'password is required'
        }).min(6, 'password too short - should be 6 chars minimum'),
        passwordConfirmation: string({
            required_error: 'passwordConfirmation is required'
        }),
        email: string({
            required_error: 'email  is required'
        }).email('not a valid email'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'passwords do not match',
        path: ['passwordConfirmation']
    })
})

export const getUserSchema = object({
    ...params
})

export const deleteUserSchema = object({
    ...params
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>
export type ReadUserInput = TypeOf<typeof getUserSchema>
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>