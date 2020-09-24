import React from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";
import Item from "./item";

const ChapterModal = (props) => {
    let chapters = [];
    console.log(props.numChapters);
    for(let i=props.startingChapter; i<=props.numChapters; i++)
        chapters.push(i.toString());

    if(!props.visible)
        return null;

    const RenderChapter = ({item}) => {
        return <Item item={item} onPress={() => props.onSelect(item)} />
    }

    return (
        <View style={styles.modalContainer}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={props.visible}>
                <View style={styles.modalView}>
                    <FlatList
                        data={chapters}
                        renderItem={RenderChapter}
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

export default ChapterModal
