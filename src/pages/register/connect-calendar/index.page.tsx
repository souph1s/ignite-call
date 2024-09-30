import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { ConnectBox, ConnectItem } from "./styles";

export default function Register() {

    async function handleRegister() {

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
                    <Button variant='secondary' size='sm'>Connect <ArrowRight />
                    </Button>

                </ConnectItem>
                <Button type="submit" >
                    Next Step
                    <ArrowRight />
                </Button>
            </ConnectBox>
        </Container>
    )
}