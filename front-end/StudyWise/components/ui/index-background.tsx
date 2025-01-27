import { LinearGradient} from 'expo-linear-gradient';
import { StatusBar, StyleSheet, ViewProps} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function IndexBackground({children, ...rest}: ViewProps) {
    return (
        <SafeAreaView style={styles.container}>
                <LinearGradient style = {styles.container} colors = {['#0054C1', '#00B7C9']}>
                    <StatusBar backgroundColor={'#0054C1'}/>
                    {children}
                </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
})