import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useSharedValue, withTiming, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import HomeBackground from "@/components/ui/home-background";
import Rectangle4 from "@/assets/svg/rectangle-4";
import Rectangle3 from "@/assets/svg/rectangle-3";
import Rectangle2 from "@/assets/svg/rectangle-2";
import Rectangle1 from "@/assets/svg/rectangle-1";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "expo-router";

const windoWidth = Dimensions.get("window").width;

const colorPalette = ["#FF4770", "#009A56", "#FF972C", "#51A5BF"];

export default function Questions() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState<number>(-1);
    const [questionsData, setQuestionsData] = useState<any[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://192.168.10.62:5000/questions.json")
            .then(response => response.json())
            .then(data => {
                setQuestionsData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching questions data:", error);
                setLoading(false);
            });
    }, []);

    const formatNumber = (num: number) => {
        return num < 10 ? `0${num}` : num.toString();
    };

    const progress1 = useSharedValue(0);
    const progress2 = useSharedValue(0);
    const progress3 = useSharedValue(0);
    const progress4 = useSharedValue(0);

    const animatedStyle1 = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(interpolateColor(progress1.value,
                [0, 1],
                ['white', (correctAnswer === 0) ? 'rgba(115, 191, 67, 1)' : 'rgba(239, 62, 54, 1)']
            ), { duration: 100 })
        }
    });
    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(interpolateColor(progress2.value,
                [0, 1],
                ['white', (correctAnswer === 1) ? 'rgba(115, 191, 67, 1)' : 'rgba(239, 62, 54, 1)']
            ), { duration: 100 })
        }
    });
    const animatedStyle3 = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(interpolateColor(progress3.value,
                [0, 1],
                ['white', (correctAnswer === 2) ? 'rgba(115, 191, 67, 1)' : 'rgba(239, 62, 54, 1)']
            ), { duration: 100 })
        }
    });
    const animatedStyle4 = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(interpolateColor(progress4.value,
                [0, 1],
                ['white', (correctAnswer === 3) ? 'rgba(115, 191, 67, 1)' : 'rgba(239, 62, 54, 1)']
            ), { duration: 100 })
        }
    });
    const animatedStyles = [animatedStyle1, animatedStyle2, animatedStyle3, animatedStyle4];
    const progresses = [progress1, progress2, progress3, progress4];

    const handleOptionPress = (index: number) => {
        const correctAnswer = questionsData[currentQuestionIndex].correct_answer;
        setCorrectAnswer(correctAnswer);
        progresses[index].value = 1;
        progresses[correctAnswer].value = 1;
        setSelectedAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers, index];

            setTimeout(() => {
                if (currentQuestionIndex < questionsData.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    progresses[index].value = 0;
                    progresses[correctAnswer].value = 0;
                    setCorrectAnswer(-1);
                } else {
                    router.push({
                        pathname: "/results",
                        params: {
                            answers: JSON.stringify(updatedAnswers),
                            correctAnswers: JSON.stringify(questionsData.map(q => q.correct_answer)),
                            validations: JSON.stringify(questionsData.map(q => q.validation))
                        }
                    });
                }
            }, 1000);

            return updatedAnswers;
        });
    };

    const getColorForIndex = (baseIndex: number, offset: number) => {
        return colorPalette[(baseIndex + offset) % colorPalette.length];
    };

    const blocoColor = getColorForIndex(currentQuestionIndex, 0);
    const backgroundBloco1Color = getColorForIndex(currentQuestionIndex, 1);
    const backgroundBloco2Color = getColorForIndex(currentQuestionIndex, 2);
    const backgroundBloco3Color = getColorForIndex(currentQuestionIndex, 3);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!questionsData.length) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No questions available.</Text>
            </View>
        );
    }

    const currentQuestion = questionsData[currentQuestionIndex];

    return (
        <HomeBackground>
            <Text style={[styles.questionTitle, { color: blocoColor }]}>
                PERGUNTA {currentQuestion.id}
            </Text>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                <View style={{ width: windoWidth * 0.9, maxWidth: 400, aspectRatio: 0.6 }}>
                    <Rectangle1 style={[styles.rectangle, { top: 10, right: 13 }]} height="100%" width='100%' color={backgroundBloco3Color} />
                    <Rectangle3 style={[styles.rectangle, { top: 8, right: 13 }]} height="100%" width='100%' color={backgroundBloco2Color} />
                    <Rectangle2 style={[styles.rectangle, { top: 5, left: 3 }]} height="100%" width='100%' color={backgroundBloco1Color} />
                    <Rectangle4 style={[styles.rectangle, { top: 0 }]} height='100%' width='100%' color={blocoColor} />
                    <View style={styles.questionContainer}>
                        <View style={styles.questNum}>
                            <View style={styles.numTitle}>
                                <Text style={[styles.quizTitle, { color: blocoColor }]}>
                                    Quiz {currentQuestion.id}
                                </Text>
                            </View>
                            <Text style={styles.rightCardHeader}>
                                {formatNumber(currentQuestion.id)}/
                                {formatNumber(questionsData.length)}
                            </Text>
                        </View>
                        <View style={styles.caixaPergunta}>
                            <View style={[styles.bolaNum, { backgroundColor: blocoColor }]}>
                                <Text style={styles.bolaNumTexto}>
                                    {formatNumber(currentQuestion.id)}
                                </Text>
                            </View>
                            <Text style={styles.pergunta}>
                                {currentQuestion.question}
                            </Text>
                        </View>
                        <View style={{ flex: 1, gap: '8%', paddingTop: '12%' }}>
                            {currentQuestion.options.map((option: string, index: number) => (
                                <CustomButton
                                    key={index}
                                    style={[
                                        styles.alternativasSpace, animatedStyles[index]
                                    ]}
                                    onPress={() => handleOptionPress(index)}
                                >
                                    <Text style={{ position: "absolute", left: '3%', top: '18%', fontFamily: 'VisbyRoundCF-Bold' }}>
                                        {String.fromCharCode(index + 65)})
                                    </Text>
                                    <Text style={styles.alternativasText}>
                                        {option}
                                    </Text>
                                </CustomButton>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </HomeBackground>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        letterSpacing: 16,
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
        flex: 1,
        paddingHorizontal: '8%',
        paddingTop: '7%',
    },
    questNum: {
        paddingHorizontal: '2%',
        marginRight: '2%',
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "row",
    },
    alternativasText: {
        textAlign: 'center',
        fontFamily: "VisbyRoundCF-Medium",
        color: "#3C3C3C",
        fontSize: 16,
        marginRight: '2%',
        padding: 8,
        paddingRight: 25,
        paddingLeft: 25
    },
    alternativasSpace: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: 'auto',
        width: '98%',
        marginRight: '2%',
        borderRadius: 10,
        paddingTop: 4,
        paddingBottom: 4
    },
    caixaPergunta: {
        alignSelf: 'center',
        padding: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: '30%',
        width: '98%',
        marginRight: '2%',
        borderRadius: 10,
        marginTop: 30,
    },
    pergunta: {
        fontSize: 16,
        color: "#3C3C3C",
        fontFamily: "VisbyRoundCF-Medium",
        textAlign: "center",
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
    numTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        backgroundColor: "white",
        borderRadius: 10,
        width: 105
    },
    quizTitle: {
        fontFamily: 'VisbyRoundCF-Bold',
        letterSpacing: 4,
        fontSize: 16,
    },
    rightCardHeader: {
        fontSize: 18,
        color: "white",
        fontFamily: "VisbyRoundCF-Bold",
        letterSpacing: 4,
        borderRadius: 10,
        flexShrink: 1,
    },
    rectangle: { position: 'absolute' }
});