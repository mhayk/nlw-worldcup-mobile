import { useState, useEffect } from 'react'
import { Box, FlatList, useToast } from 'native-base';
import { api } from '../services/api';
import { Game } from './Game';

interface Props {
    poolId: string;
}

export function Guesses({ poolId }: Props) {
    const [isLoading, setIsLoading] = useState(true)
    const [games, setGames] = useState([])
    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')

    const toast = useToast()

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

    return (
        <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Game
                    data={item}
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={() => { }}
                />
            )}
        />
    );
}
