import { Pressable, StyleSheet, View, Text, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import IndexBackground from '@components/ui/index-background';
import Logo from '@/components/ui/logo';
import { useState } from 'react';
import LoginForm from '@/components/ui/login-form';
import HandIcon from '@/assets/svg/hand-icon';

export default function App() {

    // hook pra controle de navegação
    const router = useRouter();

    const handleScreenTouch = () => hasTouched(true);
    const [firstTouch, hasTouched] = useState(false);
    
    if(!firstTouch) {
        return (
        <Pressable style={styles.container} onPress={handleScreenTouch}>
            <IndexBackground>
            <StatusBar backgroundColor='#0054C1'/>
            <SafeAreaView style={styles.container}>
                    <View style={styles.group}>
                        <View style={styles.logo}>
                            <Logo style={styles.logo}imageSize={0.14} imageVersion='1-1'/>
                        </View>
                        <View style = {styles.touchInstuction}> 
                            <HandIcon/>
                            <Text style= {styles.baseText}> 
                                TOQUE NA TELA
                            </Text>
                        </View>
                    </View>
            </SafeAreaView>
            </IndexBackground>
        </Pressable>
    )
    }
    
    return (
        <IndexBackground>
                    <StatusBar backgroundColor='#0054C1'/>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.container}>
                        <Logo style={styles.logo} imageSize={0.14} imageVersion='1-1'/>
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
    group: {
        height:'85%',
    },
    logo: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchInstuction: {
        height: '10%',
        alignItems: "center",
        gap: 10,
    },
    baseText: {
        fontSize: 10,
        letterSpacing: 8,
        fontWeight: '100',
        fontFamily: 'VisbyRoundCF-Regular',
        color: '#ffffff',
    }
})