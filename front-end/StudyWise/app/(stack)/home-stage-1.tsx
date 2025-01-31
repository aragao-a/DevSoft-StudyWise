import HomeBackground from "@/components/ui/home-background";
import SearchBar from "@/components/ui/search-bar";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Pressable, Dimensions} from "react-native";
import NoQuizSign from "@/components/ui/no-quiz-sign";
import ProfileIcon from "@/assets/svg/profile-icon";
import PlusIcon from "@/assets/svg/plus-icon";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Quiz } from "@/constants/quiz-type";
import QuizList from "@/components/ui/quiz-list";
import SearchIcon from "@/assets/svg/search-icon";
import CustomButton from "@/components/ui/custom-button";

const windowWidth = Dimensions.get('window').width;

export default function Home() {
    const [searchResult, setSearchResult] = useState('')
    const [quizzes, setQuizzes] = useState<Quiz[]>([{id: '1', grade:1, field:'Biologia', name:'Platelmintos e Nematelmintos'}, {id: '1', grade:1, field:'asdeem', name:'Plat'}, {id: '1', grade:1, field:'Biol', name:'Pl'}, {id: '1', grade:1, field:'a', name:'B'}, {id: '1', grade:1, field:'a', name:'b'}])
    const router = useRouter();
    const handleButtonPress = () => {router.push('/home-stage-2')};
    const handleProfileIconPress = () => {router.push('/profile')};
    const {control} = useForm();
    return (
        <HomeBackground>
            <View style={{marginTop: 35}}>
                <SearchBar 
                    animatedStyle={{height:40}}
                    layoutProps={{children:<SearchIcon/>}} 
                    formProps={{name: 'pesquisa', control}} 
                    inputProps={{
                        onChangeText: (text) => {setSearchResult(text)},readOnly: quizzes.length === 0 ? true: false
                    }}
                />
            </View>
            <View style={quizzes.length === 0 ?styles.container: [styles.container, {justifyContent: 'flex-start'}]}>
                <Text  style={styles.baseText}>
                    SEUS QUIZZES:
                </Text>
                {(quizzes.length === 0 &&
                <NoQuizSign/>) || (<QuizList list={quizzes} searchResult={searchResult}/>)}
            </View>
            <View style={styles.footer}>
                <CustomButton style={styles.buttonArea} onPress= {handleButtonPress}>
                    <View style={styles.createQuizButton}>
                        <Text style={styles.ButtonText}>
                            Novo Quiz!
                        </Text>
                    </View>
                    <PlusIcon/>
                </CustomButton>
                <Pressable onPress= {handleProfileIconPress} >
                    <ProfileIcon style={styles.profileIcon}/>
                </Pressable>
            </View>
        </HomeBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        height:windowWidth * 1, 
        justifyContent: 'center',
        gap:'5%',
        backgroundColor: 'white',
        alignItems:'center'
    },
    baseText: {
        alignSelf:'center',
        marginTop: 40,
        fontSize: 16,
        color: '#0054C1',
        fontFamily: 'VisbyRoundCF-Bold',
        letterSpacing: 8,
    },
    buttonArea: {
        alignItems:'center', 
        gap:10
    },
    createQuizButton: {
        height:60,
        width: '80%',
        maxWidth: 200,
        backgroundColor: 'rgba(255, 71, 112, 1)',
        borderRadius: 20,
        justifyContent: 'center',
    },
    ButtonText: {
        alignSelf:'center',
        fontSize: 18,
        color: 'white',
        fontFamily: 'VisbyRoundCF-Bold',
    },
    footer: {
        height: windowWidth * 0.5, 
        alignItems:'stretch', 
        justifyContent:'space-around',
        paddingTop:'5%'
    },
    profileIcon:{
        alignSelf:'flex-end', 
        marginRight:20, 
        marginBottom:10
    },
})