import { Row, Text, Pressable } from 'native-base';
import { Share } from 'react-native'

interface Props {
    code: string;
}

export function EmptyMyPoolList({ code }: Props) {

    async function handleCodeShare() {
        await Share.share({
            message: code
        })
    }

    return (
        <Row flexWrap="wrap" justifyContent="center" p={4}>
            <Text color="gray.200" fontSize="sm">
                This pool has no participants yet, how about
            </Text>

            <Pressable onPress={handleCodeShare}>
                <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
                    share the code
                </Text>
            </Pressable>

            <Text color="gray.200" fontSize="sm" mx={1}>
                of the pool with someone?
            </Text>

            <Text color="gray.200" mr={1}>
                Use the code
            </Text>

            <Text color="gray.200" fontSize="sm" textAlign="center" fontFamily="heading">
                {code}
            </Text>
        </Row>
    );
}