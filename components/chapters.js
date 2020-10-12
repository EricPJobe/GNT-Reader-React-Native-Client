import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {useQuery} from "react-apollo";

const Chapters = ({ route, navigation }) => {
    let chapters = [];

    const { bookId, bookName, numChapters } = route.params;

    for(let i=1; i<=numChapters; i++)
        chapters.push(i.toString());

    const onChapterTouch = (item) => {
        navigation.navigate('Verses', {
            bookId: bookId,
            bookName: bookName,
            selectedChapter: item
        });
    }

    chapters = chapters.map(chapter => (
        <Pressable key={chapter} style={styles.chapter} onPress={() => onChapterTouch(chapter)} >
            <Text style={styles.chapterText}>{chapter}</Text>
        </Pressable>
    ));


    return (
        <View style={styles.chaptersContainer}>
            {chapters}
        </View>
    );
}

const styles = StyleSheet.create({
    chaptersContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 20
    },
    chapter: {
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
    chapterText: {
        fontWeight: "bold",
        fontSize: 20
    }
});

export default Chapters;
