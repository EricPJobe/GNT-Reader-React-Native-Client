import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import BookModal from "./book-modal";
import ChapterModal from "./chapter-modal";
import VerseModal from "./verse-modal";
import ReaderContext from "../context";

class SelectForm extends Component {

    directionFlag = 'to';

    constructor(props) {
        super(props);
        this.state = {
            selectedBook: '',
            selectedChapterFrom: '',
            selectedChapterTo: '',
            selectedVerseFrom: '',
            selectedVerseTo: '',
            bookModalVisible: false,
            chapterModalVisible: false,
            verseModalVisible: false,
        };
    }

    setModalVisible = (visible, modal) => {
        let state = {};
        switch (modal) {
            case 'bookModal':
                state = {bookModalVisible: visible};
                break;
            case 'chapterModal':
                state = {chapterModalVisible: visible};
                break;
            case 'verseModal':
                state = {verseModalVisible: visible};
                break;
        }
        this.setState(state);
    }

    onBookPress = () => {
        console.log("book press");
        this.setModalVisible(true, 'bookModal');
    }

    onChapterPress = (order) => {
        console.log(order);
        this.setModalVisible(true, 'chapterModal');
        order === 'to' ?
            this.directionFlag = 'to' :
            this.directionFlag = 'from';
    }

    onVersePress = (order) => {
        console.log(order);
        this.setModalVisible(true, 'verseModal');
        order === 'to' ?
            this.directionFlag = 'to' :
            this.directionFlag = 'from';
    }

    onBookSelect = (book) => {
        let state = {
            selectedBook: book,
            selectedChapterFrom: '',
            selectedChapterTo: '',
            selectedVerseFrom: '',
            selectedVerseTo: '',
            bookModalVisible: false
        }
        this.setState(state, () => {
            this.selectedBookChapters = this.state.selectedBook.numChapters;
        });
        console.log(book);
    }

    onChapterSelect = (chapter) => {
        let state = {
            chapterModalVisible: false
        }
        console.log(chapter);
        this.directionFlag === 'from' ?
            state.selectedChapterFrom = chapter :
            state.selectedChapterTo = chapter;
        this.setState(state);
    }

    onVerseSelect = (verse) => {
        let state = {
            verseModalVisible: false
        }
        console.log(verse);
        this.directionFlag === 'from' ?
            state.selectedVerseFrom = verse :
            state.selectedVerseTo = verse;
        this.setState(state);
    }

    onSubmit = () => {
        console.log(`From: ${this.state.selectedBook.bookName} ${this.state.selectedChapterFrom}:${this.state.selectedVerseFrom} 
                     To: ${this.state.selectedBook.bookName} ${this.state.selectedChapterTo}:${this.state.selectedVerseTo}`);
        let bookReference = '';
        let chapterFromReference = '';
        let chapterToReference = '';
        let verseFromReference = '';
        let verseToReference = '';

        this.state.selectedBook.bookId.toString().length === 1 ?
            bookReference = `0${this.state.selectedBook.bookId.toString()}` :
            bookReference = this.state.selectedBook.bookId.toString();

        this.state.selectedChapterFrom.toString().length === 1 ?
            chapterFromReference = `0${this.state.selectedChapterFrom.toString()}` :
            chapterFromReference = this.state.selectedChapterFrom.toString();

        this.state.selectedChapterTo.toString().length === 1 ?
            chapterToReference = `0${this.state.selectedChapterFrom.toString()}` :
            chapterToReference = this.state.selectedChapterFrom.toString();

        this.state.selectedVerseFrom.toString().length === 1 ?
            verseFromReference = `0${this.state.selectedVerseFrom.toString()}` :
            verseFromReference = this.state.selectedVerseFrom.toString();

        this.state.selectedVerseTo.toString().length === 1 ?
            verseToReference = `0${this.state.selectedVerseTo.toString()}` :
            verseToReference = this.state.selectedVerseTo.toString();

        const referenceFrom = `${bookReference}${chapterFromReference}${verseFromReference}`;
        const referenceTo = `${bookReference}${chapterToReference}${verseToReference}`;
        console.log(`${referenceFrom} - ${referenceTo}`);

        this.props.updateReferenceFrom(referenceFrom);
        this.props.updateReferenceTo(referenceTo);

    }

    render() {
        console.log("searchForm Rendering")
        const { bookModalVisible,
                chapterModalVisible,
                verseModalVisible,
                selectedBook,
                selectedChapterFrom,
                selectedChapterTo } = this.state;

        let bookModal =  <BookModal
                            visible={bookModalVisible}
                            onSelect={this.onBookSelect}
                        />;
        let chapterModal;
        let verseModal;
        if(selectedBook) {
            chapterModal = <ChapterModal
                                visible={chapterModalVisible}
                                onSelect={this.onChapterSelect}
                                numChapters={selectedBook.numChapters}
                                startingChapter={this.directionFlag === 'from' ? 1 : selectedChapterFrom}
                            />
            if(selectedChapterFrom) {
                console.log("rendering verse modal");
                verseModal = <VerseModal
                                visible={verseModalVisible && selectedChapterFrom}
                                onSelect={this.onVerseSelect}
                                bookNumber={selectedBook.bookId}
                                chapterNumber={this.directionFlag === 'from' ? selectedChapterFrom : selectedChapterTo}
                                startingVerse={this.directionFlag === 'from' ? 1 : selectedVerseFrom}
                            />
            }
        }
        return (
            <View style={styles.container}>
                {bookModal}
                {chapterModal}
                {verseModal}

                {/*<View><Text style={styles.titleText}>Select Text Range</Text></View>*/}
                <View>
                    <View style={styles.labelText}><Text>Book: </Text></View>
                    <View style={styles.section}>
                        <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.onBookPress()}>
                            <View><Text style={styles.touchableText}>Book</Text></View>
                        </TouchableHighlight>
                        <View style={styles.bookDisplayContainer}><Text>{this.state.selectedBook.bookName}</Text></View>
                    </View>
                    <View style={styles.labelText}><Text>From: </Text></View>
                    <View style={styles.section}>
                        <View style={styles.group}>
                            <View>
                                <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.onChapterPress('from')}>
                                    <View><Text style={styles.touchableText}>Chapter</Text></View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.displayContainer}><Text>{this.state.selectedChapterFrom}</Text></View>
                        </View>
                        <View style={styles.group}>
                            <View>
                                <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.onVersePress('from')}>
                                    <View><Text style={styles.touchableText}>Verse</Text></View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.displayContainer}><Text>{this.state.selectedVerseFrom}</Text></View>
                        </View>
                    </View>
                    <View style={styles.labelText}><Text>To: </Text></View>
                    <View style={styles.section}>
                        <View style={styles.group}>
                            <View>
                                <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.onChapterPress('to')}>
                                    <View><Text style={styles.touchableText}>Chapter</Text></View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.displayContainer}><Text>{this.state.selectedChapterTo}</Text></View>
                        </View>
                        <View style={styles.group}>
                            <View>
                                <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.onVersePress('to')}>
                                    <View><Text style={styles.touchableText}>Verse</Text></View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.displayContainer}><Text>{this.state.selectedVerseTo}</Text></View>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableHighlight style={styles.submit} onPress={() => this.onSubmit()}>
                        <View><Text style={styles.touchableText}>Select</Text></View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
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

// export default function(props) {
//     const navigation = useNavigation();
//     return <SelectForm {...props} navigation={navigation} />
// }

export default SelectForm;
