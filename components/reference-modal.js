import React from "react";
import {Modal, StyleSheet, Text, View} from 'react-native';
import Books from "./books";
import { createStackNavigator } from '@react-navigation/stack';
import Chapters from "./chapters";
import Verses from "./verses";

const Stack = createStackNavigator();

const ReferenceModal = (props) => {

    return (
        <Stack.Navigator initialRouteName="Books">
            <Stack.Screen name="Books" component={Books} />
            <Stack.Screen name="Chapters" component={Chapters} />
            <Stack.Screen name="Verses" component={Verses} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 400,
        height: "80%",
        marginVertical: 20,
        marginHorizontal: 0,
        backgroundColor: "white",
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textContainer: {
        marginTop: 30,
        flex: 1,
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "#1d78c1"
    },
    starContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1
    },
    star: {
        flex: 1,
        padding: 20
    },
    submitContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    submit: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: 150,
        margin: 10,
        backgroundColor: "#1d78c1",
        borderRadius: 10,
    },
    touchableText: {
        color: "white",
        fontWeight: "bold"
    }
});

export default ReferenceModal;
