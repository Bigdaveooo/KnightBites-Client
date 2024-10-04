import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for stars
import { useState, useEffect } from "react";

export default function StarRating({ foodRating }) {
  const stars = [];
  const [rating, setRating] = useState(foodRating);

  useEffect(() => {
    setRating(foodRating);
  }, [foodRating]);

  // Loop over 5 stars
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // full star
      stars.push(<Icon key={i} name="star" style={styles.star} />);
    } else if (i - 0.5 === rating) {
      // half star, only one can exist in a rating, so if the rating 
      // is 0.5 less than the current start (i) we're on, only fill it half way
      stars.push(<Icon key={i} name="star-half-o" style={styles.star} />);
    } else {
      // empty star
      stars.push(<Icon key={i} name="star-o" style={styles.star} />);
    }
  }

  return <View style={styles.starContainer}>{stars}</View>;
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 32,
    color: '#FFD700', // gold color
    marginHorizontal: 2,
  },
});
