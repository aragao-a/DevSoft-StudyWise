import GeneralBackground from "@/components/ui/general-background";
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert} from "react-native";
import { SignUpField } from "@/components/ui/sign-up-field";
import { useRouter} from "expo-router";
import { useForm } from "react-hook-form";
import { useRef} from "react";


export default function Signup() { // Lógica de cadastro

    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter();
    const {control, handleSubmit, formState: { errors }} = useForm();

    const handleSignUp = async (data:{}) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
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
            console.log(responseData.message);
            router.back();
        } catch (error:unknown) {
            if(error instanceof Error) {
                Alert.alert("Erro", error.message);
            }
        }
    };

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);


    return (

        <GeneralBackground>

            <View style={styles.body}>

                {/* Tela de Cadastro */}
                <Text style={styles.baseText}> Cadastro</Text>
                

                <View style={styles.signUpForm}>

                    {/* Campo de Nome */}
                    <SignUpField

                        error={errors.username?.message?.toString()}
                        groupProps={{}}

                        formProps={{
                            name:'username', 
                            control,
                            rules: {
                                required: 'Nome é obrigatório',
                            }}} 
                        fieldDescription='Nome' 

                        inputProps={{
                            placeholder:"Digite seu nome completo",
                            onSubmitEditing: () => emailRef.current?.focus(),
                            submitBehavior: 'submit',
                        }}
                    />

                    {/* Campo de e-mail */}
                    <SignUpField

                        error={errors.email?.message?.toString()}
                        ref={emailRef}
                        groupProps={{}}

                        formProps={{
                            name:'email', 
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
                            onSubmitEditing: () => passwordRef.current?.focus(),
                            submitBehavior: 'submit',
                        }}
                    />

                    {/* Campo de senha */}
                    <SignUpField

                        error={errors.password?.message?.toString()}
                        ref={passwordRef}
                        groupProps={{}}

                        formProps={{
                            name:'password', 
                            control,
                            rules:{
                                required: 'Senha é obrigatória',
                                minLength: {
                                    value: 8,
                                    message: "senha deve conter pelo menos 8 cacacteres"
                                }
                            }}} 
                        fieldDescription='Senha' 

                        inputProps={{
                            secureTextEntry: true,
                            placeholder:"Digite uma senha de 8 dígitos",
                        }}
                    />

                    {/* Botão de Submit */}
                    <Pressable style={styles.signUpButton} onPress={handleSubmit(handleSignUp)}>

                        <Text style={styles.ButtonText}>
                            Cadastrar-se
                        </Text>
                        
                    </Pressable>
                </View>
            </View>
        </GeneralBackground>
    )
}

const styles = StyleSheet.create({
    body: {
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
        alignItems:'center',
        paddingBottom:50,
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