import React, { Component, useContext } from 'react';
import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import ReaderContext from "../context";
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "react-apollo";
import {getWordsQuery} from "./queries";

const Reader = ({navigation}) => {
    // const context = useContext(ReaderContext);
    let sortedData = [];
    let words;
    const context = {
        bookName: 'Romans',
        referenceFrom: '060101',
        referenceTo: '060102'
    }
    const bookName = context.bookName;
    const chapterFrom = context.referenceFrom.slice(2,4).replace('0', '');
    const chapterTo = context.referenceFrom.slice(4).replace('0', '');
    const verseFrom = context.referenceTo.slice(2,4).replace('0', '');
    const verseTo = context.referenceTo.slice(4).replace('0', '');

    const {loading, error, data } = useQuery(getWordsQuery, {
        variables: {
            referenceFrom: context.referenceFrom,
            referenceTo: context.referenceTo
        }
    });

    if(data) {
        console.log(data.words);
        sortedData = [... data.words];
        sortedData.sort((a,b) => {
            return a.id - b.id
        });
        console.log(sortedData);
        words = sortedData.map(word => (
            <View key={word.id}>
                <Pressable>
                    <Text style={styles.word}>{word.text}</Text>
                </Pressable>
            </View>
        ));

    }

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;


    return (

        <View style={styles.container}>
            <View><Text>{bookName} {chapterFrom}:{verseFrom} - {chapterTo}:{verseTo}</Text></View>
            <ScrollView contentContainerStyle={styles.viewer}>
                {words}
            </ScrollView>
            <View style={styles.infoBox}>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    viewer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    infoBox: {

    },
    word: {
        margin: 2,
        borderRadius: 5,
        backgroundColor: "#EEEEEE",
        padding: 5
    },
    wordText: {

        padding: 5
    }
});

// export default function(props) {
//     const navigation = useNavigation();
//     return <Reader {...props} navigation={navigation} />
// }

export default Reader;
