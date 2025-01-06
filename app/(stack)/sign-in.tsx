import { StyleSheet, View, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndexBackground from '@components/ui/index-background';
import LoginForm from '@/components/ui/login-form';
import Logo from '@/components/ui/logo';

export default function Signin() {
    return (
        <IndexBackground>
            <StatusBar backgroundColor='#0054C1'/>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                <Logo style={styles.logo} imageSize={0.125} imageVersion='1-1'/>
                <LoginForm/>
                </View>
            </SafeAreaView>
        </IndexBackground>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})