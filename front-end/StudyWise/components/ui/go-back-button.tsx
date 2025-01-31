import { Pressable, View, ViewProps} from "react-native"
import { useRouter } from "expo-router";
import ArrowBack from "@/assets/svg/arrow-back";

export default function GobackButton(props:ViewProps) {
    const router = useRouter();
    
    const handlePress = () => {
        router.back();
    }
    return (
        <View {...props}>
            <Pressable onPress={handlePress}>
                <ArrowBack/>
            </Pressable>
        </View>
    )
}