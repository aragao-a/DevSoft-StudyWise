import {View, Text, Modal, StatusBar, StyleSheet} from 'react-native'
import { windowHeight, windowWidth} from '@/constants/dimensions'
import { useForm } from 'react-hook-form'
import CustomInput from './custom-input';
import { Quiz } from '@/constants/quiz-small';
import CustomButton from './custom-button';
import { getUserID } from '@/utils/authentication';
import labelStatsMap from '@/constants/labels-stats-map';
import primaryLabels from '@/constants/primary-labels';
export default function RenamePopUP({quizForEditing, setQuizForEditing, shouldEditColor}:{quizForEditing:(Quiz|null), shouldEditColor:boolean, setQuizForEditing:React.Dispatch<React.SetStateAction<Quiz|null>>}) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const { control, handleSubmit} = useForm();
    const handleConfirmEditing = async (data:any) => {
        labelStatsMap.set(data.newLabel, {color: labelStatsMap.get(quizForEditing?.label || '')?.color})
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
            setQuizForEditing(null);

        } catch (error:unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    return(
        quizForEditing && (<View style={{position:'absolute', height:windowHeight + (StatusBar.currentHeight || 0), width:windowWidth, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <Modal transparent={true} animationType="slide" visible={quizForEditing ? true: false} onRequestClose={() => {setQuizForEditing(null)}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', gap:'10%'}}>
                    <View style={{backgroundColor:'#F2F7FF', width:'90%', borderRadius:20, alignItems:'center', gap:20, paddingVertical:30}}>
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
                                    validate: {
                                        isNotPrimaryLabel: (v) => {return !primaryLabels.includes(v)}
                                    }
                                }
                            }}
                        />
                        { shouldEditColor && 
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Cor do Assunto:
                            </Text>
                        </View>
                        }
                    </View>
                    <CustomButton style={styles.button} onPress={handleSubmit(handleConfirmEditing)}>
                        <Text style={styles.buttonText}>
                            Confirmar
                        </Text>
                    </CustomButton>
                </View>
            </Modal>
        </View>)
    )
}

const styles = StyleSheet.create({
    button: {
        padding:15, 
        backgroundColor:'#0054C1', 
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
      },
    buttonText: {
        color:'white', 
        fontFamily:'VisbyRoundCF-Bold', 
        fontSize:16
    },
})