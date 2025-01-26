import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import questionsData from "@/assets/questions/questionsData.json";
import HomeBackground from "@/components/ui/home-background";

const colorPalette = ["#FF4770", "#FF972C", "#009A56", "#51A5BF"];

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(null);

    const formatNumber = (num: number) => {  //função para fomatar numeros abaixo de 10
        return num < 10 ? `0${num}` : num.toString();
    };

    const handleOptionPress = (option: string) => {
        const correctAnswer = questionsData[currentQuestionIndex].correctAnswer;
        setSelectedOption(option);
        setIsCorrect(option === correctAnswer);


        setTimeout(() => {
            if (currentQuestionIndex < questionsData.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                console.log("Quiz finalizado!");
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
            <View style={[styles.backgroundBloco, { backgroundColor: backgroundBloco1Color }]}></View>
            <View style={[styles.backgroundBloco2, { backgroundColor: backgroundBloco2Color }]}></View>
            <View style={[styles.backgroundBloco3, { backgroundColor: backgroundBloco3Color }]}></View>
            <View>
                <Text style={[styles.questionTitle, {color: blocoColor }]}>
                    PERGUNTA {questionsData[currentQuestionIndex].id}
                </Text>
            </View>
            <View style={[styles.bloco, { backgroundColor: blocoColor }]}>
                <View style={styles.questNum}>
                    <Text style={[styles.numTitle, {color: blocoColor}]}>
                        Quiz {questionsData[currentQuestionIndex].id}
                    </Text>
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
                {questionsData[currentQuestionIndex].options.map((option) => (
                    <Pressable
                        key={option}
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
                        <Text style={styles.alternativasText}>{option}</Text>
                    </Pressable>
                ))}
            </View>
        </HomeBackground>
    );
};

export default Questions;

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
        zIndex: -1,
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
        zIndex: -1,
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
        zIndex: -1,
        transform: [{ rotate: "2deg" }],
    },
    questionTitle: {
        fontSize: 15,
        color: "#FF4770",
        fontFamily: "VisbyRoundCF-Bold",
        letterSpacing: 16,
        textAlign: "center",
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
    questNum: {
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1,
        borderRadius: 10,
        position: "absolute",
        top: 25,
        left: 20,
    },
    alternativasText: {
        fontFamily: "VisbyRoundCF-Medium",
        color: "#3C3C3C",
        fontSize: 18,
        flexShrink: 1,
    },
    alternativasSpace: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        borderRadius: 10,
        padding: 8,
    },
    caixaPergunta: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 80,
        borderRadius: 10,
        marginTop: 30,
        marginEnd: 25,
        marginStart: 25,
        flexShrink: 1,
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
        fontSize: 18,
        color: "#3C3C3C",
        fontFamily: "VisbyRoundCF-Medium",
        letterSpacing: 5,
        textAlign: "center",
    },
    numTitle: {
        fontSize: 16,
        backgroundColor: "white",
        color: "#FF4770",
        fontFamily: "VisbyRoundCF-SemiBold",
        letterSpacing: 4,
        marginRight: 120,
        borderRadius: 10,
        padding: 8,
        paddingHorizontal: 18,
        flexShrink: 1,
    },
    rightCardHeader: {
        fontSize: 18,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        letterSpacing: 4,
        borderRadius: 10,
        flexShrink: 1,
    },
});
