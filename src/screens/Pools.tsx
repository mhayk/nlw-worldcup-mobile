import { useEffect, useState } from 'react'
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard } from '../components/PoolCard';
import { Loading } from '../components/Loading';

import { api } from "../services/api";
import { EmptyPollList } from '../components/EmptyPollList';

interface Participant {
    id: string;
    user: {
        name: string;
        avatarUrl: string;
    };
};

interface Pool {
    id: string;
    code: string;
    title: string;
    ownerId: string;
    createdAt: string;
    owner: {
        name: string;
    },
    participants: Participant[];
    _count: {
        participants: number;
    }
}

export function Pools() {
    const [isLoading, setIsLoading] = useState(true)
    const [polls, setPolls] = useState<Pool[]>([])

    const toast = useToast()
    const { navigate } = useNavigation()

    async function fetchPools() {
        try {
            setIsLoading(true)
            const response = await api.get('/polls')
            setPolls(response.data.polls)
        } catch (error) {
            console.log(error)
            toast.show({
                title: 'I could not load the polls',
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPools()
    }, [])

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="My Pools" />
            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                borderBottomColor="gray.600"
                pb={4}
                mb={4}
            >
                <Button
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    title="FIND POOL BY CODE"
                    onPress={() => navigate('find')}
                />

            </VStack>

            {isLoading ? <Loading /> :
                <FlatList
                    data={polls}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <PoolCard data={item} />}
                    ListEmptyComponent={() => <EmptyPollList />}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    px={5}
                />}
        </VStack>
    )
}