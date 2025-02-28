import { View, StyleSheet, ScrollView, Text, Pressable, ColorValue} from "react-native"
import { Quiz } from "@/constants/quiz-small"
import { useRouter } from "expo-router"
import CustomButton from "./custom-button";
import LabelButton from "./label-button";
import EditIcon from "@/assets/svg/edit-icon";
import DeleteIcon from "@/assets/svg/delete-icon";
import { LabelStats } from "@/constants/label-stats-type";

export default function QuizList({list, labelStatsMap, searchResult, setQuizForEditing, setQuizForDeletion}: {
    list: Quiz[],
    labelStatsMap: Map<string, LabelStats>,
    searchResult:string, 
    setQuizForEditing:React.Dispatch<React.SetStateAction<Quiz|null>>,
    setQuizForDeletion:React.Dispatch<React.SetStateAction<Quiz|null>>}) {
    const router = useRouter();
    const handleButtonPress = (quizId: string) => {
        router.push({ pathname: 'questions', params: {quizId } });
    };
    const quizCount = list.length;
    const handleEditIconPress = (quiz:Quiz) => {
        setQuizForEditing(quiz);
    }
    const handleDeleteIconPress = (quiz:Quiz) => {
        setQuizForDeletion(quiz);
    }
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

                            <Text style={{ fontFamily: 'Montserrat_400Regular'}}> {quiz.title}</Text>
                        </Text>
                            
                        <View style={{ paddingHorizontal: 10, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', alignItems:'center', gap:4, flexWrap:'wrap'}}>
                            <View style={styles.infoContainer}> 
                                <Text>•</Text> 
                                <LabelButton label={quiz.label} color={labelStatsMap.get(quiz.label)?.color}/>
                                <Text>|</Text> 
                            </View>

                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 14, letterSpacing:1}}>
                                {new Date(quiz.date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit"
                                })}
                            </Text>
                            </View>
                        </View>
                        <View style={{alignSelf:'flex-end', position:'absolute', flexDirection:'row'}}>
                            <Pressable onPress={() => {handleEditIconPress(quiz)}} style={{paddingVertical:'20%', paddingHorizontal:'1%'}}>
                                <EditIcon/>
                            </Pressable>
                            <Pressable onPress={() => {handleDeleteIconPress(quiz)}} style={{paddingVertical:'20%', paddingHorizontal:'1%'}}>
                                <DeleteIcon/>
                            </Pressable>
                        </View>
                    </CustomButton>
                )
            })}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    infoContainer: {
        gap:6,
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
        justifyContent:'center',
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
        paddingBottom: 12,
        gap:5
    },
    ButtonText: {
        paddingRight:'10%',
        flexWrap: 'wrap',
        fontSize: 15,
        fontFamily: 'Montserrat_400Regular',
    },
})