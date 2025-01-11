import { StyleSheet, View, ViewProps, StatusBar, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from './logo';
import GobackButton from './go-back-button';

const windowHeight = Dimensions.get("window").height;

export default function HomeBackground({children, ...rest}: ViewProps) {
    return (
        <SafeAreaView style = {{height:windowHeight, backgroundColor:'white'}}>
            <StatusBar backgroundColor='white'/>
            <View style={styles.header}>
                <View style={styles.headerSides}>
                    <GobackButton/>
                </View>
                <View style={styles.container}>
                <Logo style={styles.logo} imageSize={0.05} imageVersion="1-2"/>
                </View>
                <View style={styles.headerSides}>
                </View>
            </View>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: '10%',
        justifyContent: "space-around", 
        alignItems:'flex-end', 
        flexDirection:'row'
    },
    headerSides: {
        height:'100%', 
        width: '22%', 
        alignItems:'center', 
        justifyContent: 'flex-end',
        paddingBottom: '1%',
    },
    logo: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})