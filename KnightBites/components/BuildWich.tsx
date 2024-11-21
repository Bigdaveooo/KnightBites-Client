import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';


export default function buildSandwich({navigation}) {

    const [ email, setEmail ] = useState("");
    const [ ps1, setPs1 ] = useState("");
    const [ ps2, setPs2 ] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, allowPasswordVisible] = useState(false);


    return (
      <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40 }}>Build-A-Wich</Text>

        <Text>Build your personal UpperCrust order and share with creation with everyone!</Text>

        <Text>Step 1: Pick your bread</Text>
        <Text>Step 2: Pick your protein</Text>
        <Text>Step 3: Pick your cheese</Text>
        <Text>Step 4: Pick your veggies</Text>
        <Text>Step 5: Pick your condiments</Text>

        <TouchableOpacity >Submit My Creation</TouchableOpacity>

      </View>
    );
  };
