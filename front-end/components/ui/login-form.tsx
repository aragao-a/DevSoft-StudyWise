import {Text, View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import CustomInput from './custom-input';
import { useRouter } from 'expo-router';

const relativeSize = '90%';

export default function LoginForm() {

    //hook pra controle de navegação

    const router = useRouter();
    
    const handleSignInButtonPress = () => {
        router.push("./home-stage-1");
    }

    const handleSignUpTextPress = () => {
        router.push("./sign-up");
    }

    return(
        <View style={styles.container}>
            <View style={styles.descriptionArea}>
                <Text style={styles.baseText}>
                    Login
                </Text>
            </View>
            <View style={styles.inputArea}>
                <CustomInput style={styles.input}
                    inputDescription="E-mail"
                />
                <CustomInput style={styles.input}
                    inputDescription="Senha"
                />
            </View>
            <View style={styles.loginButtonArea}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.loginButton}
                    onPress= {handleSignInButtonPress}
                >
                    <Text style={styles.baseText}>
                        Entrar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUpTextPress}>
                    <Text style={styles.linkText}>
                    Cadastre-se
                    </Text>
                </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch', 
        justifyContent: 'flex-start', 
        height: '50%', 
        minHeight: 400,
    },
    descriptionArea: {
        marginBottom: 25,
    },
    baseText: {
        fontSize: 16,
        letterSpacing: 1,
        transform: [{scaleY: 1.1}], //faz aparecer a bolinha do "i" nessa fonte("VisbyRoundCF")
        fontFamily: 'VisbyRoundCF-DemiBold',
        color: '#ffffff',
        alignSelf: 'center',
    },
    linkText: {
        fontSize: 16,
        letterSpacing: 1,
        transform: [{scaleY: 1.1}], //faz aparecer a bolinha do "i" nessa fonte("VisbyRoundCF")
        fontFamily: 'VisbyRoundCF-DemiBold',
        color: '#ffffff',
        alignSelf: 'center',
        textDecorationLine:'underline',
    },
    loginButtonArea: {
        gap: 15,
    },
    loginButton: {
        alignSelf: 'center',
        height:60,
        width: relativeSize,
        maxWidth: 400,
        backgroundColor: '#0054C1',
        borderRadius: 20,
        justifyContent: 'center',
    },
    inputArea: {
        gap: 12, 
        marginBottom: 40,
    },
    input: {
        alignSelf: 'center',
        width: relativeSize,
        maxWidth: 400,
        height:60,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 15,
        borderColor: '#ddd', 
        borderWidth: 1, 
        fontSize: 16,
        fontFamily: 'VisbyRoundCF-Regular',
      },
})