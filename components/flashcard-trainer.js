import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, TouchableHighlight, TouchableWithoutFeedback, Pressable} from "react-native";
import {useMutation, useQuery} from "react-apollo";
import {getFlashcards, updateFlashcardMutation, deleteFlashcardMutation} from "./queries";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Stars from './stars';
import {useNavigation} from "@react-navigation/native";

const FlashcardTrainer = ({navigation}) => {
    let flashcardData = [];
    let numFlashcards = 0;
    let currentFlashcard;
    const [currentFlashcardNumber, setCurrentFlashcardNumber] = useState(1)
    const [isRevealed, setIsRevealed] = useState(false);
    const {loading, error, data } = useQuery(getFlashcards);
    const [updateFlashcard, { updateData }] = useMutation(updateFlashcardMutation);
    const [deleteFlashcard, { deleteData }] = useMutation(deleteFlashcardMutation);

    if (loading) return <View><Text>Loading...</Text></View>;
    if (error) return <View><Text>Error! {error.message}</Text></View>;
    if (data) {
        console.log("data");
        // console.log(data);
        flashcardData = [...data.flashcards];
        numFlashcards = data.flashcards.length;
        currentFlashcard = flashcardData[currentFlashcardNumber - 1];
    }

    const onPageForward = () => {
        console.log(currentFlashcardNumber);
        setIsRevealed(false);
        let nextCardNumber = currentFlashcardNumber + 1 <= flashcardData.length ? currentFlashcardNumber + 1 : 1;
        setCurrentFlashcardNumber(nextCardNumber);
    }

    const onSuccess = () => {
        if(currentFlashcard.levelLearned + 1 < 5) {
            updateFlashcard({
                variables: {
                    id: currentFlashcard.id,
                    isActive: true,
                    levelLearned: currentFlashcard.levelLearned + 1
                }
            });
            onPageForward();
        } else {
            deleteFlashcard({
                variables: {
                    id: currentFlashcard.id
                }
            });
            onPageForward();
        }
    }

    const onReveal = () => {
        setIsRevealed(true);
    }

    const setStars = (stars) => {
        // console.log(stars);
        // console.log(currentFlashcard);
        let levelLearned = stars.filter(star => star.isFilled === true).length;
        if(levelLearned < 5) {
            updateFlashcard({
                variables: {
                    id: currentFlashcard.id,
                    isActive: true,
                    levelLearned: levelLearned
                }
            });
        } else {
            deleteFlashcard({
                variables: {
                    id: currentFlashcard.id
                }
            });
            onPageForward();
        }
    }

    if(flashcardData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.word}>No flashcards found!</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.topBarContainer}>
                    <Text style={styles.topBarText}>Vocabulary Trainer</Text>
                </View>
                <View style={styles.pagingContainer}>
                    { numFlashcards > 0 && <Text>{currentFlashcardNumber} of {numFlashcards}</Text> }
                </View>
                <View style={styles.card}>
                    <Text style={styles.word}>{currentFlashcard.word}</Text>
                    <Text style={styles.lemma}>{currentFlashcard.lemma}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={[styles.correctButton, styles.button]} onPress={() => onSuccess()}>
                        <FontAwesome name="check" size={40} color="white" />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.incorrectButton, styles.button]} onPress={() => onPageForward()}>
                        <FontAwesome name="times" size={40} color="white" />
                    </TouchableHighlight>
                </View>
                <View style={styles.starsContainer}>
                    <Stars setStars={setStars} levelLearned={currentFlashcard.levelLearned} />
                </View>
                <View style={styles.card}>
                    {
                        isRevealed
                        ?   <View>
                                <Text style={styles.pos}>{currentFlashcard.pos}</Text>
                                <Text style={styles.parsing}>{currentFlashcard.parsing}</Text>
                                <Text style={styles.gloss}>{currentFlashcard.gloss}</Text>
                            </View>
                        :   <View>
                                <Text style={styles.pos}> </Text>
                                <Text style={styles.parsing}> </Text>
                                <Text style={styles.gloss}> </Text>
                            </View>
                    }
                    <TouchableHighlight style={styles.revealButton} onPress={() => onReveal()}>
                        <Text style={styles.revealText}>Reveal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    topBarContainer: {
        backgroundColor: "#1d78c1",
        display: "flex",
        flexDirection: "row",
        paddingTop: 50,
        justifyContent: "center",
        height: 100,
        width: "100%",
        padding: 20
    },
    topBarText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    pagingContainer: {
        marginTop: 40
    },
    pagingText: {

    },
    card: {
        width: "90%",
        height: 300,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        elevation: 5,
        margin: 20,
        padding: 20
    },
    frontCardText: {

    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        height: 60,
        width: 60,
        margin: 40,
        borderRadius: 60,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    correctButton: {
        backgroundColor: "green"
    },
    incorrectButton: {
        backgroundColor: "red"
    },
    buttonText: {
      color: "white"
    },
    textContainer: {
        marginTop: 30,
        flex: 1,
        alignItems: "center"
    },
    starsContainer: {
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
    word: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1d78c1"
    },
    lemma: {
        fontSize: 20,
        color: "#1d78c1"
    },
    pos: {
        margin: 5
    },
    parsing: {
        margin: 5
    },
    gloss: {
        margin: 5,
        fontStyle: "italic"
    },
    revealButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 80,
        backgroundColor: "#1d78c1",
        borderRadius: 4,
        marginTop: 10
    },
    revealText: {
        color: "white",
        fontSize: 20
    }
});

export default function(props) {
    const navigation = useNavigation();
    return <FlashcardTrainer {...props} navigation={navigation} />
}

//export default FlashcardTrainer;
