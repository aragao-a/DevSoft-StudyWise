import { StyleSheet, View, ViewProps, Dimensions, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from './logo';
import GobackButton from './go-back-button';
import { windowWidth, windowHeight } from '@/constants/dimensions';

export default function HomeBackground({children, ...rest}: ViewProps) {

    return (
        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
        <ScrollView style={{height:windowHeight, backgroundColor:'white'}} keyboardShouldPersistTaps="handled">
        <View>
            <View style={styles.header}>
                <GobackButton style={styles.goBackButton}/>
                <Logo style={styles.logo} imageSize={0.05} imageVersion="1-2"/>
            </View>
            <View style={styles.body}>
                {children}
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        height: windowWidth * 0.25,
        alignItems:'center',
    },
    body: {
        minHeight:windowHeight - (windowWidth * 0.25)
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