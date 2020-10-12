import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useQuery } from "react-apollo";
import { getWordsQuery } from "./queries";
import getPos from '../utils/pos';
import getParsing from '../utils/parsing';
import FlashcardModal from "./flashcard-modal";
import { FontAwesome5 } from '@expo/vector-icons';
import ReferenceModal from "./reference-modal";

const Reader = ({route, navigation}) => {

    console.log("Params: ")
    console.log(route.params);

    let sortedData = [];
    let words;

    const [references, setReferences] = useState({
        referenceFrom: '060101',
        referenceTo: '060132',
        bookName: 'Romans'
    });

    const {loading, error, data } = useQuery(getWordsQuery, {
        variables: {
            referenceFrom: references.referenceFrom,
            referenceTo: references.referenceTo
        }
    });

    useEffect(() => {
        if(route.params) {
            let { selectedReferenceFrom, selectedReferenceTo, selectedBookName } = route.params
            console.log(selectedBookName);

            setReferences({
                referenceFrom: selectedReferenceFrom,
                referenceTo: selectedReferenceTo,
                bookName: selectedBookName
            });
        }

        console.log("useEffect");
    }, [route.params])

    const [flashcardModalVisible, setFlashcardModalVisible] = useState(false);
    const [morphInfo, setMorphInfo] = useState({
        word: '',
        lemma: '',
        gloss: '',
        pos: '',
        parsing: ''
    });

    const bookName = references.bookName;
    const chapterFrom = references.referenceFrom.slice(2,4).replace('0', '');
    const chapterTo = references.referenceFrom.slice(4).replace('0', '');
    const verseFrom = references.referenceTo.slice(2,4).replace('0', '');
    const verseTo = references.referenceTo.slice(4).replace('0', '');

    const flashcardModal = <FlashcardModal visible={flashcardModalVisible} word={morphInfo} onSelectLevel={() => onSelectLevel()} />;

    const onSelectLevel = () => {
        setFlashcardModalVisible(false);
    }

    const openModel = () => {
        navigation.navigate('References');
    }

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
        // console.log(data.words);
        sortedData = [... data.words];
        sortedData.sort((a,b) => {
            return a.id - b.id
        });
        // console.log(sortedData);
        words = sortedData.map(word => (
            <View key={word.id}>
                <Pressable onLongPress={() => setFlashcardModalVisible(true)}  onPressIn={() => onWordTouch(word)} >
                    <Text style={styles.word}>{word.text}</Text>
                </Pressable>
            </View>
        ));
    }

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;

    return (

        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <Pressable onPress={() => openModel()}>
                    <FontAwesome5 name="list" size={24} color={"white"} />
                </Pressable>

                <Text style={styles.topBarText}>Greek New Testament Reader</Text>
                <View><Text> </Text></View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{bookName} {chapterFrom}:{verseFrom} - {chapterTo}:{verseTo}</Text>
            </View>
            <View style={styles.viewContainer}>
                <ScrollView contentContainerStyle={styles.viewer}>
                    {words}
                </ScrollView>
            </View>

            <ScrollView style={styles.infoBoxContainer}>
                <View style={styles.inline}>
                    <Text style={styles.wordInfo}>{morphInfo.word} </Text>
                    <Text style={styles.lemmaInfo}>{morphInfo.lemma} </Text>
                    <Text>{morphInfo.pos} {morphInfo.parsing} </Text>
                    <Text style={styles.glossInfo}>{morphInfo.gloss} </Text>
                </View>
            </ScrollView>
            <View>
                {flashcardModal}
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
       marginTop: 20
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 20,
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
        borderColor: "#DDDDDD",
        borderRadius: 10,
        margin: 20,
        padding: 20,
        overflow: "scroll"
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
        display: "flex"
    },
    wordText: {
        padding: 5
    },
    topBarContainer: {
        backgroundColor: "#1d78c1",
        display: "flex",
        flexDirection: "row",
        paddingTop: 50,
        justifyContent: "space-between",
        height: 100,
        width: "100%",
        padding: 20
    },
    topBarText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
});

export default Reader;
