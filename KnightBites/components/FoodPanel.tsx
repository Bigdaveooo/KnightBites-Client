import {useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import StarRating from "@/components/StarRating";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodPage from "@/components/FoodPage";
import { Colors } from "@/constants/Colors";
import RankableStars from "./RankableStars";
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for location pin
import React from "react";

const Stack = createNativeStackNavigator();

export default function FoodPanel({navigation, dish}) {

  /*
    This component was just too hard to make a stylesheet for
    that would work on both mobile and web, so I just made two,
    and I choose between them based on the width of the component.
  */

  const [usingstyles, setStyles] = useState(styles_mobile);
  const [starSize, setStarSize] = useState(16);

  function chooseStyle(event) {
    if (event.nativeEvent.layout.width > 800) {
      setStyles(styles_web);
      setStarSize(32);
    } else {
      setStyles(styles_mobile);
      setStarSize(16);
    }
  }

  return (
    <View style={usingstyles.panel} onLayout={chooseStyle}>
      <View style={styles_web.individualFoodContainer}>
      <Image style={usingstyles.foodPicture} source={{uri: dish.img}}></Image>
      <View style={styles_web.text_container}>
      <Text style={usingstyles.name}>{dish.foodname}</Text>
      <View style={styles_web.location_container}>
      <Icon name={"map-marker"} style={usingstyles.location_pin} />
      <Text style={usingstyles.locationText}> {dish.dininghall}</Text>
      </View>
      <RankableStars style={{color: "black"}} size={starSize} keeps={false} onPress={(val) => navigation.navigate("foodPage", {dish, review: val})}></RankableStars>
      </View>
  </View>
      
    </View>
    
  )
}

/*
        <View style={usingstyles.rating}>
          <StarRating foodRating={dish.rating} size={starSize}></StarRating>
          <Text style={usingstyles.ratingNum}>{dish.rating.toFixed(1)}</Text>
      </View>
*/

const styles_web = StyleSheet.create({

  individualFoodContainer: {
    flexDirection: 'row', // Align content horizontally
    backgroundColor: 'white', // White card background
    marginRight: 10, // Space between cards
    borderRadius: 10,
    padding: 10,
    width: '100%', // Card width
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    marginBottom: 5
  },

  foodPicture: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular image
    marginRight: 10, // Space between image and details
  },

  text_container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },

  location_container: {
    flexDirection: 'row',
    marginBottom: 7,
    alignContent: 'center'
  },

  name: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 5,
    flex: 1,
    flexWrap: 'wrap'
  },
  panel: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 4,
    width: "100%",

  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNum: {
    fontSize: 30,
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
  },
  location: {
    margin: 10,
    right: 10,
    top: 0,
  },
  locationText: {
    fontSize: 32,
  },
  location_pin: {
    fontSize: 40,
    marginLeft: 10,
  },
  leave_review: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    bottom: 0,
  },
  leave_review_text: {
    fontSize: 20,
  },
  spacer: {
    height: 0,
  }
});



const styles_mobile = StyleSheet.create({
  picture: {
    width: 200,
    aspectRatio: 1,
    height: 200,
    borderRadius: 10,
    margin: 5,
    flex: 1,
  },
  foodPicture: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular image
    marginRight: 10, // Space between image and details
  },
  name: {
    fontSize: 20,
    flex: 1,
  },
  description: {
    flex: 2,
    fontSize: 10,
  },

  information: {
    flexDirection: "column",
    height: "90%",
    margin: 10,
    flex: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNum: {
    fontSize: 14,
    marginLeft: 10,
    color: "black",
  },
  location: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    top: 0,
  },
  locationText: {
    fontSize: 16,
  },
  location_pin: {
    fontSize: 20,
    marginLeft: 10,
  },
  leave_review: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    bottom: 0,
  },
  leave_review_text: {
    fontSize: 10,
  },
  spacer: {
    height: 30,
    backgroundColor: "transparent",
  }
});
