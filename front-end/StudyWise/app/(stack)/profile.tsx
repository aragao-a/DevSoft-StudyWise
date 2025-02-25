import HomeBackground from "@/components/ui/home-background";
import { View, StyleSheet, Text, Alert, DimensionValue, Dimensions} from "react-native";
import { useEffect, useState} from "react";
import { getUserID } from "@/utils/authentication";
import labelStatsMap from "@/constants/labels-stats-map";
import { LabelStats } from "@/constants/label-stats-type";
import LabelButton from "@/components/ui/label-button";
import PerformanceIcon from "@/assets/svg/performance-icon";

const windowWidth = Dimensions.get('window').width;
export default function Profile() {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [statsMap, setStatsMap] = useState(new Map);
    useEffect(
        () => {getUserID()
            .then(userID => fetch(`${API_URL}/label_summary/${Number(userID)}`))
            .then(response => response.json())
            .then(data => {
                for(let labelData of data.labelSummary) {
                    const labelDataStats:LabelStats = labelData;
                    const previousLabelData = labelStatsMap.get(labelDataStats.label)
                    labelStatsMap.set(labelData.label, {...previousLabelData, quizCount: labelDataStats?.quizCount, totalScore: labelDataStats?.totalScore})
                }
                setStatsMap(labelStatsMap);
                })
            .catch(error => {
                Alert.alert("Erro", "não foi possível carregar suas estatísticas.");
            });
        }
    , [])
    return (
        <HomeBackground>
            <Text  style={styles.baseText}>
                SEU DESEMPENHO:
            </Text>
            <PerformanceIcon  width={windowWidth * 0.35} height={windowWidth * 0.35} style={{alignSelf:'center'}}/>
            {[...statsMap.keys()].map((key) => {
                let quizCount = statsMap.get(key)?.quizCount;
                let totalScoreNumber = statsMap.get(key)?.totalScore;
                if(quizCount !== undefined && totalScoreNumber !== undefined){
                    let questionsCount = quizCount * 6;
                    let totalScoreString = statsMap.get(key)?.totalScore?.toString().padStart(questionsCount.toString().length, '0')
                    let percentage:DimensionValue = `${Number(((totalScoreNumber/questionsCount) * 100).toFixed())}%`
                    return (
                        <View style={styles.labelContainer} key={key}>
                            <View style={{flexDirection:'row', gap:4, alignItems:'center'}}>
                                <LabelButton label={key}/>
                                <Text style={{fontFamily: 'VisbyRoundCF-Bold', fontSize:12}}>- {totalScoreString}/{questionsCount} Questões</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                                <View style={{width:'80%', height:27, backgroundColor:'#d4d4d4', borderRadius:15, overflow:'hidden'}}>
                                    <View style={{height:'100%', width:percentage, backgroundColor:'#73bf43'}}></View>
                                </View>
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
                    <View style={styles.labelContainer} key={key}>
                        <View style={{flexDirection:'row', gap:4, alignItems:'center'}}>
                            <LabelButton label={key}/>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                            <View style={{width:'80%', height:27, backgroundColor:'#7F7D7D', borderRadius:15, overflow:'hidden'}}/>
                            <Text style={{fontFamily: 'VisbyRoundCF-Bold', fontSize:15}}>
                                ??
                            </Text>
                        </View>
                        <Text style={{fontFamily: 'VisbyRoundCF-Bold', fontSize:12, flexWrap:'wrap', textAlign:'center'}}>
                            Realize quizzes dessa categoria para obter seu desempenho.
                        </Text>
                    </View>
                )
                })}
        </HomeBackground>
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