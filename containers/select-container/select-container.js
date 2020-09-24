import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import SelectForm from "../../components/select-form";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBookReader, faBrain} from "@fortawesome/free-solid-svg-icons";

const SelectContainer = () => {


    return (
        <View style={styles.columnContainer}>
            <View style={styles.header}>

            </View>
            <ScrollView style={styles.routeContainer}>
                <Route exact path="/" component={SelectForm} />
                <Route path="/select" component={SelectForm} />
                {/*<Route path="/reader" component={Reader} />*/}
                {/*<Route path="/review" component={Review} />*/}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.flexContainer}>
                    <View style={styles.iconContainer}>
                        <Link to={`/select`}>
                            <View style={styles.flexContainer}>
                                <View>
                                    <TouchableOpacity>
                                        <View><Text style={styles.icon}>3:16</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Link>
                    </View>
                    <View style={styles.iconContainer}>
                        <Link to={`/reader`}>
                            <View style={styles.flexContainer}>
                                <TouchableOpacity>
                                    <FontAwesomeIcon icon={faBookReader} size={30} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                       </Link>
                    </View>
                    <View style={styles.iconContainer}>
                        <View style={styles.flexContainer}>
                            <Link to={`/review`}>
                                <TouchableOpacity>
                                    <FontAwesomeIcon icon={faBrain}  size={30}  style={styles.icon} />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    columnContainer: {
      display: "flex",
      flexDirection: "column"
    },
    flexContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer: {
        flex: 1,
    },
    header: {
        marginBottom: 25,
        height: 60,
        backgroundColor: "#1d78c1"
    },
    routeContainer: {
        flex: "auto"
    },
    footer: {
        marginTop: "auto",
        height: 60,
        backgroundColor: "#1d78c1"
    },
    icon: {
        fontSize: 30,
        color: "white"
    }
});


export default SelectContainer;
