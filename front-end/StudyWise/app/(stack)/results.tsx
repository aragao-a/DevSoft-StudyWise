import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { selectedOptions } from '@/assets/questions/quizStore'; // Importe a variável
import HomeBackground from "@/components/ui/home-background";
import questionsData from "@/assets/questions/questionsData.json";


const ResultsPage = () => {
    return (
        <HomeBackground>
            <View style={styles.container}>
                <Text>Alternativas Selecionadas:</Text>
                {selectedOptions.map((option, index) => (
                    <Text key={index}>{option}</Text>
                ))}
        </View>
        </HomeBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ResultsPage;