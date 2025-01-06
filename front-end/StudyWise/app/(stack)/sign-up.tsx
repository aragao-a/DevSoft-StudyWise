import HomeBackground from "@/components/ui/home-background";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import React from "react";
import SignUpField from "@/components/ui/sign-up-field";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useRouter} from "expo-router";


const windowHeight = Dimensions.get('window').height;


export default function Signup() {
    const router = useRouter();
    const handlePress = () => {router.replace('./home-stage-1')};
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <HomeBackground>
                <View style={styles.body}>
                    <Text style={styles.baseText}> Cadastro</Text>
                    <View style={styles.signUpForm}>
                        <SignUpField fieldDescription='Nome' inputDescription="Digite seu nome completo"/>
                        <SignUpField fieldDescription='E-mail' inputDescription="Digite seu E-mail"/>
                        <SignUpField fieldDescription='Data de Nascimento' inputDescription="dd/mm/aa"/>
                        <SignUpField fieldDescription='Senha' inputDescription="Digite uma senha de 8 dígitos"/>
                        <TouchableOpacity style={styles.signUpButton} onPress={handlePress}>
                            <Text style={styles.ButtonText}>
                                Cadastrar-se
                            </Text>
                        </TouchableOpacity>
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