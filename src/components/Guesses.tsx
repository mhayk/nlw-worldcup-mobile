import { useState, useEffect } from 'react'
import { FlatList, useToast } from 'native-base';
import { api } from '../services/api';
import { Game } from './Game';
import { Loading } from './Loading';

interface Props {
    poolId: string;
}

export function Guesses({ poolId }: Props) {
    const [isLoading, setIsLoading] = useState(true)
    const [games, setGames] = useState([])
    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')

    const toast = useToast()

    async function handleGuessConfirm(gameId: string) {
        try {
            if (!firstTeamPoints.trim() || !(secondTeamPoints.trim())) {
                return toast.show({
                    title: 'Fill you guess correctly',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post(`/polls/${poolId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints)
            })

            toast.show({
                title: 'Guess sent successfully',
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (err) {
            console.log(err.message)

            toast.show({
                title: 'It was not possible to send your guess',
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function fetchGames() {
        try {
            setIsLoading(true)

            const response = await api.get(`/polls/${poolId}/games`)
            setGames(response.data.games)

        } catch (error) {
            console.log(error)

            toast.show({
                title: 'There was a problem fetching games data',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGames()
    }, [poolId])

    if (isLoading) {
        return <Loading />
    }

    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Game
                    data={item}
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={() => handleGuessConfirm(item.id)}
                />
            )}
            _contentContainerStyle={{ pb: 10 }}
        />
    );
}
