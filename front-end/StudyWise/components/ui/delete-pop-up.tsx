import {View, Text, Modal, StatusBar, StyleSheet, ColorValue, ScrollView, Pressable} from 'react-native'
import { windowHeight, windowWidth} from '@/constants/dimensions'
import { Quiz } from '@/constants/quiz-small';
import CustomButton from './custom-button';
import { getUserID } from '@/utils/authentication';
import CloseIcon from '@/assets/svg/close-icon';
export default function DeletePopUP({quizForDeletion, setQuizForDeletion}:{quizForDeletion:(Quiz|null), setQuizForDeletion:React.Dispatch<React.SetStateAction<Quiz|null>>}) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const handleCancelDeletion = () => {setQuizForDeletion(null)}
    const handleDeleteQuiz = async () => {
        try {
            const userID = await getUserID();
            const response = await fetch(`${API_URL}/delete_quiz/${Number(userID)}/${Number(quizForDeletion?.id)}`, {
              method: 'Delete',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); 
            }
            setQuizForDeletion(null);

        } catch (error:unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    return(
        quizForDeletion && (<View style={{position:'absolute', height:windowHeight + (StatusBar.currentHeight || 0), width:windowWidth, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <Modal transparent={true} animationType="none" visible={quizForDeletion ? true: false} onRequestClose={handleCancelDeletion}>
                <ScrollView style={{flex:1}} contentContainerStyle={{minHeight:windowHeight, justifyContent:'center', alignItems:'center', gap:'5%'}}>
                    <View style={{backgroundColor:'#F2F7FF', width:'90%', borderRadius:20, alignItems:'center', gap:0, paddingBottom:20, paddingTop:10}}>
                        <Pressable style={{alignSelf:"flex-start", marginLeft:10}} onPress={handleCancelDeletion}>
                            <CloseIcon/>
                        </Pressable>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Você deseja deletar o quiz "{quizForDeletion.title}"?
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', gap:'10%'}}>
                    <CustomButton style={styles.acceptButton} onPress={handleCancelDeletion}>
                        <Text style={styles.buttonText}>
                            Não
                        </Text>
                    </CustomButton>
                    <CustomButton style={styles.deleteButton} onPress={handleDeleteQuiz}>
                        <Text style={styles.buttonText}>
                            Sim
                        </Text>
                    </CustomButton>
                    </View>
                </ScrollView>
            </Modal>
        </View>)
    )
}

const styles = StyleSheet.create({
    button: {
        width:'60%',
        marginBottom:20,
        padding:15, 
        backgroundColor:'#0054C1', 
        borderRadius:10
    },
    deleteButton: {
        paddingHorizontal:35,
        marginBottom:20,
        padding:15, 
        backgroundColor:'rgba(255, 71, 112, 1)', 
        borderRadius:15
    },
    acceptButton: {
        paddingHorizontal:35,
        marginBottom:20,
        padding:15, 
        backgroundColor:'#009A56', 
        borderRadius:15
    },
    buttonText: {
        textAlign:'center',
        color:'white', 
        fontFamily:'VisbyRoundCF-Bold', 
        fontSize:16
    },
})