
import { ViewProps, View} from "react-native";


export default function RootBackground({children, ...rest}: ViewProps) {
    return (
        <View style={{flex:1, backgroundColor: 'white'}}>
            {children}
        </View>
    )
}