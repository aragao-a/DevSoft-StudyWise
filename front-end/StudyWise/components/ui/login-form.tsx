import {Text, View, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import CustomInput from './custom-input';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import CustomButton from './custom-button';
import { storeUserID } from '@/utils/authentication';

const relativeSize = '90%';

export default function LoginForm() {

    const { control, handleSubmit} = useForm();

    const passwordRef = useRef<TextInput>(null);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    //hook pra controle de navegação
    const router = useRouter();
    
    const handleLogin = async (data:any) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); 
            }
        
            const responseData = await response.json();
            const userID = responseData.userResponse.id;

            storeUserID(userID)
            router.push("./home-stage-1");
        } catch (error:unknown) {
            if(error instanceof Error) {
                Alert.alert("Erro", error.message);
            }
        }
    };

    const handleSignUpTextPress = () => {
        router.push("./sign-up");
    };

    return(
        <View style={styles.container}>
            <View style={styles.descriptionArea}>
                <Text style={styles.baseText}>
                    Login
                </Text>
            </View>
            <View style={styles.inputArea}>
                <CustomInput
                    inputProps={{
                        style:styles.input,
                        placeholder:"E-mail",
                        onSubmitEditing: () => passwordRef.current?.focus(),
                        returnKeyType:'next',
                        submitBehavior: 'submit'
                    }} 
                    formProps={{
                        name:'email',
                        control,
                        rules: {
                            required:true,
                        }
                    }}
                />
                <CustomInput 
                    ref={passwordRef} 
                    inputProps={{
                        style:styles.input,
                        secureTextEntry: true,
                        placeholder:'Senha',
                        onSubmitEditing: handleSubmit(handleLogin),
                    }} 
                    formProps={{
                        name:'password',
                        control,
                        rules: {
                            required:true,
                        }
                    }}
                />
            </View>
            <View style={styles.loginButtonArea}>
                <CustomButton
                    style={styles.loginButton}
                    onPress= {handleSubmit(handleLogin)}
                >
                    <Text style={styles.baseText}>
                        Entrar
                    </Text>
                </CustomButton>
                <Pressable onPress={handleSignUpTextPress}>
                    <Text style={styles.linkText}>
                    Cadastre-se
                    </Text>
                </Pressable>
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