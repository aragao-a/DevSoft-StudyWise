import { LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, ViewProps} from 'react-native';


export default function IndexBackground({children, ...rest}: ViewProps) {
    return (
        <LinearGradient style = {styles.container} colors = {['#0054C1', '#00B7C9']}>
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})