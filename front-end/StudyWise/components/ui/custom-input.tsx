import { TextInput, TextInputProps} from "react-native";
import { Controller, UseControllerProps } from 'react-hook-form';
import { forwardRef } from "react";

type Props = {
    formProps:UseControllerProps;
    inputProps: TextInputProps;
}

const CustomInput = forwardRef<TextInput, Props> (({inputProps, formProps}, ref) => {
    return (
        <Controller {...formProps} render={({field}) => (
        <TextInput ref={ref} value={field.value} onChangeText={field.onChange} submitBehavior='blurAndSubmit' {...inputProps}
            placeholderTextColor="#999"
        />
        )}
        />
    )
});

export { CustomInput };
