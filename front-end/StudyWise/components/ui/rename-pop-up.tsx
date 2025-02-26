import {View, Text, Modal, StatusBar, StyleSheet, ColorValue, ScrollView, Pressable} from 'react-native'
import { windowHeight, windowWidth} from '@/constants/dimensions'
import { useForm } from 'react-hook-form'
import CustomInput from './custom-input';
import { Quiz } from '@/constants/quiz-small';
import CustomButton from './custom-button';
import { getUserID } from '@/utils/authentication';
import labelStatsMap from '@/constants/labels-stats-map';
import customLabelColors from '@/constants/custom-label-colors';
import CorrectIcon2 from '@/assets/svg/correct-icon-2';
import { useState } from 'react';
import CloseIcon from '@/assets/svg/close-icon';
export default function RenamePopUP({quizForEditing, setQuizForEditing}:{quizForEditing:(Quiz|null), setQuizForEditing:React.Dispatch<React.SetStateAction<Quiz|null>>}) {
    const shouldEditColor = (quizForEditing?.label !== undefined) && labelStatsMap.get(quizForEditing.label)?.PrimaryLabelSet === "Miscelâneo";
    const [labelColorChosenIndex, setLabelColorCHosenIndex] = useState(0);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const { control, handleSubmit} = useForm();
    const handleCancelEditing = () => {setQuizForEditing(null)}
    const handleColorOptionPress = (colorOptionIndex:number) =>{
        setLabelColorCHosenIndex(colorOptionIndex)
    }
    const handleConfirmEditing = async (data:any) => {
        try {
            const userID = await getUserID();
            const response = await fetch(`${API_URL}/rename_label/${Number(userID)}/${Number(quizForEditing?.id)}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); 
            }
            if(quizForEditing?.label) {
                if(shouldEditColor)
                    labelStatsMap.set(data.newLabel, {...labelStatsMap.get(quizForEditing.label), color: customLabelColors[labelColorChosenIndex]})
                else 
                    labelStatsMap.set(data.newLabel, {...labelStatsMap.get(quizForEditing.label)})
            }
            setQuizForEditing(null);

        } catch (error:unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    const handleDeleteQuiz = async () => {
        try {
            const userID = await getUserID();
            const response = await fetch(`${API_URL}/delete_quiz/${Number(userID)}/${Number(quizForEditing?.id)}`, {
              method: 'Delete',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); 
            }
            setQuizForEditing(null);

        } catch (error:unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    return(
        quizForEditing && (<View style={{position:'absolute', height:windowHeight + (StatusBar.currentHeight || 0), width:windowWidth, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <Modal transparent={true} animationType="none" visible={quizForEditing ? true: false} onRequestClose={handleCancelEditing}>
                <ScrollView style={{flex:1}} contentContainerStyle={{minHeight:windowHeight, justifyContent:'center', alignItems:'center', gap:'5%'}}>
                    <View style={{backgroundColor:'#F2F7FF', width:'90%', borderRadius:20, alignItems:'center', gap:0, paddingBottom:20, paddingTop:10}}>
                        <Pressable style={{alignSelf:"flex-start", marginLeft:10}} onPress={handleCancelEditing}>
                            <CloseIcon/>
                        </Pressable>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Renomeie este Assunto:
                            </Text>
                        </View>
                        <CustomInput
                            inputProps={{
                                style:styles.input,
                                placeholder:`${quizForEditing.label} (assunto atual)`,
                                onSubmitEditing: handleSubmit(handleConfirmEditing),
                                returnKeyType:'next',
                                submitBehavior: 'submit'
                            }} 
                            formProps={{
                                name:'newLabel',
                                control,
                                rules: {
                                    required:true,
                                    maxLength:40,
                                    validate: {
                                        isNotPrimaryLabel: (v) => {return (labelStatsMap.get(v) === undefined || 
                                            (labelStatsMap.get(quizForEditing.label)?.PrimaryLabelSet) === labelStatsMap.get(v)?.PrimaryLabelSet)}
                                    }
                                }
                            }}
                        />
                        { shouldEditColor &&
                        <View style={{alignItems:'center', width:'100%', paddingHorizontal:20}}> 
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Cor do Assunto:
                                </Text>
                            </View>
                            <View style={{flexDirection:'row', gap:10, flexWrap:'wrap'}}>
                            {customLabelColors.map((color:ColorValue, index) => {return (
                                <CustomButton key={index} style={[styles.colorOption, {backgroundColor:color}]} onPress={() => {handleColorOptionPress(index)}}>
                                    {index === labelColorChosenIndex && <CorrectIcon2 style={styles.chosenIcon}/>}
                                </CustomButton>
                            )})}
                            </View>
                        </View>
                        }
                    </View>
                    <CustomButton style={styles.button} onPress={handleSubmit(handleConfirmEditing)}>
                        <Text style={styles.buttonText}>
                            Confirmar
                        </Text>
                    </CustomButton>
                    <CustomButton style={styles.deleteButton} onPress={handleDeleteQuiz}>
                        <Text style={styles.buttonText}>
                            Deletar Quiz
                        </Text>
                    </CustomButton>
                </ScrollView>
            </Modal>
        </View>)
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom:20,
        padding:15, 
        backgroundColor:'#0054C1', 
        borderRadius:10
    },
    deleteButton: {
        marginBottom:20,
        padding:15, 
        backgroundColor:'rgba(255, 71, 112, 1)', 
        borderRadius:10
    },
    input: {
        alignSelf: 'center',
        width: '85%',
        maxWidth: 400,
        height:45,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: '#0000005E', 
        borderWidth: 1, 
        fontSize: 16,
        fontFamily: 'VisbyRoundCF-Regular',
        marginBottom:40,
      },
    buttonText: {
        color:'white', 
        fontFamily:'VisbyRoundCF-Bold', 
        fontSize:16
    },
    colorOption: {
        borderRadius:5,
        width:20,
        height:20,
        backgroundColor:'white'
    },
    chosenIcon: {
        position: "absolute",
        bottom: -5,
        right: -5,
    },
})