import { View, Text, StyleSheet} from "react-native"
import getLabelColor from "@/utils/get-label-color"

export default function LabelButton({label}: {label:string}) {
    return (
        <View style={[styles.labelButton, { backgroundColor: getLabelColor(label)}]}>
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