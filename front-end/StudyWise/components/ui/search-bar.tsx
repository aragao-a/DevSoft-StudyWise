import { View, StyleSheet, TextInputProps, ViewProps, TextInput } from "react-native";
import CustomInput from "./custom-input";
import { UseControllerProps } from "react-hook-form";
import  Animated, {AnimatedStyle} from "react-native-reanimated";
import { forwardRef } from "react";

type Props = {
    inputProps: TextInputProps,
    formProps: UseControllerProps,
    layoutProps: ViewProps,
    animatedStyle?: AnimatedStyle,
}
const SearchBar = forwardRef<TextInput, Props>(({formProps, inputProps, layoutProps, animatedStyle}, ref) => {
    return (
        <Animated.View style={
            inputProps.readOnly ? 
                [[styles.bar
                    , {backgroundColor: ' rgba(200, 200, 200, 1)', borderColor: 'rgba(230, 230, 230, 1)'}, layoutProps
                    ]
                    , animatedStyle
                ]
                : [[styles.bar, layoutProps], animatedStyle]}>
            <View style={styles.group}>
                {layoutProps.children}
                <CustomInput ref={ref} formProps={formProps} inputProps={{...inputProps, style:styles.input}}/>
            </View>
        </Animated.View>
    )
});

export default SearchBar;
const styles = StyleSheet.create({
    bar: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 20,
        borderWidth:1,
        borderColor: 'rgba(200, 200, 200, 1)',
        paddingHorizontal: '5%',
        flexDirection:'row',
        alignItems:'flex-start',
        height:'auto'
    },
    input: {
        flex:1,
        paddingLeft:10,
        fontSize: 16,
        fontFamily: 'VisbyRoundCF-Regular',
    },
    group: {
        flexDirection:'row', 
        alignItems:'center'
    }
})