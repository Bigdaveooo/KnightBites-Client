import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, 
         TextInput, Pressable, ActivityIndicator, Alert,
       } from 'react-native';
import FoodPanel from '@/components/FoodPanel';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, HeaderRight } from '@/components/Header';
import { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '@/constants/Styles';
import Dish from "@/interfaces/Dish";
import { ProfileProvider } from "@/components/ProfileProvider";
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ProfileContext } from "@/components/ProfileProvider";


////////
// Pages
////
import FoodPage from "@/components/FoodPage";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegistrationPage";
import RecoverPage from "@/components/RecoverAccountPage";
import buildSandwich from "@/components/BuildWich";
import buildSandwichHomePage from "@/components/BuildWichHome";
import ProfilePage from "@/components/ProfilePage";

const Stack = createNativeStackNavigator();

export default function EntryPoint() {
  return (
    <ProfileProvider>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={({ navigation }) => ({
          headerTitle: props => <Header />,
          headerStyle: {
            backgroundColor: "maroon",
          },
          headerRight: props => <HeaderRight navigation={navigation} />,
        })}
      >
        <Stack.Screen name="home" component={HomePage}
          options={{ headerLeft: props => { } }} // to get rid of button going back to login page
        />
        <Stack.Screen name="foodPage" component={FoodPage}
          initialParams={
            { dish: { name: "Yummy", desc: "cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400' } }
          }
        />
        <Stack.Screen name="login" component={LoginPage}
          options={{ headerLeft: props => { } }} />
        <Stack.Screen name="registration" component={RegisterPage}
          options={{ headerLeft: props => { } }} />
        <Stack.Screen name="recovery" component={RecoverPage}
          options={{ headerLeft: props => { } }} />
        <Stack.Screen name="buildSandwichHomePage" component={buildSandwichHomePage}
          options={{ headerLeft: props => { } }} />
        <Stack.Screen name="buildSandwich" component={buildSandwich} />
        <Stack.Screen name="profile" component = {ProfilePage} />

      </Stack.Navigator>
    </ProfileProvider>
  )
}

function HomePage({ navigation }) {

  // first things first, make sure the user is logged in to see this page
  const { profile } = useContext(ProfileContext);
  if (!profile.loggedIn) {
      navigation.navigate("login");
      // the return makes this final to react, otherwise it will try (and non-gracefully fail) to do all the stuff below
      return;
  }

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [restaurant, setRestaurant] = useState(-1);
  const [items, setItems] = useState([
    { label: 'All Dining Halls', value: -1 },
    { label: 'Commons Dining Hall', value: "Commons" },
    { label: 'Knollcrest Dining Hall', value: "Knollcrest" },
    { label: 'Johnny\'s', value: "Johnny\'s" },
    { label: 'Peet\'s Coffee', value: "Peets" },
    { label: 'UpperCrust', value: "UpperCrust" },
  ]);
  const [dishData, setDishData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDishData = async () => {
    try {
      const resp = await fetch(
        "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/dish"
      );
      const json = await resp.json();
      setDishData(json.map(dish => ({
        ...dish,
        rating: dish.overallrating || Math.round(Math.random() * 10) / 2,
        img: "https://placehold.co/200", // TODO: find a way to fetch images from the database... force them to the right size.
      }))); // add rating to dish
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
    img: 'https://placehold.co/200',
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
              style={[styles.searchBar, { color: 'black', fontStyle: 'italic', fontSize: 14 }]}
              placeholderTextColor="black"
            />
            <Icon
              name="filter-outline" // Icon name from Ionicons
              size={24} // Icon size
              color="black" // Icon color
              style = {styles.filterIcon}
            />
          </View>
        </View>

        <View style={styles.feedContainer}>
          {loading ? (<ActivityIndicator />) : (
            <FlatList
              data={getFilteredDishData()}
              style={styles.feed}
              renderItem={({ item }) => (
                <Pressable onPress={() => navigation.navigate("foodPage", { dish: item, review: 0 })}>
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
