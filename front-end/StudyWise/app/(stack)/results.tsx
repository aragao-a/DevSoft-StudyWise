import { StyleSheet, View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ResultsBackground from "@/components/ui/results-background";

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
            <View >
                <Text style={styles.resultText}>DESEMPENHO</Text>
                <Text style={styles.quizNumberText}>Quiz 1</Text>
            </View>

            <View>
                {selectedAnswers.map((answer: number, index: number) => {
                    const isCorrect = answer === correctAnswersArray[index];
                    const boxColor = colorPalette[index % colorPalette.length]; // Alterna cores
                    const ballColor = colorPalette[index % colorPalette.length]; // Cor da bola
                    const iconSource = isCorrect 
                        ? require("@/assets/images/Correct.png")
                        : require("@/assets/images/Wrong.png");

                    return (
                        <View 
                            key={index} 
                            style={[styles.questionContainer, { backgroundColor: boxColor }]}>
                            
                            <View style= {styles.questionHeader}>
                                <View style={[styles.ballNum]}> 
                                    <Text style={[styles.ballNumText, { color: ballColor }]}>{formatNumber(index + 1)}</Text>
                                </View>
                                <Text style={styles.questionText}>Alternativa correta: {String.fromCharCode(65 + answer)}</Text>
                            </View>
                        
                            
                            
                            
                            <Text style={styles.validationText}>
                                Explicação: {validationsArray[index]}
                            </Text>
                            <Image source={iconSource} style={styles.icon} />
                        </View>
                    );
                })}
            </View>
        </ResultsBackground>
    );
}

const styles = StyleSheet.create({
    ballNum:{
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
        justifyContent: "space-around",
        paddingHorizontal:'2%',
        padding: 80,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 20,
    
    },

    questionHeader:{
        justifyContent: "space-between",
        flexDirection: "row",
    },
    questionText: {
        fontSize: 16,
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
    validationText:{
        fontSize: 16,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center"
    },
    icon: {
        width: 60,
        height: 60, 
        position: "absolute",
        bottom: -25,
        right: -25,
    },
});
