import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback, TouchableHighlight} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const Stars = (props) => {
    const [stars, setStars] = useState(
        [
            {name: "star1", level: 1, isFilled: props.levelLearned >= 1},
            {name: "star2", level: 2, isFilled: props.levelLearned >= 2},
            {name: "star3", level: 3, isFilled: props.levelLearned >= 3},
            {name: "star4", level: 4, isFilled: props.levelLearned >= 4},
            {name: "star5", level: 5, isFilled: false},
        ]
    );

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
            props.setStars(stars);
        } else {
            stars.map(st => {
                if(st.level > star.level)
                    st.isFilled = false;
                // console.log(st);
            });
            const newStars = [...stars];
            //  console.log(newStars);
            setStars(newStars);
            props.setStars(stars);
        }
    }

    return (
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
    );
}

const styles = StyleSheet.create({
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
    }
});

export default Stars;
