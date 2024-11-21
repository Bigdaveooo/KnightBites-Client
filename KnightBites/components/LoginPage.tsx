import { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Animated, ActivityIndicator
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { ProfileContext } from "@/components/ProfileProvider";
import { Profile } from '@/interfaces/Profile';
const mp5 = require("md5");


export default function LoginPage({navigation}) {

  const [ username, setUsername ] = useState("");
  const [ pass, setPass ] = useState("");
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isPasswordVisible, allowPasswordVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const { profile, setProfile } = useContext(ProfileContext);

  // Function hits database and checks if the user exists
  // password is hashed and checked against hashed password in db
  async function validateAccount(username: string, password: string): Promise<Object> {
    const hashedPassword = mp5(password);

    try {
      const resp = await fetch(
        "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/user/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username,hashedPassword,}),
        }
      );
      if (!resp.ok) throw `Bad response for log in: ${resp.status}`;

      const json = await resp.json();
      return json;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
      <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40, fontWeight:'bold' }}>Log In </Text>
      <TextInput
        style={[styles.loginTextBar, isFocused && styles.loginTextBarHover] }
        value={username}
        onChangeText={setUsername} // When the user types, it sets the username
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Enter your username"
        placeholderTextColor="black"
            />

      <View>
        <TextInput
          style={styles.loginTextBar}
          value={pass}
          onChangeText={setPass}
          secureTextEntry={!isPasswordVisible} 
          placeholder="Enter your password"
          placeholderTextColor="black"
        />
        <TouchableOpacity onPress={() => allowPasswordVisible(!isPasswordVisible)}>
          <Text style={[styles.toggleText, {alignItems: "center", textAlign: "center", marginTop: 3, marginBottom: 20, textDecorationLine: 'underline' }]}>
            {isPasswordVisible ? 'Hide Password' : 'Show Password'} 
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style = {styles.submitRegistrationButton}
        onPress={() => {
          setLoading(true);
          validateAccount(username, pass)
            .then(data => {
              if (data.valid) {
                const user: Profile = {
                  username: data.userData.username,
                  pref_name: data.userData.username,
                  email: data.userData.email,
                  restrictions: {
                    halal: data.userData.halalrestriction,
                    vegan: data.userData.veganrestriction,
                    vegetarian: data.userData.vegetarianrestriction,
                  },
                  loggedIn: true,
                };
                setProfile(user);
                navigation.navigate("home");
              } else {
                alert('Your username or password is incorrect. Try again.');
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        <Text style = {styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("registration")}><Text style = {{marginTop: 15, color: "blue"}}>Don't have an account? Register here.</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("recovery")}><Text style = {{marginTop: 15, color: "blue"}}>Forgot your password? Recover account here.</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("buildSandwichHomePage")}><Text style = {{marginTop: 15, color: "blue"}}>View Uppercrust.</Text></TouchableOpacity>
      { loading && <ActivityIndicator /> }
    </View>
  );
};
