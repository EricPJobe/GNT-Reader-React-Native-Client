import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import ReaderContext from "../context";
import Books from "./books";
import Chapters from "./chapters";
import Verses from "./verses";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const Nav = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="book" component={Books} />
            <Stack.Screen name="chapter" component={Chapters} />
            <Stack.Screen name="verse" component={Verses} />
        </Stack.Navigator>
    );
}

export default function(props) {
    const navigation = useNavigation();
    return <Nav {...props} navigation={navigation} />
}
