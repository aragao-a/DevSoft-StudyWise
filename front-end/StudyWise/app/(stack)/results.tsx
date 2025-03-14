import { StyleSheet, View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ResultsBackground from "@/components/ui/results-background";
import Correct from "@/assets/svg/Correct";
import Wrong from "@/assets/svg/Wrong";

const colorPalette = ["#FF4770", "#009A56", "#FF972C", "#51A5BF"];

export default function Results() {
    const { answers, correctAnswers , validations} = useLocalSearchParams();
    const selectedAnswers = typeof answers === "string" ? JSON.parse(answers) : [];
    const correctAnswersArray = typeof correctAnswers === "string" ? JSON.parse(correctAnswers) : [];
    const validationsArray = typeof validations === "string" ? JSON.parse(validations) : [];

    const formatNumber = (num: number) => {
        return num < 10 ? `0${num}` : num.toString();
    };

    return (

        <ResultsBackground>

            {/* Título do Resultado do Quiz */}
            <View style={styles.QuizTitle} >
                <Text style={styles.resultText}>DESEMPENHO</Text>
                <Text style={styles.quizNumberText}>Quiz 1</Text>
            </View>

            {/* Map que categoriza as questões */}
            <View>

                {selectedAnswers.map((answer: number, index: number) => {

                    const isCorrect = answer === correctAnswersArray[index];
                    const boxColor = colorPalette[index % colorPalette.length]; // Alterna cores
                    const ballColor = colorPalette[index % colorPalette.length]; // Cor da bola
                    const correctAnswer = correctAnswersArray[index];
                    const iconSource = isCorrect 
                        ? Correct
                        : Wrong

                    return (
                        
                        <View // Caixa de Correto/Errado por questão

                            key={index} 
                            style={[styles.questionContainer, { backgroundColor: boxColor }]}>
                            
                            <View style= {styles.questionHeader}>

                                {/* Número da questão */}
                                <View style={[styles.ballNum]}> 
                                    <Text style={[styles.ballNumText, { color: ballColor }]}>{formatNumber(index + 1)}</Text>
                                </View>

                                {/* Espaço da alternativa correta */}
                                <Text style={styles.questionText}>Alternativa correta: {String.fromCharCode(65 + correctAnswer)}</Text>

                            </View>
                        
                            {/* Trecho de texto de Validação/Explicação */} 
                            <View style= {styles.validationBox}>

                                <Text style={styles.validationText}>
                                    {validationsArray[index]}
                                </Text>

                            </View>
                            
                            {/* Ícone de Certo/Errado */}
                            {isCorrect ? <Correct style={styles.icon} /> : <Wrong style={styles.icon} />}
                            
                        </View>
                    );
                })}
            </View>
        </ResultsBackground>
    );
}

const styles = StyleSheet.create({
    QuizTitle:{
      marginTop:12,
    },
    ballNum:{
        marginRight: 15,
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: "center",
        width: 40,
        height: 40,
    },

    resultText: {
        fontSize: 15,
        color: "#0054C1",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
        letterSpacing: 16,
    },
    quizNumberText: {
        fontSize: 16,
        color: "#0054C1",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
        letterSpacing: 5,
        marginTop: 10,
    },
    questionContainer: {
        justifyContent: "space-between",
        paddingHorizontal: '5%',
        marginVertical: 15,
        marginHorizontal: 35,
        borderRadius: 20,
    
    },
    questionHeader:{
        marginVertical:20,
        alignItems: "center",
        flexDirection: "row",
    },
    questionText: {
        fontSize: 15,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
    },
    ballNumText:{
        fontSize: 19,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
    },

    validationBox:{
        marginBottom:40,
    },
    validationText:{
        fontSize: 15,
        color: "white",
        fontFamily: "VisbyRoundCF-Regular",
        textAlign: "center"
    },
    icon: {
        position: "absolute",
        bottom: -25,
        right: -25,
    },
});