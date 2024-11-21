import React, { useContext} from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "@/constants/Styles";
import { ProfileContext } from "@/components/ProfileProvider";
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for location pin
import { Avatar } from 'react-native-elements';

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerAppTitle}>KnightBites</Text>
    </View>
  );
};

const HeaderRight = ({navigation}) => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
      <Icon name="user" size={30} color="#FFFFFF"/>
      </TouchableOpacity>
    </View>
  )
}

export { Header, HeaderRight };
