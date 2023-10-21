import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import Background from '../Background'
import Logo from '../Logo'
import Header from '../Header'
import Button from '../Button'
import TextInput from '../TextInput'
import BackButton from '../BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import { phoneValidator } from '../../helpers/phoneValidator'
import { useUserService } from '../../network/useUserService'

import { Base64 } from 'js-base64'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const { createUser } = useUserService()

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const phoneError = phoneValidator(phone.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError || phoneError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPhone({ ...phone, error: phoneError })
      setName({ ...name, error: nameError })
      return
    }
    try {
      setLoading(true)
      const encryptedPassword = Base64.encode(password.value)
      const user = { name: name.value, phone: phone.value, email: email.value, password: encryptedPassword }
      const ret = await createUser(user)
      setLoading(false)
      if (ret) {
        if (ret.success) {
          Alert.alert('Status', 'User created successfully', [{
            text: 'Okay',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              })
            }
          }])
        } else {
          Alert.alert('Status', ret.error, [{
            text: 'Okay',
            onPress: () => { }
          }])
        }
      }
      else {
        Alert.alert('Status', 'Create user is unsuccessful!', [{
          text: 'Okay',
          onPress: () => { }
        }])
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('Status', 'Create user is unsuccessful!', [{
        text: 'Okay',
        onPress: () => { }
      }])
    }

  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        autoCompleteType="number"
        textContentType="number"
        keyboardType="number"
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {loading && <ActivityIndicator size='small' />}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
