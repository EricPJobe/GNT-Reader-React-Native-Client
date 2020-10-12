import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import ReaderContext from "../context";
import Books from "./books";
import Chapters from "./chapters";
import Verses from "./verses";

const SelectForm = ({navigation}) => {

    const [directionFlag, setDirectionFlag] = useState('from');
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedChapterFrom, setSelectedChapterFrom] = useState('');
    const [selectedChapterTo, setSelectedChapterTo] = useState('');
    const [selectedVerseFrom, setSelectedVerseFrom] = useState('');
    const [selectedVerseTo, setSelectedVerseTo] = useState('');


    const context = useContext(ReaderContext);
    console.log(context);


    const onBookSelect = (book) => {
        console.log("setting book");
        setSelectedBook(book);
    }

    const onChapterSelect = (chapter) => {

        directionFlag === 'from' ?
           setSelectedChapterFrom(chapter) :
           setSelectedChapterTo(chapter)
    }

    const onVerseSelect = (verse) => {

        directionFlag === 'from' ?
            setSelectedVerseFrom(verse) :
            setSelectedVerseTo(verse)
    }

    const onSubmit = () => {
        let bookReference = '';
        let chapterFromReference = '';
        let chapterToReference = '';
        let verseFromReference = '';
        let verseToReference = '';

        selectedBook.bookId.toString().length === 1 ?
            bookReference = `0${selectedBook.bookId.toString()}` :
            bookReference = selectedBook.bookId.toString();

        selectedChapterFrom.toString().length === 1 ?
            chapterFromReference = `0${selectedChapterFrom.toString()}` :
            chapterFromReference = selectedChapterFrom.toString();

        selectedChapterTo.toString().length === 1 ?
            chapterToReference = `0${selectedChapterFrom.toString()}` :
            chapterToReference = selectedChapterFrom.toString();

        selectedVerseFrom.toString().length === 1 ?
            verseFromReference = `0${selectedVerseFrom.toString()}` :
            verseFromReference = selectedVerseFrom.toString();

        selectedVerseTo.toString().length === 1 ?
            verseToReference = `0${selectedVerseTo.toString()}` :
            verseToReference = selectedVerseTo.toString();

        const referenceFrom = `${bookReference}${chapterFromReference}${verseFromReference}`;
        const referenceTo = `${bookReference}${chapterToReference}${verseToReference}`;
        console.log(`${referenceFrom} - ${referenceTo}`);
        context.updateReferences(referenceFrom, referenceTo, selectedBook.bookName);
        navigation.navigate('Reader');
    }


    return (
        <View>
            <Books onBookSelect={onBookSelect} />
        </View>

    )
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
    section: {
        display: "flex",
        flexDirection: "row",
        margin: 10
    },
    group: {
        display: "flex",
        flexDirection: "row",
    },
    labelText: {
        margin: 10
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 30,
        margin: 10,
        color: "#1d78c1"
    },
    touchableHighlight: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 60,
        margin: 10,
        backgroundColor: "#b62b66",
        // backgroundColor: "#c23d3d",
        // backgroundColor: "#d1ca0f",
        borderRadius: 3,
    },
    touchableText: {
        color: "white"
    },
    displayContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: "#d6d6d6",
        borderRadius: 3,
        margin: 10
    },
    bookDisplayContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 180,
        borderWidth: 1,
        borderColor: "#d6d6d6",
        borderRadius: 3,
        margin: 10
    },
    submit: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 80,
        margin: 10,
        backgroundColor: "#1d78c1",
        borderRadius: 3,
    }
});

export default function(props) {
    const navigation = useNavigation();
    return <SelectForm {...props} navigation={navigation} />
}

// export default SelectForm;
