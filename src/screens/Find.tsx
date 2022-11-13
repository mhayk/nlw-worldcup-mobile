import { useState } from 'react'
import { Heading, useToast, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const toast = useToast()

    const { navigate } = useNavigation()

    async function handleJoinPoll() {
        try {
            setIsLoading(true)

            if (!code.trim()) {
                return toast.show({
                    title: 'Please, fill the code field.',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/polls/join', { code })
            toast.show({
                title: 'Welcome ! You are in the poll now !',
                placement: 'top',
                bgColor: 'green.500'
            })
            setCode('')
            navigate('polls')

        } catch (error) {
            console.log(error)
            setIsLoading(false)

            if (error.response?.data?.message === 'Poll not found.') {
                return toast.show({
                    title: 'Poll not found.',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            if (error.response?.data?.message === 'You already joined this poll.') {
                return toast.show({
                    title: 'You already joined this poll.',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: 'Poll not found.',
                placement: 'top',
                bgColor: 'red.500'
            })

        }
    }

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
                    autoCapitalize='characters'
                    onChangeText={setCode}
                    value={code}
                />

                <Button
                    title="FIND THE POOL"
                    isLoading={isLoading}
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}