import HomeBackground from "@/components/ui/home-background";
import SearchBar from "@/components/ui/search-bar";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Pressable, Alert} from "react-native";
import NoQuizSign from "@/components/ui/no-quiz-sign";
import ProfileIcon from "@/assets/svg/profile-icon";
import PlusIcon from "@/assets/svg/plus-icon";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { Quiz } from "@/constants/quiz-small";
import QuizList from "@/components/ui/quiz-list";
import SearchIcon from "@/assets/svg/search-icon";
import CustomButton from "@/components/ui/custom-button";
import { getUserID } from "@/utils/authentication";
import { useFocusEffect } from "expo-router";
import { windowWidth } from "@/constants/dimensions";
import RenamePopUP from "@/components/ui/rename-pop-up";
import DeletePopUP from "@/components/ui/delete-pop-up";
import { LabelStats } from "@/constants/label-stats-type";

export default function Home() {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [searchResult, setSearchResult] = useState('')
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [labelStatsMap, setLabelStatsMap] = useState<Map<string,LabelStats>>(new Map)
    const router = useRouter();
    const handleButtonPress = () => {router.push('/home-stage-2')};
    const handleProfileIconPress = () => {router.push('/profile')};
    const {control} = useForm();
    const [quizForEditing, setQuizForEditing] = useState<Quiz|null>(null);
    const [quizForDeletion, setQuizForDeletion] = useState<Quiz|null>(null);

    useFocusEffect(
        useCallback(() => {
            getUserID()
                .then(userID => Promise.all([
                    fetch(`${API_URL}/small-history/${Number(userID)}`), 
                    fetch(`${API_URL}/label_summary/${Number(userID)}`)
                ]))
                .then(responses => Promise.all([
                    responses[0].json(),
                    responses[1].json()
                ]))
                .then(data => {
                    setQuizzes(data[0].quizzes);
                    setLabelStatsMap(new Map(data[1].labels.map((stats:({label:string} & LabelStats)) => {
                        const {label, ...otherStats} = stats;
                        return [label, otherStats];
                    })))
                })
                .catch(error => {
                    Alert.alert(error.message);
                });
            }, [quizForEditing, quizForDeletion])
    );

    return (
        <>
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
            <View style={quizzes.length === 0 ?styles.quizContainer: [styles.quizContainer, {justifyContent: 'flex-start'}]}>
                <Text  style={styles.baseText}>
                    SEUS QUIZZES:
                </Text>
                {(quizzes.length === 0 &&
                <NoQuizSign/>) || (<QuizList list={quizzes} labelStatsMap={labelStatsMap} searchResult={searchResult} setQuizForEditing={setQuizForEditing} setQuizForDeletion={setQuizForDeletion}/>)}
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
                    <View style={styles.profileIcon}>
                        <Pressable onPress= {handleProfileIconPress} >
                            <ProfileIcon/>
                        </Pressable>
                    </View>
            </View>
        </HomeBackground>
        <RenamePopUP quizForEditing={quizForEditing} setQuizForEditing={setQuizForEditing} labelStatsMap={labelStatsMap}></RenamePopUP>
        <DeletePopUP quizForDeletion={quizForDeletion} setQuizForDeletion={setQuizForDeletion} labelStatsMap={labelStatsMap}></DeletePopUP>
        </>
    )
}

const styles = StyleSheet.create({
    quizContainer: {
        height:windowWidth, 
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
        justifyContent:'flex-end',
        paddingTop:'5%'
    },
    profileIcon:{
        alignSelf:'flex-end', 
        marginRight:20, 
        marginBottom:10
    },
})