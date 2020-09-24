import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";

const Item = ({item, onPress}) => {
    // console.log(item);
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <View><Text style={styles.name}>{item}</Text></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        margin: 0,
        padding: 10,
        width: 300,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor:'#dcdcdc'
    },
    name: {
        fontSize: 20
    }
});

export default Item;





