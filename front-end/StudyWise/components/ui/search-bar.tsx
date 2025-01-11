import { View, StyleSheet, TextInputProps } from "react-native";
import {CustomInput} from "./custom-input";
import { UseControllerProps } from "react-hook-form";
import FrownIcon from "@/assets/svg/frown-icon";
import SearchIcon from "@/assets/svg/search-icon";

type Props = {
    inputProps: TextInputProps,
    formProps: UseControllerProps
}
export default function SearchBar({formProps, inputProps}: Props) {
    return (
        <View style={styles.bar}>
            <SearchIcon style={styles.icon}/>
            <CustomInput formProps={formProps} inputProps={{...inputProps, style:styles.input}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        marginTop: 35,
        alignSelf: 'center',
        width: '90%',
        height:40,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 20,
        paddingHorizontal: 15,
        flexDirection:'row',
    },
    input: {
        flex:1,
        paddingLeft:10,
        fontSize: 16,
        fontFamily: 'VisbyRoundCF-Regular',
    },
    icon: {
        alignSelf:'center'
    }
})