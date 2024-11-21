import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, ActivityIndicator,
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
const md5 = require("md5");

export default function RegistrationPage({navigation}) {

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ ps1, setPs1 ] = useState("");
    const [ ps2, setPs2 ] = useState("");
    const [ isFocused, setIsFocused ] = useState(false);
    const [ isPasswordVisible, allowPasswordVisible ] = useState(false);
    const [ vegan, setVegan ] = useState(false)
    const [ vegetarian, setVegetarian ] = useState(false);
    const [ halal, setHalal ] = useState(false);
    const [ selected, setSelected ] = useState({ vegan: false, vegetarian: false, halal: false });
    const [ loading, setLoading ] = useState(false);
    const [ formErrors, setFormErrors ] = useState([]);

    const handleSelect = (type) => {
        setSelected((prevSelected) => ({
          ...prevSelected,
          [type]: !prevSelected[type], // Toggle selection for the chosen type
        }));
    };

    function validateForm(): boolean {
        let errors = []; // accumulate errors here

        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)))
            errors.push("Invalid email address")
        
        if (ps1 !== ps2)
            errors.push("Passwords must match")

        if (ps1.length < 8)
            errors.push("Password must be at least 8 characters")

        setFormErrors(errors);
        return errors.length === 0
    }

    async function registerAccount(passed: Function, failed: Function, final: Function): Promise<void> {
        try {
          const resp = await fetch(
            "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                username,
                password: md5(ps1),
                vegan,
                vegetarian,
                halal,
              })
            }
          );
          if (!resp.ok) throw `Bad response: Error ${resp.status}`;

          const json = await resp.json();
          console.log("new id:", json.id);
          passed(json);
        } catch (err) {
          console.error(err);
          failed(err);
        } finally {
          final();
        }
    }

    return (
      <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 20, fontWeight:'bold' }}>Register Your Account </Text>
        <TextInput
          style={[styles.loginTextBar, isFocused && styles.loginTextBarHover]}
          value={email}
          onChangeText={setEmail} // When the user types, it sets the username
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your email"
          placeholderTextColor="black"

        />
      
        <View>
            <TextInput
            style={styles.loginTextBar}
            value={username}
            onChangeText={setUsername}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter a username"
            placeholderTextColor="black"
            />
        </View>
  
        <View>
          <TextInput
            style={styles.loginTextBar}
            value={ps1}
            onChangeText={setPs1}
            secureTextEntry={!isPasswordVisible} 
            placeholder="Enter a password"
            placeholderTextColor="black"

          />

          <TextInput
            style={styles.loginTextBar}
            value={ps2}
            onChangeText={setPs2}
            secureTextEntry={!isPasswordVisible}  
            placeholder="Confirm password"
            placeholderTextColor="black"

          />

          <TouchableOpacity onPress={() => allowPasswordVisible(!isPasswordVisible)}>
            <Text style={[styles.toggleText, {alignItems: "center", textAlign: "center", marginTop: 3, marginBottom: 20, textDecorationLine: 'underline' }]}>
              {isPasswordVisible ? 'Hide Password' : 'Show Password'} 
            </Text>
          </TouchableOpacity>

        </View>

        <Text> Please select your dietary restrictions:</Text>

        <View style = {styles.dietaryRestrictionContainer}>
          <TouchableOpacity
            style={[styles.dietaryRestrictionButton, selected.vegan && styles.dietaryRestrictionButtonSelection]}
            onPress={() => { handleSelect('vegan'); setVegan(!vegan); }}
          >
            <Text>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dietaryRestrictionButton, selected.vegetarian && styles.dietaryRestrictionButtonSelection]}
            onPress={() => { handleSelect('vegetarian'); setVegetarian(!vegetarian); }}
          >
            <Text>Vegetarian</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dietaryRestrictionButton, selected.halal && styles.dietaryRestrictionButtonSelection]}
            onPress={() => { handleSelect('halal'); setHalal(!halal); }}
          >
            <Text>Halal</Text>
          </TouchableOpacity>

        </View>
  
        <TouchableOpacity style = {styles.submitRegistrationButton}
          onPress={() => {
            if (validateForm(ps1, ps2)) {
              setLoading(true);
              registerAccount(
                passed = (data) => navigation.navigate("login"),
                failed = (err) => alert("Error creating account!\n" +  err),
                final = () => setLoading(false))
            }
          }}
        >
          <Text style = {styles.submitText}>Register</Text>
        </TouchableOpacity>
        <View style={registrationStyles.errorMessageContainer}>
            { formErrors.map((msg, idx) => <Text key={idx} style={registrationStyles.errorMessage}>{ msg }</Text>) }
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style = {{marginTop: 15, marginBottom: 15, color: "blue"}}>Already have an account? Login here.</Text></TouchableOpacity>
        { loading && <ActivityIndicator /> }
      </View>
    );
  };

const registrationStyles = StyleSheet.create({
    errorMessage: {
        color: "red",
    },
    errorMessageContainer: {
        marginTop: 15,
    },
});
