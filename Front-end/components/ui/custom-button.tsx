import Animated, { useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";
import { Pressable, PressableProps} from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export default function CustomButton(pressableProps:PressableProps) {
    const opacity = useSharedValue(1)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, { duration: 100 }), 
        };
    });
    const handlePressIn = () => {opacity.value = 0.7}
    const handlePressOut = () => {opacity.value = 1}
    return (
        <AnimatedPressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...pressableProps} style={[pressableProps.style, animatedStyle]}/>
    )
}