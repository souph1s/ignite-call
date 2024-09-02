import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import previewImage from '../../assets/app-preview.png'

export default function Home() {
    return (
        <Container>
            <Hero>
                <Heading as="h1" size="4xl">
                    Simple Scheduling.
                </Heading>
                <Text size="lg">
                    Connect your calendar and allow people to schedule during your free time.
                </Text>
            </Hero>
            <Preview>
                <Image src={previewImage} alt='Calendar' height={400} quality={100} priority />
            </Preview>
        </Container>
    )
}
