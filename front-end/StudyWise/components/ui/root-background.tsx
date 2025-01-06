import { colorMap } from "@/constants/color-map";
import IndexBackground from "./index-background";
import { ViewProps, View, ColorValue, Text} from "react-native";
import { useRef, useEffect
    
} from "react";
import { usePathname } from "expo-router";


type Props = ViewProps & {
    colors:colorMap
}

//Ele precisa trocar de cor depois da tela trocar de cor, mas não enquanto troca (a animação fica bugada assim)
export default function RootBackground({colors, children, ...rest}: Props) {
    const color = useRef('');
    const pathName = usePathname();
    const newColor = colors.get(pathName) || '';

    useEffect(() => {
        const temp = color.current
        color.current = newColor;
    }, [pathName])

    if(pathName === '/') {
        color.current = newColor;
    }
    if(color.current === 'white') {
        return (
        <View style={{flex:1, backgroundColor: 'white'}}>
            {children}
        </View>
        )
    }
    return (
        <IndexBackground>
            {children}
        </IndexBackground>
    )
}