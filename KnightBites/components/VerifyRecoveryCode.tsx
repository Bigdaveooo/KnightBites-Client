import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import styles from '@/constants/Styles';


// NOT IN WORKING STATE
async function sendRecoveryEmail(subject: string, body: string, to: string): Promise<void> {
    const linkingURL = `mailto:${to}?` + new URLSearchParams({
        subject,
        body,
        from: "knightbites@example.com"
    });



    const canOpen = await Linking.canOpenURL(linkingURL);
    if (!canOpen)
        throw new Error("Cannot open provided URL for email sending");
    return Linking.openURL(linkingURL);
}

function validatePassword(ps1: string, ps2: string): boolean {
    return (
        ps1 === ps2 // passwords must match
        && ps1.length >= 8 // password must be >= 8 characters
    )
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


function registerAccount(username: string, password: string) {
    // hit db here
}

export default function RegistrationPage({navigation}) {

    const [ email, setEmail ] = useState("");
    const [ ps1, setPs1 ] = useState("");
    const [ ps2, setPs2 ] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, allowPasswordVisible] = useState(false);


    return (
        <View style = {{alignItems: "center"}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 20 }}>Recover Your Account </Text>
        <Text> We'll send you a recovery code to reset your username or password. </Text>
        <TextInput
          style={[styles.loginTextBar, isFocused && styles.loginTextBarHover, {marginTop: 15, marginBottom: 15}]}
          value={email}
          onChangeText={setEmail} // When the user types, it sets the email
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your email"
        />

  
    <TouchableOpacity
      onPress={() => {
        if (!email || !isValidEmail(email)) {
          Alert.alert('Invalid Email', 'Please enter a valid recovery email.');
        } else {
          // IN PROGRESS: The body should be a function as well. 
          sendRecoveryEmail("Recover Your KnightBites Account", "Here is your recovery code: ", email);
        }
      }}
    >
      <Text style={styles.submitRegistrationButton}>Send Email</Text>
</TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style = {{marginTop: 15, color: "blue"}}>Remember your credentials? Login here.</Text></TouchableOpacity>

      </View>
    );
  };
