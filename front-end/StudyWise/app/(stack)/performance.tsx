import GeneralBackground from "@/components/ui/general-background";
import { View, StyleSheet, Text, Alert, DimensionValue, Dimensions} from "react-native";
import { useEffect, useState} from "react";
import { getUserID } from "@/utils/authentication";
import { LabelStats } from "@/constants/label-stats-type";
import LabelButton from "@/components/ui/label-button";
import PerformanceGraph from "@/assets/svg/performance-graph";
import { windowWidth } from "@/constants/dimensions";

export default function Profile() {

    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const [labelStatsArray, setLabelStatsArray] = useState<({label:string} & LabelStats)[]>([])
    useEffect(
        () => {getUserID()
            .then(userID => fetch(`${API_URL}/label_summary/${Number(userID)}`))
            .then(response => response.json())
            .then(data => {
                setLabelStatsArray(data.labels)
                })
            .catch(error => {
                console.log("Erro carregando as estatísticas do usuário");
            });
        }
    , [])

    return (

        <GeneralBackground>

            {/* Gráfico e Título de desempenho */}
            <Text  style={styles.baseText}>
                SEU DESEMPENHO:
            </Text>
            <PerformanceGraph  width={windowWidth * 0.35} height={windowWidth * 0.35} style={{alignSelf:'center'}}/>

            {/* Lista de Lbels e taxas */}
            {labelStatsArray.map((stats, index) => {

                let quizCount = stats?.quizCount;
                let totalScoreNumber = stats?.totalScore;

                if(quizCount !== null && totalScoreNumber !== null){

                    let questionsCount = quizCount * 6;
                    let totalScoreString = stats?.totalScore?.toString().padStart(questionsCount.toString().length, '0')
                    let percentage:DimensionValue = `${Number(((totalScoreNumber/questionsCount) * 100).toFixed())}%`

                    return (

                        <View style={styles.labelContainer} key={index}>

                            {/* Label e taxas */}
                            <View style={{flexDirection:'row', gap:4, alignItems:'center'}}>

                                <LabelButton label={stats.label} color={stats.color}/>

                                {/* Taxa de acerto */}
                                <Text style={{fontFamily: 'VisbyRoundCF-Bold', fontSize:12}}>- {totalScoreString}/{questionsCount} Questões</Text>

                            </View>

                            {/* Barra e Porcentagem */}
                            <View style={{flexDirection:'row', alignItems:'center', gap:5}}>

                                <View style={{width:'80%', height:27, backgroundColor:'#d4d4d4', borderRadius:15, overflow:'hidden'}}>
                                    <View style={{height:'100%', width:percentage, backgroundColor:'#73bf43'}}></View>
                                </View>

                                {/* Porcentagem */}
                                <Text style={{fontFamily: 'VisbyRoundCF-Bold', fontSize:15}}>
                                    {percentage}
                                </Text>

                            </View>

                        </View>
                    )
                }

                quizCount = 0;
                totalScoreNumber = 0;

                return( 

                    <View style={styles.labelContainer} key={index}>

                        {/* Placeholder pra Labels sem Quizes feitos */}
                        <View style={{flexDirection:'row', gap:4, alignItems:'center'}}>
                            <LabelButton label={stats.label} color={stats.color}/>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                            <View style={{width:'90%', height:27, backgroundColor:'rgba(0, 0, 0, 0.17)', borderRadius:15, overflow:'hidden'}}/>
                        </View>

                        <Text style={{width:'90%', fontFamily: 'VisbyRoundCF-Bold', fontSize:12, flexWrap:'wrap', textAlign:'center'}}>
                            Realize quizzes deste assunto para obter seu desempenho.
                        </Text>
                        
                    </View>
                )
                })}
        </GeneralBackground>
    )
}

const styles = StyleSheet.create({
    baseText: {
        alignSelf:'center',
        marginVertical: 10,
        fontSize: 16,
        color: '#0054C1',
        fontFamily: 'VisbyRoundCF-Bold',
        letterSpacing: 8,
    },
    labelContainer: {
        alignItems:'flex-start',
        paddingVertical:25,
        gap:10,
        paddingHorizontal:'8%'
    }
})