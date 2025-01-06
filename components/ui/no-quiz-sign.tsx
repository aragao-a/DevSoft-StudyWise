import {View, Image, Text, StyleSheet} from 'react-native';

export default function NoQuizSign() {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('@assets/images/frown.png')}/>
            <Text style={styles.signText}>
                VOCÊ AINDA NÃO TEM QUIZZES
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:120,
    },
    img: {
        alignSelf:'center',
    },
    signText: {
        color: 'rgba(217, 217, 217, 1)', 
        fontFamily: 'VisbyRoundCF-Bold', 
        fontSize:12, 
        textAlign:'center',
    }
})