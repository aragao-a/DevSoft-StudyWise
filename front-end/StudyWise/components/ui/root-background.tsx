
import { ViewProps, View, StatusBar} from "react-native";


export default function RootBackground({children, ...rest}: ViewProps) {
    return (
        <View style={{flex:1, backgroundColor: 'white'}}>
            {children}
            <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
        </View>
    )
}