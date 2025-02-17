import { View, StyleSheet, ScrollView, Text, Pressable} from "react-native"
import { Quiz } from "@/constants/quiz-small"
import { useRouter } from "expo-router"
import CustomButton from "./custom-button";
export default function QuizList({list, searchResult}: {list: Quiz[], searchResult:string}) {
    const router = useRouter();
    const handleButtonPress = (quizId: string) => {
        router.push({ pathname: 'questions', params: {quizId } });
    };
    return (
        <ScrollView 
            nestedScrollEnabled={true}
            bounces={false}
            overScrollMode="never" 
            style={styles.container}>
            <View style={styles.scrollableArea}>
            {list.map((quiz: Quiz, index) => {
                return (
                    (quiz.title.toString().includes(searchResult) || quiz.label.toString().includes(searchResult)) &&
                    <CustomButton key={index} onPress={() => handleButtonPress(quiz.id)} style={styles.quizButton}>
                        <Text style={styles.ButtonText}>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold' }}>
                                Quiz {index + 1}:
                            </Text>
                            <Text style={{ fontFamily: 'Montserrat_400Regular' }}> {quiz.title}</Text>
                        </Text>
                        <Text style={[styles.ButtonText, { paddingLeft: 10 }]}>
                            <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 15 }}>• {quiz.label} | </Text>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 15 }}>
                                {new Date(quiz.date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                })}
                            </Text>
                        </Text>
                    </CustomButton>
                )
            })}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        height:'90%', 
        width:'90%', 
        maxWidth:400,
        borderColor:'#0054C1', 
        alignSelf:'center', 
        borderWidth:0.7, 
        borderRadius:20
    },
    scrollableArea: {
        gap:15, 
        paddingVertical:'5%'
    },
    quizButton: {
        alignSelf:'center',
        minHeight:55,
        width:'90%',
        backgroundColor: 'rgba(242, 247, 255, 1)',
        borderRadius: 20,
        paddingHorizontal:'4%',
        paddingVertical:7,
    },
    ButtonText: {
        flexWrap: 'wrap',
        fontSize: 15,
        fontFamily: 'Montserrat_400Regular',
    },
})