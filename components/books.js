import React from "react";
import {Pressable, StyleSheet, Text, ScrollView, View, FlatList} from "react-native";
import {useQuery} from "react-apollo";
import {getBooksQuery} from "./queries";

const Books = ({ navigation }) => {
    let books = [];
    const {loading, error, data } = useQuery(getBooksQuery);

    const onBookSelect = (item) => {
        navigation.navigate('Chapters', {
            bookId: item.bookId,
            bookName: item.bookName,
            numChapters: item.numChapters,
        });
    }

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;

    const Book = ({item}) =>  (
        <Pressable style={styles.book} onPress={() => onBookSelect(item)} >
            <Text style={styles.bookText}>{item.bookName} </Text>
            <Text> > </Text>
        </Pressable>
    );

    if(data) {
        // console.log(data);
       return (
           <FlatList
               data={data.books}
               renderItem={Book}
               keyExtractor={book => book.bookId}
           />
       )
    }
}

const styles = StyleSheet.create({
    booksContainer: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        flexWrap: "wrap"
    },
    book: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        backgroundColor: "#DDDDDD",
        padding: 5,
    },
    bookText: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 15
    }
});

export default Books;
