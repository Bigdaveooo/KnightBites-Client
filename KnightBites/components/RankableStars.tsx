import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for stars
import { useState, useEffect } from "react";

function recordRating(value: int) {
  // stub that will talk to the database in the future
}

export default function RankableStars({ size = 32, keeps = true, onPress = (val) => {}, foodRating = 0 }) {
  const stars = [];
  const [rating, setRating] = useState(foodRating);

  // moved in here so font size can be passed in
  const styles = StyleSheet.create({
    starContainer: {
      flexDirection: 'row',
    },
    star: {
      fontSize: size,
      color: '#FFD700', // gold color
      marginHorizontal: 2,
    },
  });

  // closure to make functions that set the ratings
  function rate(value: int) {
    return () => {
      if (keeps) {
        recordRating(value);
        setRating(value);
      }
      onPress(value);
    };
  }

  useEffect(() => {
    setRating(foodRating);
  }, [foodRating]);

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity key={i} onPress={rate(i)}>
        <Icon name={(i <= rating) ? "star" : "star-o"} style={styles.star} />
      </TouchableOpacity>
    );
  }

  return <View style={styles.starContainer}>{stars}</View>;
}

