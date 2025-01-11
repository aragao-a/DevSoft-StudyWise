import { Pressable, StyleSheet, View, Text, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import IndexBackground from '@components/ui/index-background';
import Logo from '@/components/ui/logo';
import { useState } from 'react';
import LoginForm from '@/components/ui/login-form';
import HandIcon from '@/assets/svg/hand-icon';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function App() {

    // hook pra controle de navegação
    const router = useRouter();

    const transition = useSharedValue(0);
    const [firstTouch, hasTouched] = useState(false);

    const handleScreenTouch = () => {
        transition.value =  withTiming(firstTouch ? 0 : 1, { duration: 200 });
        hasTouched(true);
    }

    const beforeTouchStyle = useAnimatedStyle(() => {
        return {
        opacity: 1 - transition.value,
        };
    });

    const afterTouchStyle = useAnimatedStyle(() => {
        return {
        opacity: transition.value,
        };
    });

    if(!firstTouch) {
        return (
        <Pressable style={styles.container} onPress={handleScreenTouch}>
            <IndexBackground>
                <StatusBar backgroundColor='#0054C1'/>
                <Animated.View style={[styles.container, beforeTouchStyle]}>
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
                </Animated.View>
            </IndexBackground>
        </Pressable>
    )
    }
    
    return (
        <IndexBackground>
            <StatusBar backgroundColor='#0054C1'/>
            <Animated.View style={[styles.container, afterTouchStyle]}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                    <Logo style={styles.logo} imageSize={0.14} imageVersion='1-1'/>
                    <LoginForm/>
                    </View>
                </SafeAreaView>
            </Animated.View>
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