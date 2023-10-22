import React, { useContext, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
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
import { useUserService } from '../../network/useUserService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GlobalContext } from '../../context/GlobalContext'
import { Base64 } from 'js-base64'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const { startLogin } = useUserService()

  const {globalState, setGlobalState} = useContext(GlobalContext)

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    try {
      setLoading(true)
      const encryptedPassword = Base64.encode(password.value)
      const credential = { email: email.value, password: encryptedPassword }
      const ret = await startLogin(credential)
      setLoading(false)
      if (ret) {
        if (ret.success) {
          await AsyncStorage.setItem("USER", JSON.stringify(ret.data))
          setGlobalState({...globalState, userInfo: ret.data})
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        } else {
          // Alert.alert('Status', ret.error, [{
          //   text: 'Okay',
          //   onPress: () => { }
          // }])
          alert(ret.error)
        }
      } else {
        // Alert.alert('Status', 'Login unsuccessful!', [{
        //   text: 'Okay',
        //   onPress: () => { }
        // }])
        alert('Login unsuccessful!')
      }
    } catch (error) {
      setLoading(false)
      // Alert.alert('Status', 'Login unsuccessful!', [{
      //   text: 'Okay',
      //   onPress: () => { }
      // }])
      alert('Login unsuccessful!')
    }


  }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>

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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size='small' />}
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
