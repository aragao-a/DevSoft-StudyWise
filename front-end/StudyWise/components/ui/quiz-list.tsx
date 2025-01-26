import { View, StyleSheet, ScrollView, Text} from "react-native"
import { Quiz } from "@/constants/quiz-type"
export default function QuizList({list, searchResult}: {list: Quiz[], searchResult:string}) {
    return (
        <ScrollView 
            bounces={false}
            overScrollMode="never" 
            style={styles.container}>
            <View style={styles.scrollableArea}>
            {list.map((quiz: Quiz, index) => {
                return (
                    (quiz.name.includes(searchResult) 
                        || quiz.field.includes(searchResult)) 
                    &&
                    <View key={index} style={styles.quizButton}>
                        <Text style={styles.ButtonText}>
                            <Text style={{fontFamily:'VisbyRoundCF-Bold'}}>
                                Quiz {index + 1}:
                            </Text> {quiz.name}
                        </Text>
                        <Text style={[styles.ButtonText, {paddingLeft:10}]}>
                        <Text style={{fontFamily:'VisbyRoundCF-Bold', fontSize:18}}>•</Text> {quiz.field}
                        </Text>
                    </View>
            )})}
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