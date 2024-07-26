import React, { useState } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons'; // Use this if you have Expo installed
import { useNavigation } from '@react-navigation/native';
export default function LoginUI() {
  const [showPassword, setShowPassword] = useState(false);
  const [choseLogin, setChoseLogin] = useState(true);

  const toggleLoginOrSignin = () => {
    setChoseLogin(!choseLogin);
  };

  const handleLoginOrSignin = () => {
    navigation.navigate('ContainerRouter');
  };
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground source={require('../images/backgroundWelcome.png')} style={styles.backgroundImage}>
        <View style={styles.card}>
          <View style={styles.switcher}>
            <TouchableOpacity
              onPress={() => setChoseLogin(true)}
              style={[styles.button, choseLogin && styles.activeButton]}
            >
              <Text style={[styles.buttonText, choseLogin && styles.activeButtonText]}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChoseLogin(false)}
              style={[styles.button, !choseLogin && styles.activeButton]}
            >
              <Text style={[styles.buttonText, !choseLogin && styles.activeButtonText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {choseLogin ? (
            <View style={styles.form}>
              <TextInput autoCapitalize="none" placeholder="Enter email or username" style={styles.input} />
              <View style={styles.passwordContainer}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                  <Ionicons name={!showPassword ? 'eye-off' : 'eye'} size={24} color="#A8A7A7" />
                </TouchableOpacity>
              </View>
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleLoginOrSignin} style={{ ...styles.submitButton, marginTop: 61 }}>
                <Text style={styles.submitButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <TextInput autoCapitalize="none" placeholder="Enter email or username" style={styles.input} />
              <TextInput autoCapitalize="none" placeholder="Password" style={styles.input} />
              <TextInput autoCapitalize="none" placeholder="Confirm Password" style={styles.input} />

              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.orText}>OR</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome5 name="facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesign name="google" size={30} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesign name="twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 315,
    padding: 20,
    borderRadius: 34,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    height: 525,
  },
  switcher: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#614385',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#A8A7A7',
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A8A7A7',

    borderRadius: 8,
    marginBottom: 15,
  },
  icon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#A8A7A7',
    textDecorationLine: 'underline',
  },
  submitButton: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#614385',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  orText: {
    marginVertical: 20,
    color: '#A8A7A7',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  socialIcon: {
    flex: 1,
    alignItems: 'center',
  },
});
