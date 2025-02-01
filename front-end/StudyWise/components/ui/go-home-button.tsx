import { Pressable, View} from "react-native"
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";
import HomeIcon from "@/assets/svg/home";

export default function GobackButton() {
    const router = useRouter();
    
    const pathName = usePathname();
    const handlePress = () => {
        router.back();
    }
    return (
        <View style={{aspectRatio:1}}>
            <Pressable onPress={handlePress}>
                <HomeIcon/>
            </Pressable>
        </View>
    )
}
