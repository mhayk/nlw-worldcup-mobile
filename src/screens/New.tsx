import { Heading, VStack, Text, useToast } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { api } from "../services/api";

export function New() {
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    async function handlePollCreate() {
        if (!title.trim()) {
            // Alert.alert('New Poll', 'Enter a poll name!')
            return toast.show({
                title: 'Enter a valid poll name, please!',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setIsLoading(true)

            await api.post('/polls', { title })

            toast.show({
                title: 'Poll has been created successfully!',
                placement: 'top',
                bgColor: 'green.500'
            })

            setTitle('')
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'It was not possible to create a new poll',
                placement: 'top',
                bgColor: 'red.500'
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Create a new pool" />

            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Create your own cup poll and{'\n'}
                    share it with friends!
                </Heading>

                <Input
                    mb={2}
                    placeholder="What is the name of your poll ?"
                    onChangeText={setTitle}
                    value={title}
                />

                <Button
                    title="CREATE MY POLL"
                    onPress={handlePollCreate}
                    isLoading={isLoading}
                />

                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    After creating your pool, you will receive a unique
                    code that you can use to invite other people.
                </Text>
            </VStack>
        </VStack>
    )
}