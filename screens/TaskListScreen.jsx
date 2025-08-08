import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function TaskListScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.buttonContainer}>
            <Button mode='contained' icon="backburger"
                onPress={() => navigation.goBack()}>
                Voltar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        padding: 5,
    }
})