import { View, Pressable, Text, StyleSheet, GestureResponderEvent} from "react-native"
import AddFileIcon from "@/assets/svg/add-file-icon"

type EventHandler<T> = (event: T) => void;

export default function InputFileArea({handleAddButtonPress, hasInput}: {handleAddButtonPress: EventHandler<GestureResponderEvent>, hasInput: boolean}) {
    return(
        <View style={styles.container}>
            <Pressable onPress= {handleAddButtonPress}>
                <AddFileIcon opacity={hasInput ? 0.4 : 1}/>
            </Pressable>
            <Pressable style={{flex:1, alignItems:'center'}} onPress= {handleAddButtonPress}>
                <View 
                    style={
                        hasInput 
                            ? [styles.addFileButton, {backgroundColor:'rgba(255, 71, 112, 0.4)'}] 
                            : styles.addFileButton}>
                <Text style={styles.ButtonText}>
                    Anexar um arquivo PDF, JPG/PNG ou CSV
                </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    ButtonText: {
        alignSelf:'center',
        textAlign:'center',
        fontSize: 18,
        color: 'white',
        fontFamily: 'VisbyRoundCF-Bold',
    },
    addFileButton: {
        height:"90%",
        width: "60%",
        backgroundColor: 'rgba(255, 71, 112, 1)',
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal:'5%'
    },
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:'20%',
    }
})