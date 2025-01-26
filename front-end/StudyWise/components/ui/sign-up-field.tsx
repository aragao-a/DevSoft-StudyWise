import { View, Text, TextInput, StyleSheet, ViewProps, TextInputProps} from "react-native";
import {CustomInput} from "./custom-input";
import { ControllerProps, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";

const marginElements = 15;
const relativeSize = '80%';
const bordersSize = '10%' // ((100 - 80) / 2)

type Props = {
    fieldDescription: string,
    groupProps: ViewProps,
    formProps: UseControllerProps,
    inputProps: TextInputProps,
    error?: string,
}
const SignUpField = forwardRef<TextInput, Props>(({fieldDescription, groupProps, formProps, inputProps, error=''}, ref) =>
    {   
        return (
            <View style={styles.container} {...groupProps}>
                <Text style={styles.baseText}>
                    {fieldDescription}
                </Text>
                <CustomInput 
                    ref={ref}
                    formProps={formProps}
                    inputProps={{
                        style:styles.input, 
                        ...inputProps
                    }}
                    />
                {(error.length > 0) && <Text style={styles.errorText}>
                    {error}
                </Text>}
            </View>
        )
    })

const styles = StyleSheet.create({
    container: {
        width:'100%', 
        maxWidth:480,
    },
    input: {
        marginTop: marginElements,
        alignSelf: 'center',
        width: relativeSize,
        height:45,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: '#0000005E', 
        borderWidth: 1, 
        fontSize: 16,
        fontFamily: 'VisbyRoundCF-Regular',
    },  
    baseText: {
        marginTop: marginElements,
        fontSize: 18,
        color: 'black',
        fontFamily: 'VisbyRoundCF-Bold',
        marginLeft: bordersSize,
        transform: [{scaleY: 1.05}], //faz aparecer a bolinha do "i" nessa fonte("VisbyRoundCF")
    },
    errorText: {
        marginTop: 2,
        fontSize: 14,
        marginLeft: bordersSize,
        color: 'rgba(255, 71, 112, 1)',
        fontFamily: 'VisbyRoundCF-Regular',
        transform: [{scaleY: 1.05}]
    }
})

export {SignUpField};