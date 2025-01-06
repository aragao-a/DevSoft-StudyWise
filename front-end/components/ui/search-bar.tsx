import { View, StyleSheet } from "react-native";
import CustomInput from "./custom-input";

export default function SearchBar() {
    return (
        <View>
            <CustomInput inputDescription={undefined} style={styles.input}></CustomInput>
        </View>
    )
}

const styles = StyleSheet.create({
input: {
    marginTop: 35,
    alignSelf: 'center',
    width: '90%',
    height:35,
    backgroundColor: 'rgba(230, 230, 230, 1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: 'VisbyRoundCF-Regular',
},
})