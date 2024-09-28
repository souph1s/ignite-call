import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'At least 3 letters.' })
        .regex(/^([a-z\-]+)$/i, { message: 'Only letters and - are allowed.' })
        .transform(value => value.toLowerCase()),
    name: z.string().min(3, { message: 'At least 3 letters.' })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const { formState: { errors, isSubmitting }, register, handleSubmit, setValue } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    useEffect(() => {
        if (router.query?.username) {
            setValue('username', String(router.query?.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFormData) {
        try {
            await api.post('/users', {
                name: data.name,
                username: data.username
            })
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return
            }
            console.log(err)
        }
    }

    return (
        <Container>
            <Header>
                <Heading as='strong'>Welcome to Ignite Call!</Heading>
                <Text>We need some informations to create your profile. Oh, you can edit this later!</Text>
                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as='form' onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size='sm'>Username</Text>
                    <TextInput prefix="ignite.com/" placeholder="your-username" {...register('username')} />
                </label>

                {errors.username && (
                    <FormError size='sm'>
                        {errors.username.message}
                    </FormError>
                )}

                <label>
                    <Text size='sm'>Full name</Text>
                    <TextInput placeholder="your name" {...register('name')} />
                </label>

                {errors.name && (
                    <FormError size='sm'>
                        {errors.name.message}
                    </FormError>
                )}

                <Button type="submit" disabled={isSubmitting}>
                    Next Step
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}