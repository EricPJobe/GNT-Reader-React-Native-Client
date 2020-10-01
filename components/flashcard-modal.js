import React, {useState} from "react";
import { Modal, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import {useMutation} from "react-apollo";
import {createFlashcardMutation} from "./queries";
// import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";

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

    const [createFlashcard, {mutationData}] = useMutation(createFlashcardMutation);

    const onStarPress = (star) => {
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
        createFlashcard({
            variables: {
                pos: props.word.pos,
                parsing: props.word.parsing,
                word: props.word.word,
                lemma: props.word.lemma,
                gloss: props.word.gloss,
                isActive: true,
                levelLearned: star.level
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
                                                {/*{<FontAwesomeIcon icon={faStar} size={30} color={"#1d78c1"}/>}*/}
                                                <Text>U</Text>
                                            </TouchableWithoutFeedback>
                                        )
                                    }
                                    else {
                                        return (
                                            <TouchableWithoutFeedback key={star.level} onPress={() => onStarPress(star)} style={styles.star}>
                                                {/*<FontAwesomeIcon icon={outlineStar} size={30} color={"#1d78c1"} />*/}
                                                <Text>F</Text>
                                            </TouchableWithoutFeedback>
                                        )
                                    }
                                })
                            }
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
        width: 300,
        height: 300,
        marginVertical: 20,
        marginHorizontal: 0,
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
        flex: 1
    },
    star: {
        flex: 1,
        padding: 20
    }
});

export default FlashcardModal
