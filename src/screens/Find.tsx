import { Heading, VStack, Text } from "native-base";
import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Find by pool code" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Find a pool using{'\n'}
                    your unique code
                </Heading>

                <Input
                    mb={2}
                    placeholder="What is the pool code ?"
                />

                <Button
                    title="FIND THE POOL"
                />
            </VStack>
        </VStack>
    )
}