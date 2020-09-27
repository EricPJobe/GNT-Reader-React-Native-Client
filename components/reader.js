import React, { useContext, useState } from 'react';
import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import ReaderContext from "../context";
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "react-apollo";
import {getWordsQuery} from "./queries";
import getPos from '../utils/pos';
import getParsing from '../utils/parsing';

const Reader = ({navigation}) => {
    // const context = useContext(ReaderContext);
    let sortedData = [];
    let words;
    const context = {
        bookName: 'Romans',
        referenceFrom: '060101',
        referenceTo: '060102'
    }
    const [morphInfo, setMorphInfo] = useState({
        word: '',
        lemma: '',
        gloss: '',
        pos: '',
        parsing: ''
    });
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

    const onWordTouch = (e) => {
        console.log(e);
        let pos = getPos(e.pos);
        let parsing = getParsing(e.parsing);
        let word = e.word;
        let lemma = e.lemma;
        let gloss = e.gloss;
        let partOfSpeech = pos;
        let parsingInfo = '';

        if(pos === 'verb')
            if (parsing.mood === "participle")
                parsingInfo = `${parsing.tense} ${parsing.voice} ${parsing.mood} ${parsing.nounCase} ${parsing.gender} ${parsing.number}`;
            else
                parsingInfo = `${parsing.tense} ${parsing.voice} ${parsing.mood}`
        else
            switch (pos) {
                case 'noun':
                case 'adjective':
                case 'definite article':
                case 'pronoun':
                case 'relative pronoun':
                case 'demonstrative pronoun':
                case 'interrogative/indefinite pronoun':
                    parsingInfo = `${parsing.nounCase} ${parsing.gender} ${parsing.number}`;
                    break;
                default: break;
        }
        setMorphInfo({
            word: word,
            lemma: lemma,
            gloss: gloss,
            pos: partOfSpeech,
            parsing: parsingInfo
        });

    }

    if(data) {
        console.log(data.words);
        sortedData = [... data.words];
        sortedData.sort((a,b) => {
            return a.id - b.id
        });
        console.log(sortedData);
        words = sortedData.map(word => (
            <View key={word.id}>
                <Pressable onPress={() => onWordTouch(word)}>
                    <Text style={styles.word}>{word.text}</Text>
                </Pressable>
            </View>
        ));

    }

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;

    return (

        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{bookName} {chapterFrom}:{verseFrom} - {chapterTo}:{verseTo}</Text>
            </View>
            <View style={styles.viewContainer}>
                <ScrollView contentContainerStyle={styles.viewer}>
                    {words}
                </ScrollView>
            </View>

            <View style={styles.infoBoxContainer}>
                <View style={styles.inline}>
                    <Text style={styles.wordInfo}>{morphInfo.word} </Text>
                    <Text style={styles.lemmaInfo}>{morphInfo.lemma} </Text>
                    <Text>{morphInfo.pos} {morphInfo.parsing} </Text>
                    <Text style={styles.glossInfo}>{morphInfo.gloss} </Text></View>
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
    titleContainer: {
       flex: 1,
       alignItems: "center",
       justifyContent: "center",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#1d78c1"
    },
    viewContainer: {
        flex: 3
    },
    viewer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 20
    },
    infoBoxContainer: {
        width: "96%",
        flex: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
        margin: 20,
        padding: 20
    },
    wordInfo: {
        fontSize: 15
    },
    lemmaInfo: {
        fontSize: 15,
        fontWeight: "bold"
    },
    glossInfo: {
        fontStyle: "italic"
    },
    word: {
        margin: 2,
        borderRadius: 5,
        backgroundColor: "#EEEEEE",
        padding: 5
    },
    inline: {
        display: "inline"
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
