import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import styles from '@/constants/Styles';

export default function UserAccountPage({navigation}) {

    const [ email, setEmail ] = useState("");
    const [ ps1, setPs1 ] = useState("");
    const [ ps2, setPs2 ] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, allowPasswordVisible] = useState(false);


    return (
        <View style = {{alignItems: "center"}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 20 }}>Your Account </Text>
        <Text style = {{marginLeft: 25, marginRight: 25, textAlign: 'center'}}> Your Account Information</Text>
        <TextInput
          style={[styles.loginTextBar, isFocused && styles.loginTextBarHover, {marginTop: 15, marginBottom: 15}]}
          value={email}
          onChangeText={setEmail} // When the user types, it sets the email
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your email"
        />

  
    <TouchableOpacity style = {styles.submitRegistrationButton}
      onPress={() => {
        if (!email || !isValidEmail(email)) {
          Alert.alert('Invalid Email', 'Please enter a valid recovery email.');
        } else {
          // IN PROGRESS: The body should be a function as well. 
          sendRecoveryEmail("Recover Your KnightBites Account", "Here is your recovery code: ", email);
        }
      }}
    >
      <Text>Send Email</Text>
</TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style = {{marginTop: 15, color: "blue"}}>Remember your credentials? Login here.</Text></TouchableOpacity>

      </View>
    );
  };


