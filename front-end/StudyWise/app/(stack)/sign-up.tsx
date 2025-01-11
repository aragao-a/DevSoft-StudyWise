import HomeBackground from "@/components/ui/home-background";
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions} from "react-native";
import {SignUpField} from "@/components/ui/sign-up-field";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useRouter} from "expo-router";
import { useForm } from "react-hook-form";
import { useRef } from "react";


const windowHeight = Dimensions.get('window').height;


export default function Signup() {
    const router = useRouter();
    const {control, handleSubmit, formState: { errors }} = useForm();

    const handleSignUp = () => {
        router.replace('./home-stage-1');
    };

    const emailRef = useRef<TextInput>(null);
    const dateOfBirthRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <HomeBackground>
                <View style={styles.body}>
                    <Text style={styles.baseText}> Cadastro</Text>
                    <View style={styles.signUpForm}>
                        <SignUpField
                            error={errors.nomeCadastro?.message?.toString()}
                            groupProps={{}}
                            formProps={{
                                name:'nomeCadastro', 
                                control,
                                rules: {
                                    required: 'Nome é obrigatório',
                                }}} 
                            fieldDescription='Nome' 
                            inputProps={{
                                placeholder:"Digite seu nome completo",
                                onSubmitEditing: () => emailRef.current?.focus()
                            }}
                        />
                        <SignUpField
                            error={errors.emailCadastro?.message?.toString()}
                            ref={emailRef}
                            groupProps={{}}
                            formProps={{
                                name:'emailCadastro', 
                                control,
                                rules: {
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                        message: 'E-mail inválido'
                                    }
                                }}} 
                            fieldDescription='E-mail' 
                            inputProps={{
                                placeholder:"Digite seu E-mail",
                                onSubmitEditing: () => dateOfBirthRef.current?.focus()
                            }}
                        />
                        <SignUpField
                            error={errors.dataDeNascimentoCadastro?.message?.toString()}
                            ref={dateOfBirthRef}
                            groupProps={{}}
                            formProps={{
                                name:'dataDeNascimentoCadastro', 
                                control,
                                rules:{
                                    required: 'Data de nascimento é obrigatória',
                                    pattern: {
                                        value: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                                        message: 'Data de nascimento inválida'
                                    }
                                }}} 
                            fieldDescription='Data de Nascimento' 
                            inputProps={{
                                placeholder:"dd/mm/aa",
                                onSubmitEditing: () => passwordRef.current?.focus()
                            }}
                        />
                        <SignUpField
                            error={errors.senhaCadastro?.message?.toString()}
                            ref={passwordRef}
                            groupProps={{}}
                            formProps={{
                                name:'senhaCadastro', 
                                control,
                                rules:{
                                    required: 'Senha é obrigatória',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: 'Senha inválida'
                                    }
                                }}} 
                            fieldDescription='Senha' 
                            inputProps={{
                                secureTextEntry: true,
                                placeholder:"Digite uma senha de 8 dígitos",
                            }}
                        />
                        <Pressable style={styles.signUpButton} onPress={handleSubmit(handleSignUp)}>
                            <Text style={styles.ButtonText}>
                                Cadastrar-se
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </HomeBackground>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height:windowHeight, 
        backgroundColor: 'white',
    },
    body: {
        flex:1,
        alignItems: 'stretch',
    },
    baseText: {
        alignSelf:'center',
        marginTop: 10,
        fontSize: 18,
        color: '#0054C1',
        fontFamily: 'VisbyRoundCF-Bold',
        paddingRight: 15,
    },
    signUpForm: {
        flex:1,
        alignItems:'center',
        paddingBottom:100,
    },
    signUpButton: {
        marginTop: 50,
        height:48,
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#00B7C9',
        borderRadius: 20,
        justifyContent: 'center',
    },
    ButtonText: {
        alignSelf:'center',
        fontSize: 18,
        color: 'white',
        fontFamily: 'VisbyRoundCF-Bold',
    }
})