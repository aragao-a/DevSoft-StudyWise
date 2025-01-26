import { View, StyleSheet, Text, Pressable} from "react-native";
import ImageIcon from "@/assets/svg/image-icon";
import CancelIcon from "@/assets/svg/cancel-icon";

export default function SelectedFile({fileName, cancelFunction}: {fileName: string, cancelFunction: Function}) {
    const handleCancel = () => {cancelFunction(null);}
    return (
    <View style={styles.container}>
        <View style={styles.group}>
        <ImageIcon/>
        <Text style={styles.baseText}>
            {fileName}
        </Text>
        </View>
        <Pressable onPress={handleCancel}>
            <CancelIcon/>
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        minHeight:40,
        width:'80%',
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 10,
        marginBottom:'10%',
        paddingHorizontal:'3%',
        paddingVertical:5,
        gap:'1%',
    },
    group: {
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        gap:5,
    },
    baseText: {
        flexShrink:1,
        fontFamily: 'VisbyRoundCF-Regular',
        fontSize: 16
    }
})