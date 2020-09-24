import React from "react";
import {FlatList, Modal, StyleSheet, Text, View} from "react-native";
import { Query } from "react-apollo";
import Item from "./item";
import {getBooksQuery} from "./queries";

const BookModal = (props) => {
    if(!props.visible)
        return null;

    const RenderBook = ({item}) => {
        return <Item item={item.bookName} onPress={() => props.onSelect(item)} />
    }

    return (
        <Query query={getBooksQuery}>
            {
                ({data, loading, error}) => {
                    if (loading) return <View><Text>Loading...</Text></View>
                    if (error) return <View><Text>error.message</Text></View>

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
                                    data={data.books}
                                    renderItem={RenderBook}
                                    keyExtractor={item => item.bookId}
                                />
                            </View>
                        </Modal>
                    </View>
                    )
                }
            }
        </Query>
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
        // width: '100%',
        // padding: 35,
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

export default BookModal
