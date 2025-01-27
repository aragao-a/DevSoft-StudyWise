import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import React, { useState , useEffect} from "react";
import questionsData from "@/assets/questions/questionsData.json";
import HomeBackground from "@/components/ui/home-background";
import Rectangle4 from "@/assets/svg/rectangle-4";
import Rectangle3 from "@/assets/svg/rectangle-3";
import Rectangle2 from "@/assets/svg/rectangle-2";
import Rectangle1 from "@/assets/svg/rectangle-1";
import { addOption } from '@/assets/questions/quizStore'; // Importe a função
import{resetOptions} from '@/assets/questions/quizStore';
import { useRouter } from "expo-router";

const windoWidth = Dimensions.get("window").width;

const colorPalette = ["#FF4770", "#009A56", "#FF972C", "#51A5BF"];

const Questions = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        // Resetar as alternativas sempre que o componente for montado (início do quiz)
        resetOptions();
      }, []); 

    const formatNumber = (num: number) => {
        return num < 10 ? `0${num}` : num.toString();
    };

    const handleOptionPress = (option: string) => {
        const correctAnswer = questionsData[currentQuestionIndex].correctAnswer;
        setSelectedOption(option);
        setIsCorrect(option === correctAnswer);

        // Adiciona a alternativa ao "selectedOptions"
        addOption(option);

        setTimeout(() => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            console.log("Quiz finalizado!");
            // Aqui você pode enviar as alternativas para a próxima página ou fazer algo com elas
            console.log("Alternativas Selecionadas:", selectedOption);
            router.push('/results')


        }
        }, 1000);
    };

    const getColorForIndex = (baseIndex: number, offset: number) => {
        return colorPalette[(baseIndex + offset) % colorPalette.length];
    };

    const blocoColor = getColorForIndex(currentQuestionIndex, 0);
    const backgroundBloco1Color = getColorForIndex(currentQuestionIndex, 1);
    const backgroundBloco2Color = getColorForIndex(currentQuestionIndex, 2);
    const backgroundBloco3Color = getColorForIndex(currentQuestionIndex, 3);

return (
    <HomeBackground>
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
            <Text style={[styles.questionTitle, {color: blocoColor }]}>
                PERGUNTA {questionsData[currentQuestionIndex].id}
            </Text>
            <View style={{width:windoWidth * 0.9, maxWidth:400, aspectRatio:0.6}}>
            <Rectangle1 style={[styles.rectangle, {top:10, right:13}]} height="100%" width='100%' color={backgroundBloco3Color}/>
            <Rectangle3 style={[styles.rectangle, {top: 8, right:13}]} height="100%" width='100%' color={backgroundBloco2Color}/>
            <Rectangle2 style={[styles.rectangle, {top: 5, left:3}]} height="100%" width='100%' color={backgroundBloco1Color}/>
            <Rectangle4 style={[styles.rectangle, {top: 0}]} height='100%' width='100%' color={blocoColor}/>
            <View style={styles.questionContainer}>
                <View style={styles.questNum}>
                    <View style={styles.numTitle}>
                        <Text style={[styles.quizTitle, {color: blocoColor}]}>
                            Quiz {questionsData[currentQuestionIndex].id}
                        </Text>
                    </View>
                    <Text style={styles.rightCardHeader}>
                        {formatNumber(questionsData[currentQuestionIndex].id)}/
                        {formatNumber(questionsData.length)}
                    </Text>
                </View>
                <View style={styles.caixaPergunta}>
                    <View style={[styles.bolaNum, {backgroundColor : blocoColor}]}>
                        <Text style={styles.bolaNumTexto}>
                            {formatNumber(questionsData[currentQuestionIndex].id)}
                        </Text>
                    </View>
                    <Text style={styles.pergunta}>
                        {questionsData[currentQuestionIndex].question}
                    </Text>
                </View>
                <View style={{flex:1, gap:'8%', paddingTop:'12%'}}>
                    {questionsData[currentQuestionIndex].options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.alternativasSpace,
                                selectedOption === option && {
                                    backgroundColor: isCorrect
                                        ? "#4CAF50"
                                        : "#F44336",
                                },
                            ]}
                            onPress={() => handleOptionPress(option)}
                            disabled={selectedOption !== null}
                        >   
                            <Text style={{position:"absolute", left:'5%', fontFamily:'VisbyRoundCF-Bold'}}>
                                    {String.fromCharCode(index + 65)}
                            </Text>
                            <Text style={styles.alternativasText}>
                                {option}</Text>
                        </Pressable>
                    ))}
                </View>
                </View>
            </View>
        </View>
    </HomeBackground>
);
};

export default Questions;

// (Estilos permanecem os mesmos)
const styles = StyleSheet.create({
    backgroundBloco: {
        position: "absolute",
        marginTop: 160,
        marginLeft: 35,
        marginRight: 20,
        marginBottom: 100,
        height: 631,
        width: 340,
        borderRadius: 20,
        transform: [{ rotate: "-2deg" }],
    },
    backgroundBloco2: {
        position: "absolute",
        marginTop: 160,
        marginLeft: 35,
        marginRight: 20,
        marginBottom: 100,
        height: 631,
        width: 340,
        borderRadius: 20,
        transform: [{ rotate: "-1.5deg" }],
    },
    backgroundBloco3: {
        position: "absolute",
        marginTop: 160,
        marginLeft: 35,
        marginRight: 20,
        marginBottom: 100,
        height: 631,
        width: 340,
        borderRadius: 20,
        transform: [{ rotate: "2deg" }],
    },
    questionTitle: {
        fontSize: 15,
        color: "#FF4770",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
        letterSpacing:16,
        marginTop: 20,
    },
    bloco: {
        justifyContent: "center",
        position: "absolute",
        marginTop: 150,
        marginLeft: 35,
        marginRight: 20,
        marginBottom: 100,
        flex: 1,
        height: 631,
        width: 340,
        borderRadius: 20,
    },
    questionContainer: {
        flex:1,
        paddingHorizontal:'8%',
        paddingTop:'7%',
    },
    questNum: {
        paddingHorizontal:'2%',
        marginRight:'2%',
        justifyContent: "space-between",
        alignItems:'center',
        flexDirection: "row",
    },
    alternativasText: {
        fontFamily: "VisbyRoundCF-Regular",
        color: "#3C3C3C",
        fontSize: 16,
    },
    alternativasSpace: {
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        height:'14%',
        marginRight:'2%',
        width:'98%',
    },
    caixaPergunta: {
        alignSelf:'center',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height:'30%',
        width:'98%',
        marginRight:'2%',
        borderRadius: 10,
        marginTop: 30,
    },
    bolaNum: {
        flex: 1,
        borderRadius: 100,
        justifyContent: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: 10,
        left: 10,
    },
    bolaNumTexto: {
        fontSize: 19,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
    },
    pergunta: {
        marginHorizontal:'2%',
        fontSize: 16,
        color: "#3C3C3C",
        fontFamily: "VisbyRoundCF-Medium",
        textAlign: "center",
    },
    numTitle: {
        justifyContent:'center',
        alignItems:'center',
        height:35,
        backgroundColor: "white",
        borderRadius: 10,
        width:105
    },
    quizTitle: {
        fontFamily:'VisbyRoundCF-Bold',
        letterSpacing: 4,
        fontSize:16,
    },
    rightCardHeader: {
        fontSize: 18,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        letterSpacing: 4,
        borderRadius: 10,
        flexShrink: 1,
    },
    rectangle: {position: 'absolute'}
});