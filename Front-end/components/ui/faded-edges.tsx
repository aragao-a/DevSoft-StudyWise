import { View, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FadedEdges() {
    return (
        <View style={styles.container}>
            <LinearGradient style={styles.edges} colors={['transparent', 'rgba(0, 0, 0, 0.2)']}/>
            <LinearGradient style={styles.edges} colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.5)']}/>
            <LinearGradient style={styles.edges} colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 1)']}/>
            <View style={{flex:1, backgroundColor:'black'}}/>
            <LinearGradient style={styles.edges} colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.5)']}/>
            <LinearGradient style={styles.edges} colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.2)']}/>
            <LinearGradient style={styles.edges} colors={['rgba(0, 0, 0, 0.2)', 'transparent']}/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'space-between'
    },
    edges: {
        height:15
    }
})