import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { validatePathConfig } from '@react-navigation/native';
import { Colors } from "@/constants/Colors";
import { ProfileContext, defaultProfile } from "@/components/ProfileProvider";
import SecureTextInput from "@/components/SecureTextInput";
import { warmUpAsync } from 'expo-web-browser';


const ProfilePage = ({navigation})=> {
  const {profile, setProfile} = useContext(ProfileContext);
  const [savedPrefName, setSavedPrefName] = useState(profile.pref_name);
  const [editingName, setEditingName] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingSettings, setChangingSettings] = useState(false);
  const [warning, setWarning] = useState("");

  // for password popup
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const initPasswordPopop = () => {
    setOldPassword("");
    setNewPassword("");
    setConfNewPassword("");
    setWarning("");
    setChangingPassword(true);
  }
  const checkPassword = (password: string) => {
    return true;
  }
  const updatePwassword = (password: string) => {

  }

  // for email popup
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); //not the real code, just the user's entry
  const initEmailPopop = () => {
    setNewEmail("");
    setChangingEmail(true);
    setWarning("");
  }
  const sendEmail = () => {
    // send email (and generate code server side - if its stored locally, it can probably be hacked)
  }
  const checkVerificationCode = (code: string) => {
    // send 'code' to the server so it can check against the code it generated
    // (maybe also needs to be encrypted? idk - doubt we'll be docked points for it if not tho lol)
    return true;
  }

  // TODO: probably make these sync changes with service at some point
  const editProfile = (key: string, value: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: value
    }));
  };

  const editProfileRestriction = (restriction: string, value: boolean) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      restrictions: {
        ...prevProfile.restrictions,
        [restriction]: value,
      },
    }));
  };

  // For logout button
  const handleLogout = () => {
    setProfile(defaultProfile);
    // Reset the navigation stack to the login screen
    navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {profile.pref_name}!</Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={[styles.option, styles.sectionSpacing]}>
            <Text style={styles.optionLabel}>Preferred Name:</Text>
            <View>
                {(editingName) ?
                    <TextInput
                        style={styles.optionInput}
                        value={profile.pref_name}
                        onChangeText={(val) => editProfile("pref_name", val.substring(0,20))} // Limit to 20 characters
                        onSubmitEditing={() => {
                          if (profile.pref_name.replace(/\W/g, "").length == 0) {
                            editProfile("pref_name", savedPrefName)
                          }
                          setEditingName(false)
                        }}
                    /> :
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.optionValue}>{profile.pref_name}</Text>
                        <TouchableOpacity onPress={() => {setSavedPrefName(profile.pref_name); setEditingName(true)}}>
                            <Icon name="pencil" style={styles.editButton}/>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>

        <View style={[styles.option, styles.sectionSpacing]}>
            <TouchableOpacity style={styles.optionButton} onPress={initPasswordPopop}>
                <Text style={styles.optionLabel}>Change Password</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.option, styles.sectionSpacing]}>
            <TouchableOpacity style={styles.optionButton} onPress={initEmailPopop}>
                <Text style={styles.optionLabel}>Change Email Address</Text>
            </TouchableOpacity>
        </View>
        
        <View style={[styles.option, styles.sectionSpacing]}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingSettings(true)}>
                <Text style={styles.optionLabel}>Settings</Text>
            </TouchableOpacity>
        </View>



        {/* Dietary Restrictions Section */}
        <View style={[styles.option, styles.dietaryRestrictionsContainer]}>
          <Text style={styles.optionLabel}>Change Dietary Restrictions:</Text>

          {/* spacer between text and buttons */}
          <View style={{height:10}} />

          <View style={{ flexDirection: 'row' }}>
          <View style={styles.dietaryButtonsContainer}>
            <TouchableOpacity
              style={profile.restrictions.vegan ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('vegan', !profile.restrictions.vegan)}
            >
              <Text style={styles.dietaryButtonText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.vegetarian ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('vegetarian', !profile.restrictions.vegetarian)}
            >
              <Text style={styles.dietaryButtonText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.halal ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('halal', !profile.restrictions.halal)}
            >
              <Text style={styles.dietaryButtonText}>Halal</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Pop-up boxes */}

      {/* change password */}
      <Modal 
        animationType={"fade"}
        visible={changingPassword}
        onRequestClose={() => {
          setChangingPassword(false);
        }}
        transparent={true}
      >
        <View style={styles.popup}>
          <Text style={styles.option}>Change Password:</Text>

          <SecureTextInput value={oldPassword} onChangeText={(val) => setOldPassword(val)} placeholder="Old Password" />
          <SecureTextInput value={newPassword} onChangeText={(val) => setNewPassword(val)} placeholder="New Password" />
          <SecureTextInput value={confNewPassword} onChangeText={(val) => setConfNewPassword(val)} placeholder="Confirm New Password" />

          {warning.length == 0 ? null :
          <Text style={styles.warning}>{warning}</Text>}

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingPassword(false)}>
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupConfirmButton} onPress={() => {
              if (!checkPassword(oldPassword)) {
                setWarning("Old password is incorrect");
                return;
              }
              if (newPassword != confNewPassword) {
                setWarning("New passwords do not match");
                return;
              }
              if (newPassword.length < 8) {
                setWarning("New password must be at least 8 characters");
                return;
              }
              setWarning("");
              updatePwassword(newPassword);
              setChangingPassword(false);
              alert("Password changed successfully");
            }}>
                <Text style={styles.popupButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* change email */}
      <Modal
        animationType={"fade"}
        visible={changingEmail}
        onRequestClose={() => {
          setChangingEmail(false);
        }}
        transparent={true}
      >
        <View style={styles.popup}>
          <Text style={styles.option}>Change Email:</Text>
          <TextInput value={newEmail} onChangeText={(val) => setNewEmail(val)} placeholder="New Email" style={styles.popupInput}/>
          <SecureTextInput value={verificationCode} onChangeText={(val) => setVerificationCode(val)} placeholder="Verification Code" />

          {/* spacer after button "send verification code" */}
          <View style={{height:10}} />

          <TouchableOpacity style={styles.SendButton}>
            <Text style={styles.optionLabel}>Send Verification Code</Text>
          </TouchableOpacity>
          <View style={{height:5}} />

          {warning.length == 0 ? null :
          <Text style={styles.warning}>{warning}</Text>}

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingEmail(false)}>
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupConfirmButton} onPress={() => {
              if (!checkVerificationCode(verificationCode)) {
                setWarning("Verification code is incorrect");
                return;
              }
              setWarning("");
              editProfile("email", newEmail);
              setChangingEmail(false);
              alert("Email changed successfully");
            }}>
              <Text style={styles.popupButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>


      {/* settings */}
      <Modal
        animationType={"fade"}
        visible={changingSettings}
        onRequestClose={() => {
          setChangingSettings(false);
        }}
        transparent={true}
      >
        <View style={styles.popup}>
          <TouchableOpacity style={styles.optionButton} onPress={() => setChangingSettings(false)}>
            <Text>No Settings Yet!</Text>
            <View style={{ height: 10 }} />
            <Text>(click to close)</Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  optionsContainer: {
    flex: 1,
    marginTop: 20,
  },
  option: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  optionInput: {
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#888',
    width: '80%',
  },
  optionContainer: {
    marginVertical: 20,
  },
  optionLabel: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  optionValue: {
    fontSize: 18,
    marginBottom: 10,
  },

  optionButton: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    // alignItems: 'center',
    width: "fit-content",
  },


  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    margin: 5,
  },
  dietaryButtonOn: {
    backgroundColor: '#EECC0A', // Calvin gold color for selected button
    padding: 10,
    paddingVertical: 12, // Increased for height
    paddingHorizontal: 25, // Increased for width
    borderRadius: 10,
    marginRight: 10, // space between buttons
  },
  dietaryButtonOff: {
    backgroundColor: '#D3D3D3', // Light gray for unselected button
    borderColor: 'black',
    padding: 10,
    paddingVertical: 12, // Increased for height
    paddingHorizontal: 25, // Increased for width
    borderRadius: 10,
    marginRight: 10, // space between buttons
  },
  dietaryButtonText: {
    color: 'black',
    fontSize: 18,
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    width: 360,
    height: 360,
    margin: "auto",
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
  },
  popupConfirmButton: {
    backgroundColor: 'gold',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    width: 100, // Set fixed width to ensure consistency
    },
  popupCloseButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: 100, // Set fixed width to ensure consistency
  },
  SendButton: {
    borderColor: '#000',
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    width: 220,
  },
  popupButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupInput: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    margin: 10,
    width: 280,
  },
  warning:{
    color: 'red',
    fontSize: 18,
    padding: 5,
    backgroundColor: '#ffccbb',
    borderRadius: 10,
  },

  sectionSpacing: {
    marginVertical: 15, // Adjust to control space between sections
  },

  dietaryRestrictionsContainer: { 
    alignItems: 'center', 
    marginVertical: 20 // Adjust to control space before dietary restrictions section 
  },

  dietaryButtonsContainer: { 
    flexDirection: 'row', 
    marginTop: 10 
  },

  logoutButton: {
    backgroundColor: '#891B2F',
    borderRadius: 10,
    padding: 15,
    width: 200,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
    marginTop: 20,
  },

  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
});

export default ProfilePage;
