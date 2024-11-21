import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function SecureTextInput({ value, onChangeText=(val) => {}, placeholder="Password" }) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={{flexDirection: "row"}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={hidden}
        placeholder={placeholder}
      />
      <TouchableOpacity onPress={() => setHidden(!hidden)}>
        <Icon name={hidden ? "eye-slash" : "eye"} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    margin: 10,
    width: 255,
  },
  icon: {
    marginTop: 10,
    fontSize: 24,
    color: "black",
  },
});