import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {useQuery} from "react-apollo";
import {getVersesQuery} from "./queries";

const Verses = ({ route, navigation }) => {
    const { bookId, bookName, selectedChapter } = route.params;

    let verses = [];
    let numVerses;
    const {loading, error, data } = useQuery(getVersesQuery, {
        variables: {
            bookNumber: parseInt(bookId),
            chapterNumber: parseInt(selectedChapter)
        }
    });

    const onVerseTouch = (verse) => {
        let bookReference = '';
        let chapterFromReference = '';
        let chapterToReference = '';
        let verseFromReference = '';
        let verseToReference = '';

        bookId.toString().length === 1 ?
            bookReference = `0${bookId.toString()}` :
            bookReference = bookId.toString();

        if (selectedChapter.toString().length === 1) {
            chapterFromReference = `0${selectedChapter.toString()}`;
            chapterToReference = `0${selectedChapter.toString()}`;
        } else {
            chapterFromReference = selectedChapter.toString();
            chapterToReference = selectedChapter.toString();
        }

        verse.toString().length === 1 ?
            verseFromReference = `0${verse.toString()}` :
            verseFromReference = verse.toString();

        numVerses.toString().length === 1 ?
            verseToReference = `0${numVerses.toString()}` :
            verseToReference = numVerses.toString();

        const referenceFrom = `${bookReference}${chapterFromReference}${verseFromReference}`;
        const referenceTo = `${bookReference}${chapterToReference}${verseToReference}`;
        navigation.navigate('Reader', {
            selectedReferenceFrom: referenceFrom,
            selectedReferenceTo: referenceTo,
            selectedBookName: bookName,
        });
    }

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;

    if(data) {
        numVerses = data.chapter.numVerses;
        for(let i=1; i<=parseInt(numVerses); i++)
            verses.push(i.toString());
        verses = verses.map(verse => (
            <Pressable key={verse} style={styles.verse} onPress={() => onVerseTouch(verse)} >
                <Text style={styles.verseText}>{verse}</Text>
            </Pressable>
        ));
    }

    return (
        <View style={styles.versesContainer}>
            {verses}
        </View>
    )
}

const styles = StyleSheet.create({
    versesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 20
    },
    verse: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        margin: 2,
        borderRadius: 5,
        backgroundColor: "#DDDDDD",
        padding: 5
    },
    verseText: {
        fontWeight: "bold",
        fontSize: 20
    }
});

export default Verses;
