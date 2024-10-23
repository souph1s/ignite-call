import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { useRouter } from "next/router";

export default function ConnectCalendar() {
    const session = useSession()
    const router = useRouter()

    const hasAuthError = !!router.query.error
    const isSignedIn = session.status === 'authenticated'

    async function handleConnectCalendar() {
        await signIn('google')
    }

    return (
        <Container>
            <Header>
                <Heading as='strong'>Connect your agenda!</Heading>
                <Text>Connect your calendar to automatically check busy hours and new events as they are scheduled.</Text>
                <MultiStep size={4} currentStep={2} />
            </Header>

            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
                    {isSignedIn ?
                        (
                            <Button size='sm' disabled>
                                Connected
                                <Check />
                            </Button>
                        ) : (
                            <Button variant='secondary' size='sm' onClick={handleConnectCalendar}>
                                Connect
                                <ArrowRight />
                            </Button>
                        )}
                </ConnectItem>

                {hasAuthError && (
                    <AuthError size='sm'>
                        Failed to connect to Google, please check if you have enabled access permissions for Google Calendar.
                    </AuthError>
                )}

                <Button type="submit" disabled={!isSignedIn}>
                    Next Step
                    <ArrowRight />
                </Button>
            </ConnectBox>
        </Container >
    )
}