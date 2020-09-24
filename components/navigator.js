import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import SelectForm from "./select-form";
import Reader from "./reader";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const Nav = () => {
    return (
        <View>
            {/*<View style={styles.header}>*/}

            {/*</View>*/}
            {/*<ScrollView contentContainerStyle={styles.routeContainer}>*/}
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="SelectForm">
                        <Stack.Screen name="SelectForm" component={SelectForm} />
                        <Stack.Screen name="Reader" component={Reader} />
                    </Stack.Navigator>
                </NavigationContainer>
            {/*</ScrollView>*/}
            {/*<View style={styles.footer}>*/}
            {/*    <View style={styles.iconContainer}>*/}
            {/*        <View style={styles.flexContainer}>*/}
            {/*            <TouchableOpacity onPress={() => navigation.navigate('SelectForm')}>*/}
            {/*                <View><Text style={styles.icon}>3:16</Text></View>*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.iconContainer}>*/}
            {/*        <View style={styles.flexContainer}>*/}
            {/*            <TouchableOpacity onPress={() => navigation.navigate('Reader')}>*/}
            {/*                <FontAwesomeIcon icon={faBookReader} size={30} />*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.iconContainer}>*/}
            {/*        <View style={styles.flexContainer}>*/}
            {/*            <TouchableOpacity>*/}
            {/*                <FontAwesomeIcon icon={faBrain} size={30} />*/}
            {/*            </TouchableOpacity>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    iconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        marginBottom: 25,
        height: 80,
        backgroundColor: "#1d78c1"
    },
    routeContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    flexContainer: {
        display: "flex",
        flexDirection: "row",
    },
    footer: {
        height: 100,
        backgroundColor: "#1d78c1",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 30,
        color: "white"
    }
});

export default Nav;


