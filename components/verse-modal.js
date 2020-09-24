import React from "react";
import {FlatList, Modal, StyleSheet, Text, View} from "react-native";
import Item from "./item";
import {useQuery} from "react-apollo";
import {getVersesQuery} from "./queries";

const VerseModal = (props) => {

    const {loading, error, data } = useQuery(getVersesQuery, {
        variables: {
            bookNumber: parseInt(props.bookNumber),
            chapterNumber: parseInt(props.chapterNumber)
        }
    });

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;

    console.log(data)

    console.log(props);
    if(!props.visible)
        return null;

    let verses = [];

    if(data) {
        for(let i=props.startingVerse; i<=data.chapter.numVerses; i++)
            verses.push(i.toString());
        console.log(verses);
    }


    const RenderVerse = ({item}) => {
        return <Item item={item} onPress={() => props.onSelect(item)} />
    }

    return (
        <View style={styles.modalContainer}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={props.visible}
                onRequestClose={() => {
                }}>
                <View style={styles.modalView}>
                    <FlatList
                        data={verses}
                        renderItem={RenderVerse}
                        keyExtractor={item => item}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginVertical: 20,
        marginHorizontal: 0,
        backgroundColor: "white",
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalContainer: {

    }
});

export default VerseModal
