import {View, Text, Modal, StatusBar, StyleSheet, ColorValue, ScrollView, Pressable} from 'react-native'
import { windowHeight, windowWidth} from '@/constants/dimensions'
import { useForm } from 'react-hook-form'
import CustomInput from './custom-input';
import { Quiz } from '@/constants/quiz-small';
import CustomButton from './custom-button';
import { getUserID } from '@/utils/authentication';
import customLabelColors from '@/constants/custom-label-colors';
import CorrectIcon2 from '@/assets/svg/correct-icon-2';
import { useState, useEffect } from 'react';
import CloseIcon from '@/assets/svg/close-icon';
import { LabelStats } from '@/constants/label-stats-type';

export default function RenamePopUP({quizForEditing, setQuizForEditing, labelStatsMap}:{
    quizForEditing:(Quiz|null), 
    setQuizForEditing:React.Dispatch<React.SetStateAction<Quiz|null>>
    labelStatsMap: Map<string, LabelStats>,
    }) {
    const shouldEditColor = (quizForEditing?.label !== undefined) && labelStatsMap.get(quizForEditing.label)?.primaryLabelSet === "Miscelâneo";
    const [labelColorChosenIndex, setLabelColorCHosenIndex] = useState(0);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const { control, handleSubmit, formState:{isSubmitSuccessful}, reset} = useForm();
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
                throw new Error(`Erro gerando renomeando o assunto. Erro: ${errorData.message}`); 
            }
            const oldLabel = quizForEditing?.label;
            const newLabel = data.newLabel;
            if(oldLabel) {
                const primaryLabelSet = labelStatsMap.get(quizForEditing.label)?.primaryLabelSet || "Miscelâneo"
                if(labelStatsMap.has(newLabel)){
                    if(shouldEditColor) {
                        const color = customLabelColors[labelColorChosenIndex];
                        const updateLabelResponse = await fetch(`${API_URL}/update_label/${Number(userID)}/${oldLabel}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                newLabel:newLabel, 
                                color:color, 
                                primaryLabelSet:primaryLabelSet
                            }),
                          });
                        if (!updateLabelResponse.ok) {
                            const errorData = await updateLabelResponse.json();
                            throw new Error(`Erro ao editar o assunto. Erro: ${errorData.message}`); 
                        }
                    }
                }
                else {
                    let color:ColorValue = '#5A48ff';
                    if(shouldEditColor) {
                        color = customLabelColors[labelColorChosenIndex];
                    }
                    else {
                        const primaryLabel = labelStatsMap.get(quizForEditing.label)?.primaryLabelSet || "Miscelâneo";
                        color = labelStatsMap.get(primaryLabel)?.color || color
                    }
                    const createLabelResponse = await fetch(`${API_URL}/create_label`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({userId:userID, label:newLabel, color:color, primaryLabelSet:primaryLabelSet}),
                    });
                    if (!createLabelResponse.ok) {
                        const errorData = await createLabelResponse.json();
                        throw new Error(`Erro ao editar o assunto. Erro: ${errorData.message}`); 
                    }
                }
            }
            setQuizForEditing(null);

        } catch (error:unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    useEffect(() => {
        reset();
      }, [isSubmitSuccessful])
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
                                            (labelStatsMap.get(quizForEditing.label)?.primaryLabelSet) === labelStatsMap.get(v)?.primaryLabelSet)}
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