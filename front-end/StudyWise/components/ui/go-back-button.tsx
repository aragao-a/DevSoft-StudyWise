import { Pressable, View} from "react-native"
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";
import ArrowBack from "@/assets/svg/arrow-back";

export default function GobackButton() {
    const router = useRouter();
    
    const pathName = usePathname();
    const handlePress = () => {
        router.back();
    }
    return (
        <View style={{aspectRatio:1}}>
            <Pressable onPress={handlePress}>
                <ArrowBack/>
            </Pressable>
        </View>
    )
}