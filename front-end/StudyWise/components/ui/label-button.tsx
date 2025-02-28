import { View, Text, StyleSheet, ColorValue} from "react-native"

export default function LabelButton({label, color}: {label:string, color?: ColorValue}) {
    return (
        <View style={[styles.labelButton, { backgroundColor: color || '#5A48ff'}]}>
            <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 14, color: 'white'}}>{label}</Text>
        </View> 
    ) 
}

const styles = StyleSheet.create({
    labelButton: {
        justifyContent:'center',
        borderRadius: 10,
        paddingHorizontal: 12, 
        paddingVertical: 4,
    },
})