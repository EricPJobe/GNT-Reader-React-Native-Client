import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const Loading = () => {
    return <View style={styles.flexContainer}><Text>Loading...</Text></View>
}

const styles = new StyleSheet.create({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    loadingText: {
        fontWeight: "bold",
        color: "#1d78c1"
    }
});

export default Loading;
