import { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';
import { api } from '../services/api';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { Share } from 'react-native'
import { Guesses } from '../components/Guesses';

interface Participant {
    id: string;
    user: {
        name: string;
        avatarUrl: string;
    };
};

interface Poll {
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

interface RouteParams {
    id: string;
}

export function Details() {
    const [isLoading, setIsLoading] = useState(true)
    const [pollDetails, setPollDetails] = useState<Poll>({} as Poll)
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')

    const route = useRoute()
    const toast = useToast()

    const { id } = route.params as RouteParams

    async function fetchPollsDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/polls/${id}`)
            console.log(response.data.poll)
            setPollDetails(response.data.poll)


        } catch (error) {
            toast.show({
                title: 'There was a problem fetching poll data',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: pollDetails.code
        })
    }

    useEffect(() => {
        fetchPollsDetails()
    }, [id])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={pollDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />

            {
                pollDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PoolHeader data={pollDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option
                                title='Your guesses'
                                isSelected={optionSelected === 'guesses'}
                                onPress={() => setOptionSelected('guesses')}
                            />
                            <Option
                                title='Group Ranking'
                                isSelected={optionSelected === 'ranking'}
                                onPress={() => setOptionSelected('ranking')}
                            />

                            <Guesses poolId={pollDetails.id} />
                        </HStack>
                    </VStack>
                    :
                    <EmptyMyPoolList code={pollDetails.code} />
            }
        </VStack>
    )
}