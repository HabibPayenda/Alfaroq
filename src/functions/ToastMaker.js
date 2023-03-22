import { ToastAndroid } from "react-native";

export default function ToastMaker(message = 'اشتباه!') {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};