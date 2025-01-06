import { View, Text, StyleSheet, ViewProps} from "react-native";
import CustomInput from "./custom-input";

const marginElements = 15;
const relativeSize = '80%';
const bordersSize = '10%' // ((100 - 80) / 2)

type Props = ViewProps & {
    fieldDescription: string, 
    inputDescription: string,
}
export default function SignUpField({
    fieldDescription, 
    inputDescription,
    ...rest} : Props) 
    {   
        return (
            <View style={styles.container}>
                <Text style={styles.baseText}>
                    {fieldDescription}
                </Text>
                <CustomInput style ={styles.input} inputDescription={inputDescription}/>
            </View>
        )
    }

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
})