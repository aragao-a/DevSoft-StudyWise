import { TouchableWithoutFeedback, Image, View, StatusBar} from "react-native"
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";

export default function GobackButton() {
    const router = useRouter();
    
    const pathName = usePathname();
    const handlePress = () => {
        router.back();
    }
    return (
        <View style={{aspectRatio:1}}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <Image source={require('@assets/images/arrow_back.png')}/>
            </TouchableWithoutFeedback>
        </View>
    )
}