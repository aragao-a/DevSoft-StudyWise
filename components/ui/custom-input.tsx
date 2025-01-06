import { TextInput, TextInputProps} from "react-native"

type Props = TextInputProps & {
    inputDescription: (string | undefined)
}

export default function CustomInput({onFocus, onBlur, inputDescription, style, ...rest} : Props) {
    return (
        <TextInput style={style} onFocus={onFocus} onBlur={onBlur} submitBehavior='blurAndSubmit'
            placeholder={inputDescription}
            placeholderTextColor="#999"
        />
    )
}
