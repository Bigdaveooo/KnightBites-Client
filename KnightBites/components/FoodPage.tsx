import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { MainStyles } from "@/constants/Styles";
import Dish from "@/interfaces/Dish";
import StarRating from "@/components/StarRating";
import RankableStars from "@/components/RankableStars";
import { Colors } from "@/constants/Colors";

function translateCafeteria(value: number) {
  switch(value) {
    case(-1):
      return "Everywhere";
    case(0):
      return "Commons";
    case(1):
      return "Knollcrest";
    case(2):
      return "Johnny's";
    case(3):
      return "Peet's";
    case(4):
      return "Upper Crust";
  }
}

function recordComment(comment: String) {
  // this will talk to the database in the future
}

// example usage:
// <FoodPage dish={{name: "Yummy", desc:"cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400'}} />
export default function FoodPage({route, navigation}) {
  const {dish, review} = route.params; // extract dish from route params

  return (
    
    <View style={styles.mainView}>
      <View style={styles.infoSection}>
        <View style={styles.headerInfo}>
          <Image style={styles.image} source={{uri: dish.img}} />
          <View style={styles.nameAndRating}>
            <Text style={styles.name}>{dish.foodname}</Text>
            <StarRating foodRating={dish.rating}></StarRating>
          </View>
        </View>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.locations}>Location: {dish.dininghall}</Text>
      </View>
      <View style={styles.yourRating}>
        <Text>Your Rating: </Text>
        <RankableStars foodRating={review}/>
      </View>
      <View style={styles.yourComment}>
        <Text>Your Comment: </Text>
        <TextInput onChangeText={recordComment} style={styles.commentEntry} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "lightgrey",
  },
  infoSection: {
    backgroundColor: "lightgrey",
    padding: 15,
  },
  headerInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  name: {
    fontSize: 48,
  },
  description: {
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  locations: {
    fontSize: 24,
  },
  yourRating: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  yourComment: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 15
  },
  commentEntry: {
    backgroundColor: "white",
    borderWidth: 2,
    minWidth: 200,
    borderRadius: 200
  },
});
