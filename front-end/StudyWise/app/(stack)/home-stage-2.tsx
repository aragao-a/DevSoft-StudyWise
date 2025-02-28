import HomeBackground from "@/components/ui/home-background";
import SearchBar from "@/components/ui/search-bar";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Pressable, TextInput, Keyboard, Alert, Dimensions} from "react-native";
import ProfileIcon from "@/assets/svg/profile-icon";
import { useForm } from "react-hook-form";
import GeminiLogo from "@/assets/svg/gemini-logo";
import React, { useState, useEffect, useRef } from "react";
import * as DocumentPicker from 'expo-document-picker';
import SelectedFile from "@/components/ui/selected-file";
import InputFileArea from "@/components/ui/input-file-area";
import ContainerIcon from "@/assets/svg/container-icon";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import CustomButton from "@/components/ui/custom-button";
import { getUserID } from "@/utils/authentication";
import { windowHeight, windowWidth } from "@/constants/dimensions";
export default function Home() {
    const [hasInput, setHasInput] = useState(false);
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const [textInput, setTextInput] = useState(""); // Estado para armazenar o texto digitado
    const router = useRouter();
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*'
            });

            if (!result.canceled) {
                const successResult = result as DocumentPicker.DocumentPickerSuccessResult;
                setSelectedFile(successResult.assets[0]);
            }
        } catch (error) {
            console.log('Error picking documents:', error);
            Alert.alert("Erro", "Não foi possível selecionar o arquivo. Tente novamente.");
        }
    };

    const handleAddButtonPress = () => {
        if (!hasInput) {
            pickFile();
        }
    };

    const handleGenerateQuiz = async () => {
        if (!textInput && !selectedFile) {
            Alert.alert("Erro", "Nenhum texto ou arquivo enviado.");
            return;
        }

        setIsLoading(true); // Inicia o carregamento

        let userID = Number(await getUserID());

        try {
            let response;
            if (textInput) {
                // Envia o texto para a rota /text-quiz
                response = await fetch(`${API_URL}/text-quiz`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: textInput, userId: userID }),
                });
            } else if (selectedFile) {
                // Envia o arquivo para a rota /upload (mantido para compatibilidade)
                const formData = new FormData();
                const file = {
                    uri: selectedFile.uri,
                    name: selectedFile.name,
                    type: selectedFile.mimeType || "application/octet-stream",
                };
                formData.append("file", file as any);
                formData.append("userId", userID.toString());
                response = await fetch(`${API_URL}/upload`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            if (!response) {
                throw new Error("Nenhuma resposta do servidor.");
            }

            const result = await response.json();
            console.log("Resposta do servidor:", result);

            if (response.ok) {
                router.replace('/questions'); // Navega para a tela de perguntas após sucesso
            } else {
                Alert.alert("Erro", result.message || "Erro ao gerar o quiz.");
            }
        } catch (error) {
            console.log("Erro na requisição:", error);
            Alert.alert("Erro", "Erro na conexão com o servidor. Tente novamente.");
        } finally {
            setIsLoading(false); // Finaliza o carregamento
        }
    };

    const handleProfileIconPress = () => {router.push('/profile')};
    const { control } = useForm();

    const [hasInputFocus, setHasInputFocus] = useState(false);
    const inputHeight = useSharedValue(40);
    const animatedStyleInput = useAnimatedStyle(() => {
        return {
            height: withTiming(inputHeight.value, { duration: 300 }),
        };
    });
    const handleInputFocus = () => {
        inputHeight.value = 100;
        setHasInputFocus(true);
    };
    const handleInputBlur = () => {
        inputHeight.value = 40;
        setHasInputFocus(false);
    };
    const handleTouchInput = () => {
        inputRef.current?.focus();
    };

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                inputRef.current?.blur();
            }
        );

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <HomeBackground>
            <View style={styles.container}>
                <View style={styles.group}>
                    <View style={styles.inputTextArea}>
                        <Text style={styles.baseText}>
                            Descreva seu quiz:
                        </Text>
                        <Pressable onPressIn={handleTouchInput}>
                            <SearchBar
                                ref={inputRef}
                                animatedStyle={animatedStyleInput}
                                layoutProps={{ children: <ContainerIcon /> }}
                                formProps={{ name: 'pesquisa', control }}
                                inputProps={{
                                    onChangeText: (text) => {
                                        setTextInput(text); // Atualiza o estado do texto
                                        if (text && !hasInput) {
                                            setHasInput(true);
                                        }
                                        else if (!text && hasInput) {
                                            setHasInput(false);
                                        }
                                    },
                                    onFocus: handleInputFocus,
                                    onBlur: handleInputBlur,
                                    readOnly: selectedFile ? true : false,
                                    multiline: true,
                                }} />
                        </Pressable>
                        {<View>
                            <Text style={styles.smallerText}>
                                Powered by:
                            </Text>
                            <GeminiLogo />
                        </View>}
                    </View>
                    <View style={{justifyContent:'center', minHeight:50}}>
                        <Text style={styles.baseText}>
                            Ou:
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.buttonsArea}>
                        <View style={styles.addFileArea}>
                            {selectedFile === null ?
                                (<InputFileArea handleAddButtonPress={handleAddButtonPress} hasInput={hasInput} />)
                                : <SelectedFile fileName={selectedFile.name} cancelFunction={setSelectedFile} />
                            }
                        </View>
                        <CustomButton
                            onPress={handleGenerateQuiz} // Chama a nova função
                            disabled={isLoading || (!hasInput && !selectedFile)} // Desabilita o botão durante o carregamento
                            style={(hasInput || selectedFile)
                                ? styles.createQuizButton : [styles.createQuizButton, { backgroundColor: 'rgba(0, 183, 201, 0.2)' }]}
                        >
                            <Text style={styles.ButtonText}>
                                {isLoading ? "Gerando Quiz..." : "Gerar Quiz!"}
                            </Text>
                        </CustomButton>
                    </View>
                    <Pressable onPress={handleProfileIconPress} >
                        <ProfileIcon style={styles.profileIcon} />
                    </Pressable>
                </View>
            </View>
        </HomeBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        minHeight:windowHeight - (0.25 * windowWidth),
        justifyContent:'flex-end',
    },
    group: {
        minHeight:windowWidth * 0.8,
        justifyContent: 'space-around'
    },
    baseText: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#0054C1',
        fontFamily: 'VisbyRoundCF-Bold',
    },
    smallerText: {
        alignSelf: 'center',
        fontSize: 11,
        fontFamily: 'Montserrat_600SemiBold',
    },
    inputTextArea: {
        justifyContent: 'center',
        gap: 15,
        alignItems: 'center',
    },
    addFileArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsArea: {
        flex: 1,
        gap: 10,
    },
    createQuizButton: {
        alignSelf: 'center',
        height: '18%',
        width: '40%',
        backgroundColor: 'rgba(0, 183, 201, 1)',
        borderRadius: 20,
        justifyContent: 'center',
    },
    ButtonText: {
        paddingRight: '5%',
        paddingLeft: '5%',
        alignSelf: 'center',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'VisbyRoundCF-Bold',
    },
    footer: {
        height: windowWidth*0.9,
        width:'100%',
        minHeight: 200,
        gap: 15,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    profileIcon: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
    },
});