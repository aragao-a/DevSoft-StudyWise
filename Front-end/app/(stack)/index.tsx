import { Pressable, StyleSheet, View, Text, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndexBackground from '@components/ui/index-background';
import Logo from '@/components/ui/logo';
import { useState, useEffect} from 'react';
import LoginForm from '@/components/ui/login-form';
import HandIcon from '@/assets/svg/hand-icon';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS} from 'react-native-reanimated';

export default function Index() {

    const firstComponentOpacity = useSharedValue(1);
    const secondComponentOpacity = useSharedValue(0);
    const [firstTouch, setFirstTouch] = useState(false);

    const handleScreenTouch = () => {
        firstComponentOpacity.value =  withTiming(0, { duration: 100 }, () => {runOnJS(setFirstTouch)(true), secondComponentOpacity.value = withTiming(1, { duration: 100 })});
    }

    const beforeTouchStyle = useAnimatedStyle(() => {
        return {
        opacity: firstComponentOpacity.value,
        };
    });

    const afterTouchStyle = useAnimatedStyle(() => {
        return {
        opacity: secondComponentOpacity.value,
        };
    });

    const opacity = useSharedValue(1);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            opacity.value = 0;
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            opacity.value = 1;
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    const animatedLogoStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, { duration: 200 }),
        };
    });
    if(!firstTouch) {
        return (
        
        <Pressable style={styles.container} onPress={handleScreenTouch}>

            {/* Tela de entrada do app antes do toque */}
            <IndexBackground>

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
        
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>

        {/* Tela de entrada do app após o toque*/}
        <IndexBackground>

            <Animated.View style={[styles.container, afterTouchStyle]}>

                <KeyboardAvoidingView behavior={(Platform.OS === 'android') ? undefined: 'padding'} style={styles.container}>

                    <View style={styles.container}>


                        {/* LOGO */}
                        <Animated.View style={[{flex:1}, animatedLogoStyle]}>
                            <Logo style={styles.logo} imageSize={0.14} imageVersion='1-1'/>
                        </Animated.View>

                        {/* Componente de input do Login/Cadastro */}
                        <LoginForm/>
                    </View>

                </KeyboardAvoidingView>
            </Animated.View>
        </IndexBackground>
        </Pressable>
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