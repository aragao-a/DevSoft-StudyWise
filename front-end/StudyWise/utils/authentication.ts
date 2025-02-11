import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";

const getUserID = async () => {
    try {
      const userID = await SecureStore.getItemAsync('userID');
      return userID;
    } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro. Tente novamente');
    }
};

const storeUserID = async (userID: number) => {
  try {
    await SecureStore.setItemAsync('userID', userID.toString());
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro. Tente novamente');
  }
};

export {getUserID, storeUserID}