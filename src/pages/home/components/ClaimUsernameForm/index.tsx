import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { error } from "console";
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
    username: z.string().min(3, { message: 'At least 3 letters.' }).regex(/ˆ([a-z\\-]+)$/i, { message: 'Only letters and - are allowed.' }).transform(value => value.toLowerCase())
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema),
    })

    const router = useRouter()

    async function handleClaimUsername(data: ClaimUsernameFormData) {
        const { username } = data

        router.push(`/register?username=${username}`)
    }

    return (
        <>
            <Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput size='sm' prefix="ignite.com/" placeholder="your-username" {...register('username')} />
                <Button size='sm' type="submit">
                    Claim
                    <ArrowRight />
                </Button>
            </Form>

            <FormAnnotation>
                <Text size='sm'>
                    {errors.username ? errors.username.message : 'Type the username that you want!'}
                </Text>
            </FormAnnotation>
        </>
    )
}