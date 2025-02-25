import { View, StyleSheet, ScrollView, Text, Pressable} from "react-native"
import { Quiz } from "@/constants/quiz-small"
import { useRouter } from "expo-router"
import CustomButton from "./custom-button";
export default function QuizList({list, searchResult}: {list: Quiz[], searchResult:string}) {
    
    return (
        <></>
    )
};

const styles = StyleSheet.create({
    infoContainer: {
        gap:4,
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
        flexWrap: 'wrap',
        fontSize: 15,
        fontFamily: 'Montserrat_400Regular',
    },
})