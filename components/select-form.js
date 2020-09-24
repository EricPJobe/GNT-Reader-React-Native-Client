import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import BookModal from "./book-modal";
import ChapterModal from "./chapter-modal";
import VerseModal from "./verse-modal";
import ReaderContext from "../context";

const SelectForm = ({navigation}) => {

    const [directionFlag, setDirectionFlag] = useState('from');
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedChapterFrom, setSelectedChapterFrom] = useState('');
    const [selectedChapterTo, setSelectedChapterTo] = useState('');
    const [selectedVerseFrom, setSelectedVerseFrom] = useState('');
    const [selectedVerseTo, setSelectedVerseTo] = useState('');
    const [bookModalVisible, setBookModalVisible] = useState(false);
    const [chapterModalVisible, setChapterModalVisible] = useState(false);
    const [verseModalVisible, setVerseModalVisible] = useState(false);

    const context = useContext(ReaderContext);
    console.log(context);

    const setModalVisible = (visible, modal) => {
        switch (modal) {
            case 'bookModal':
                setBookModalVisible(visible);
                break;
            case 'chapterModal':
                setChapterModalVisible(visible);
                break;
            case 'verseModal':
                setVerseModalVisible(visible);
                console.log(verseModalVisible);
                break;
        }
    }

    const onBookPress = () => {
        setModalVisible(true, 'bookModal');
    }

    const onChapterPress = (order) => {
        console.log(order);
        setModalVisible(true, 'chapterModal');
        order === 'to' ?
            setDirectionFlag('to') :
            setDirectionFlag('from');
    }

    const onVersePress = (order) => {
        console.log(order);
        setModalVisible(true, 'verseModal');
        order === 'to' ?
            setDirectionFlag('to') :
            setDirectionFlag('from');
    }

    const onBookSelect = (book) => {
        setSelectedBook(book);
        setBookModalVisible(false);
    }

    const onChapterSelect = (chapter) => {
        setChapterModalVisible(false);
        directionFlag === 'from' ?
           setSelectedChapterFrom(chapter) :
           setSelectedChapterTo(chapter)
    }

    const onVerseSelect = (verse) => {
        setVerseModalVisible(false);
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

    console.log(verseModalVisible);

    let bookModal =  <BookModal
                        visible={bookModalVisible}
                        onSelect={onBookSelect}
                    />;
    let chapterModal;
    let verseModal;
    if(selectedBook) {
        chapterModal = <ChapterModal
                            visible={chapterModalVisible}
                            onSelect={onChapterSelect}
                            numChapters={selectedBook.numChapters}
                            startingChapter={directionFlag === 'from' ? 1 : selectedChapterFrom}
                        />
        if(selectedChapterFrom) {
            console.log("rendering verse modal");
            verseModal = <VerseModal
                            visible={verseModalVisible && selectedChapterFrom}
                            onSelect={onVerseSelect}
                            bookNumber={selectedBook.bookId}
                            chapterNumber={directionFlag === 'from' ? selectedChapterFrom : selectedChapterTo}
                            startingVerse={directionFlag === 'from' ? 1 : selectedVerseFrom}
                        />
        }
    }
    return (
        <View style={styles.container}>
            {bookModal}
            {chapterModal}
            {verseModal}
            <View><Text>debug: {verseModalVisible.toString()}, {selectedChapterFrom.toString()}</Text></View>

            {/*<View><Text style={styles.titleText}>Select Text Range</Text></View>*/}
            <View>
                <View style={styles.labelText}><Text>Book: </Text></View>
                <View style={styles.section}>
                    <TouchableHighlight style={styles.touchableHighlight} onPress={() => onBookPress()}>
                        <View><Text style={styles.touchableText}>Book</Text></View>
                    </TouchableHighlight>
                    <View style={styles.bookDisplayContainer}><Text>{selectedBook.bookName}</Text></View>
                </View>
                <View style={styles.labelText}><Text>From: </Text></View>
                <View style={styles.section}>
                    <View style={styles.group}>
                        <View>
                            <TouchableHighlight style={styles.touchableHighlight} onPress={() => onChapterPress('from')}>
                                <View><Text style={styles.touchableText}>Chapter</Text></View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.displayContainer}><Text>{selectedChapterFrom}</Text></View>
                    </View>
                    <View style={styles.group}>
                        <View>
                            <TouchableHighlight style={styles.touchableHighlight} onPress={() => onVersePress('from')}>
                                <View><Text style={styles.touchableText}>Verse</Text></View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.displayContainer}><Text>{selectedVerseFrom}</Text></View>
                    </View>
                </View>
                <View style={styles.labelText}><Text>To: </Text></View>
                <View style={styles.section}>
                    <View style={styles.group}>
                        <View>
                            <TouchableHighlight style={styles.touchableHighlight} onPress={() => onChapterPress('to')}>
                                <View><Text style={styles.touchableText}>Chapter</Text></View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.displayContainer}><Text>{selectedChapterTo}</Text></View>
                    </View>
                    <View style={styles.group}>
                        <View>
                            <TouchableHighlight style={styles.touchableHighlight} onPress={() => onVersePress('to')}>
                                <View><Text style={styles.touchableText}>Verse</Text></View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.displayContainer}><Text>{selectedVerseTo}</Text></View>
                    </View>
                </View>
            </View>
            <View>
                <TouchableHighlight style={styles.submit} onPress={() => onSubmit()}>
                    <View><Text style={styles.touchableText}>Select</Text></View>
                </TouchableHighlight>
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
