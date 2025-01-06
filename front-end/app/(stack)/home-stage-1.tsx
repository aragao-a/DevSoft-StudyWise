import HomeBackground from "@/components/ui/home-background";
import SearchBar from "@/components/ui/search-bar";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable} from "react-native";
import NoQuizSign from "@/components/ui/no-quiz-sign";

export default function Home() {
    const router = useRouter();
    const handleButtonPress = () => {router.push('/home-stage-2')}
    const handleProfileIconPress = () => {router.push('/profile')}
    return (
        <HomeBackground>
            <SearchBar/>
            <View style={styles.container}>
                <Text style={styles.baseText}>
                    SEUS QUIZZES:
                </Text>
                <NoQuizSign/>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.buttonArea} onPress= {handleButtonPress}>
                    <View
                        style={styles.createQuizButton}
                    >
                        <Text style={styles.ButtonText}>
                            Novo Quiz!
                        </Text>
                    </View>
                    <Image source={require('@assets/images/plus.png')}/>
                </Pressable>
                <Pressable onPress= {handleProfileIconPress} >
                    <Image style={styles.profileIcon} source={require('@assets/images/profile-icon.png')}/>
                </Pressable>
            </View>
        </HomeBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center',
        gap:30,
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
        gap:10},
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
        height:'25%', 
        alignItems:'stretch', 
        justifyContent:'space-around'
    },
    profileIcon:{
        alignSelf:'flex-end', 
        marginRight:20, 
        marginBottom:10
    },
})