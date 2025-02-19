import { View, StyleSheet, ScrollView, Text, Pressable} from "react-native"
import { Quiz } from "@/constants/quiz-small"
import { useRouter } from "expo-router"
import CustomButton from "./custom-button";
export default function QuizList({list, searchResult}: {list: Quiz[], searchResult:string}) {
    const router = useRouter();
    const handleButtonPress = (quizId: string) => {
        router.push({ pathname: 'questions', params: {quizId } });
    };
    const getLabelColor = (label: string) => {
        switch (label) {
            case 'História':
                return '#97482d'; 
            case 'Biologia':
                return '#009A56'; 
            case 'Física':
                return '#FF4770'; 
            case 'Química':
                return '#FF972C'; 
            default:
                return '#5A48ff'; // Default color
        }
    };
    const quizCount = list.length ;
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
                                Quiz {quizCount - index}:
                            </Text>

                            <Text style={{ fontFamily: 'Montserrat_400Regular' }}> {quiz.title}</Text>
                        </Text>
                            
                        <Text style={{ paddingLeft: 10 }}>

                            <Text style={styles.infoContainer}>• <View style={[styles.labelContainer, { backgroundColor: getLabelColor(quiz.label)}]}>

                                    <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 14, color: 'white'}}>{quiz.label}</Text>

                            </View> | </Text>

                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14}}>
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
    infoContainer: {
        
        flexDirection: 'row',
        alignItems: 'center', // Vertically align items
        justifyContent: 'center',
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        
    },
    container: {
        height:'90%', 
        width:'90%', 
        maxWidth:400,
        borderColor:'#0054C1', 
        alignSelf:'center', 
        borderWidth:0.7, 
        borderRadius:20
    },
    labelContainer: {
        transform: [{translateY: 7.5}], 
        borderRadius: 10, 
        paddingHorizontal: 12, 
        paddingVertical: 4, 
        
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
        paddingBottom: 12
    },
    ButtonText: {
        flexWrap: 'wrap',
        fontSize: 15,
        fontFamily: 'Montserrat_400Regular',
    },
})