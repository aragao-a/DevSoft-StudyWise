import { StyleSheet, View, ViewProps, StatusBar, Dimensions, ScrollView} from 'react-native';
import Logo from './logo';
import GobackButton from './go-back-button';
  

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function HomeBackground({children, ...rest}: ViewProps) {

    return (
        <ScrollView style={{height:windowHeight, backgroundColor:'white'}} keyboardShouldPersistTaps="handled">
        <View>
            <StatusBar backgroundColor='white'/>
            <View style={styles.header}>
                <GobackButton style={styles.goBackButton}/>
                <Logo style={styles.logo} imageSize={0.05} imageVersion="1-2"/>
            </View>
            {children}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        height: windowWidth * 0.25,
        alignItems:'center',
    },
    goBackButton: {
        position: 'absolute', 
        marginLeft: '7%',
    },
    logo: {
        flex:1,
        alignItems: 'center'
    }
})