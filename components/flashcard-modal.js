import React, {useState, useEffect} from "react";
import {Modal, StyleSheet, View, Text, TouchableWithoutFeedback, TouchableHighlight} from "react-native";
import {useMutation} from "react-apollo";
import {createFlashcardMutation} from "./queries";
import { FontAwesome } from '@expo/vector-icons';

const FlashcardModal = (props) => {
    const [stars, setStars] = useState(
         [
            {name: "star1", level: 1, isFilled: false},
            {name: "star2", level: 2, isFilled: false},
            {name: "star3", level: 3, isFilled: false},
            {name: "star4", level: 4, isFilled: false},
            {name: "star5", level: 5, isFilled: false},
        ]
    );
    console.log(props);

    useEffect(() => {
        console.log("useEffect");
        stars.forEach(star => star.isFilled = false);
        const newStars = [...stars];
        setStars(newStars);
    }, [props]);

    const [createFlashcard, {mutationData}] = useMutation(createFlashcardMutation);

    const onStarPress = (star) => {
        stars.forEach(star => star.isFilled = false);
        if(!star.isFilled) {
            stars.map(st => {
                if(st.level <= star.level)
                    st.isFilled = true;
               // console.log(st);
            });
            const newStars = [...stars];
          //  console.log(newStars);
            setStars(newStars);
        }
    }

    const onSubmit = () => {
        let level = 0;
        stars.forEach(star => {
            if(star.isFilled)
                level = star.level;
        });
        console.log(props);
        createFlashcard({
            variables: {
                pos: props.word.pos,
                parsing: props.word.parsing,
                word: props.word.word,
                lemma: props.word.lemma,
                gloss: props.word.gloss,
                isActive: true,
                levelLearned: level
            }
        })
        props.onSelectLevel();
    }

    return (
        <View style={styles.modalContainer}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={props.visible}>
                <View style={{flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={styles.modalView}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>How well do you know {props.word.word}?</Text>
                        </View>
                        <View style={styles.starContainer}>
                            {
                                stars.map((star, i) => {
                                    if(!star.isFilled) {
                                        return (
                                            <TouchableWithoutFeedback key={star.level} onPress={() => onStarPress(star)} style={styles.star}>
                                                <FontAwesome name="star-o" size={30} color="#1d78c1" />
                                            </TouchableWithoutFeedback>
                                        )
                                    }
                                    else {
                                        return (
                                            <TouchableWithoutFeedback key={star.level} onPress={() => onStarPress(star)} style={styles.star}>
                                                <FontAwesome name="star" size={30} color="#1d78c1" />
                                            </TouchableWithoutFeedback>
                                        )
                                    }
                                })
                            }
                        </View>
                        <View style={styles.submitContainer}>
                            <TouchableHighlight style={styles.submit} onPress={() => onSubmit()}>
                                <View><Text style={styles.touchableText}>Create Flashcard</Text></View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: "90%",
        height: 300,
        marginVertical: 20,
        marginHorizontal: 0,
        padding: 10,
        backgroundColor: "white",
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textContainer: {
        marginTop: 30,
        flex: 1,
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        color: "#1d78c1"
    },
    starContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1
    },
    star: {
        flex: 1,
        padding: 20
    },
    submitContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    submit: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: 150,
        margin: 10,
        backgroundColor: "#1d78c1",
        borderRadius: 10,
    },
    touchableText: {
        color: "white",
        fontWeight: "bold"
    }
});

export default FlashcardModal
