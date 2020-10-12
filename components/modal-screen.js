import React from "react";
import {Modal, StyleSheet, Text, View} from 'react-native';
import Books from "./books";
import { createStackNavigator } from '@react-navigation/stack';
import Chapters from "./chapters";
import Verses from "./verses";

const Stack = createStackNavigator();

const ModalScreen = () => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="Books" component={Books} />
            <Stack.Screen name="Chapters" component={Chapters} />
            <Stack.Screen name="Verses" component={Verses} />
        </Stack.Navigator>
    )
}
