import { object, string, TypeOf } from 'zod'

export const createUserScema = object({
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

export type CreateUserInput = Omit<TypeOf<typeof createUserScema>, 'body.passwordConfirmation'>