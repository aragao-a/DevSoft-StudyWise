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

const windowWidth = Dimensions.get('window').width;
  
export default function Home() {
    const [hasInput, setHasInput] = useState(false);
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const router = useRouter();

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

    const handleSubmitFile = async () => {
        if (!selectedFile) {
            Alert.alert("Erro", "Nenhum arquivo selecionado.");
            return;
        }

        setIsLoading(true); // Inicia o carregamento

        try {
            const formData = new FormData();
            const file = {
                uri: selectedFile.uri,
                name: selectedFile.name,
                type: selectedFile.mimeType || "application/octet-stream",
            };

            formData.append("file", file as any); // 'as any' resolve erro de tipagem no TS

            const response = await fetch("http://{ip}:5000/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const result = await response.json();
            console.log("Resposta do servidor:", result);

            if (response.ok) {
                router.push('/questions'); // Navega para a tela de perguntas após sucesso
            } else {
                Alert.alert("Erro", result.message || "Erro ao enviar arquivo.");
            }
        } catch (error) {
            console.log("Erro na requisição:", error);
            Alert.alert("Erro", "Erro na conexão com o servidor. Tente novamente.");
        } finally {
            setIsLoading(false); // Finaliza o carregamento
        }
    };

    const handleProfileIconPress = () => { };
    const { control } = useForm();

    const [hasInputFocus, setHasInputFocus] = useState(false);
    const inputHeight = useSharedValue(40);
    const logoOpacity = useSharedValue(1);
    const animatedStyleInput = useAnimatedStyle(() => {
        return {
            height: withTiming(inputHeight.value, { duration: 300 }),
        };
    });
    const animatedStyleGeminiLogo = useAnimatedStyle(() => {
        return {
            opacity: withTiming(logoOpacity.value, { duration: 300 }),
        };
    });
    const handleInputFocus = () => {
        setHasInputFocus(true);
        inputHeight.value = 100;
        logoOpacity.value = 0;
    };
    const handleInputBlur = () => {
        inputHeight.value = 40;
        logoOpacity.value = 1;
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
                        <Animated.View style={[{ flex: 1 }, animatedStyleGeminiLogo]}>
                            <Text style={styles.smallerText}>
                                Powered by:
                            </Text>
                            <GeminiLogo />
                        </Animated.View>
                    </View>
                    <Text style={styles.baseText}>
                        Ou:
                    </Text>
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
                            onPress={handleSubmitFile}
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
        height: windowWidth * 1.75,
        minHeight:600,
        justifyContent:'space-between',
    },
    group: {
        flex: 1,
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
        minHeight: 100,
        height: '50%',
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
        height: '50%',
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