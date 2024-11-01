import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, TextInput, Pressable, ActivityIndicator} from 'react-native';
import FoodPanel from '@/components/FoodPanel';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, HeaderRight } from '@/components/Header';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '@/constants/Styles';
import Dish from "@/interfaces/Dish";

////////
// Pages
////
import FoodPage from "@/components/FoodPage";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegistrationPage";
////////

const Stack = createNativeStackNavigator();

export default function EntryPoint() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerTitle: props => <Header />,
        headerStyle: {
          backgroundColor: "#880015",
          height: 70,
        },
        headerRight: props => <HeaderRight />,
      }}
    >
      <Stack.Screen name="home" component={HomePage}
        options={{headerLeft: props => {}}} // to get rid of button going back to login page
      />
      <Stack.Screen name="foodPage" component={FoodPage} 
        initialParams={
          {dish: {name: "Yummy", desc:"cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400'}}
        }
      />
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="registration" component={RegisterPage} />

    </Stack.Navigator>
  )
 }

function HomePage({navigation}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [restaurant, setRestaurant] = useState(-1);
  const [items, setItems] = useState([
    { label: 'Everywhere', value: -1 },
    { label: 'Commons Dining Hall', value: "Commons" },
    { label: 'Knollcrest Dining Hall', value: "Knollcrest" },
    { label: 'Johnny\'s Cafe', value: "Johnnys" },
    { label: 'Peet\'s Coffee', value: "Peets" },
    { label: 'UpperCrust', value: "UpperCrust" },
  ]);
  const [dishData, setDishData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getDishData = async () => {
    try {
      const resp = await fetch(
        "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/diningfood"
      );
      const json = await resp.json();
      setDishData(json.map(dish => ({rating: Math.round(Math.random() * 10) / 2, ...dish}))); // add rating to dish
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getDishData();
  }, []);

  const defaultDishData: Dish[] = [{
    foodname: 'No Dish Found',
    description: 'Try a different search',
    rating: 0,
    dininghall: "",
    img: 'https://via.placeholder.com/200',
  }]

  const getFilteredDishData = (): Dish[] => {
    // do any wrangling of the data
    const filtered = dishData.filter(dish => (
      (restaurant == -1 || dish.dininghall == restaurant) &&
      (dish.foodname.toLowerCase().includes(search.toLowerCase()))
    ));

    return (filtered.length == 0 ? defaultDishData : filtered);
  };

  return (
    <View style={styles.container}>
      {/* Header handled by stack navigator*/}

      {/* Main content */}
      <View style={styles.mainContainer}>
        {/* Dropdown Menu */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
            <TextInput 
              placeholder="Search for a dish"
              onChangeText={setSearch}
              value={search}
              style={styles.searchBar}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={restaurant}
              items={items}
              setOpen={setOpen}
              setValue={setRestaurant}
              setItems={setItems}
              placeholder="Everywhere"
              textStyle={styles.dropdown} // Apply styles to the dropdown text
              containerStyle={styles.dropdown} // Apply styles to the dropdown
              style={styles.dropdown} // Apply styles to the dropdown
              dropDownContainerStyle={styles.dropdownList} // Styles for the dropdown list
              listItemContainerStyle={styles.dropdownListItem} // Styles for the dropdown list
              listItemLabelStyle={styles.dropdownListItem} // Styles for the dropdown list
            />
          </View>
        </View>

        <View style={styles.feedContainer}>
          {loading ? (<ActivityIndicator />) : (
            <FlatList
              data={getFilteredDishData()}
              style={styles.feed}
              renderItem={({ item }) => (
                <Pressable onPress={() => navigation.navigate("foodPage", {dish: item, review: 0})}>
                  <FoodPanel
                    navigation={navigation}
                    dish={item}
                  />
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

// styles in constants/Styles.ts
