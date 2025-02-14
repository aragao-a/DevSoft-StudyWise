import { StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import { useSharedValue, withTiming, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import HomeBackground from "@/components/ui/home-background";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "expo-router";
import { getUserID } from "@/utils/authentication";

const windowHeight = Dimensions.get("window").height;

const colorPalette = ["#FF4770", "#009A56", "#FF972C", "#51A5BF"];

export default function Questions() {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState<number>(-1);
    const [questionsData, setQuestionsData] = useState<any[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [alreadySelected, setAlreadySelected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserID()
            .then(userID => fetch(`${API_URL}/questions.json/${Number(userID)}`))
            .then(response => response.json())
            .then(data => {
                // Acessa apenas quiz_data do primeiro quiz
                const quizData = data.quizzes[0]?.quiz_data || [];
                setQuestionsData(quizData);
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
        if(!alreadySelected) {
            const correctAnswer = questionsData[currentQuestionIndex].correct_answer;
            setCorrectAnswer(correctAnswer);
            progresses[index].value = 1;
            progresses[correctAnswer].value = 1;
            setAlreadySelected(true);
            setSelectedAnswers(prevAnswers => {
                const updatedAnswers = [...prevAnswers, index];

                setTimeout(() => {
                    if (currentQuestionIndex < questionsData.length - 1) {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        progresses[index].value = 0;
                        progresses[correctAnswer].value = 0;
                        setCorrectAnswer(-1);
                        setAlreadySelected(false);
                    } else {
                        router.replace({
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
        }
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

const currentQuestion = questionsData[currentQuestionIndex];
  
    if (!questionsData.length) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No questions available.</Text>
            </View>
        );
    }
  
    return (
        <HomeBackground>
            <Text style={[styles.questionTitle, { color: blocoColor }]}>
                PERGUNTA {currentQuestion.id}
            </Text>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginVertical:20}}>
            <View style={{width:'85%', overflow:'visible', maxWidth:600}}>
                <View style={{backgroundColor:backgroundBloco3Color, borderRadius:20, height:'100%', width:'100%', position:'absolute', top:10, left:-7,  transform:[{rotate:'-1deg'}]}}/>
                    <View style={{backgroundColor:backgroundBloco2Color, borderRadius:20, height:'100%', width:'100%', position:'absolute', top:3, left:-4,  transform:[{rotate:'-1.7deg'}]}}/>
                    <View style={{backgroundColor:backgroundBloco1Color, borderRadius:20, height:'100%', width:'100%', position:'absolute', top:3, right:-5,  transform:[{rotate:'1deg'}]}}/>
                    <View style={{backgroundColor:blocoColor, borderRadius:20, paddingVertical:5}}>
                        <View style={[styles.questionContainer]}>
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
                                <View style={{gap: 20, marginTop:35}}>
                                {currentQuestion.options.map((option: string, index: number) => (
                                    <CustomButton
                                        key={index}
                                        style={[
                                            styles.alternativasSpace, animatedStyles[index]
                                        ]}
                                        onPress={() => handleOptionPress(index)}>   
                                        <View style={{paddingLeft: '5%'}}>
                                            <Text style={{fontFamily: 'VisbyRoundCF-Bold'}}>
                                                {String.fromCharCode(index + 65)})
                                            </Text>
                                        </View>
                                        <View style={{flex:1}}>
                                        <Text style={styles.alternativasText}>
                                            {option}
                                        </Text>
                                        </View>
                                    </CustomButton>
                                ))}
                            </View>
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
    questionTitle: {
        fontSize: 15,
        color: "#FF4770",
        fontFamily: "VisbyRoundCF-Bold",
        textAlign: "center",
        letterSpacing: 16,
    },
    questionContainer: {
        paddingVertical:30,
        paddingHorizontal: '6%',
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
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        width: '98%',
        marginRight: '2%',
        borderRadius: 10,
    },
    caixaPergunta: {
        alignSelf: 'center',
        paddingVertical:60,
        paddingHorizontal:25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: '98%',
        marginRight: '2%',
        borderRadius: 10,
        marginTop: 20,
    },
    pergunta: {
        fontSize: 16,
        color: "#3C3C3C",
        fontFamily: "VisbyRoundCF-Medium",
        textAlign: "center",
    },
    bolaNum: {
        borderRadius: 100,
        justifyContent: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: 10,
        left: 10,
        zIndex:1
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
rectangle: { position: 'absolute'}
});