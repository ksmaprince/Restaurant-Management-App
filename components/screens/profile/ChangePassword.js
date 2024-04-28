import Background from "../../Background"
import Header from "../../Header"
import Button from "../../Button"
import TextInput from "../../TextInput"
import { useContext, useState } from "react"
import { GlobalContext } from "../../../context/GlobalContext"
import { useUserService } from "../../../network/useUserService"
import { theme } from '../../../core/theme'
import { StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { passwordValidator } from "../../../helpers/passwordValidator"
import { passwrodMatchValidator } from "../../../helpers/passwordMatchValidator"

import { Base64 } from 'js-base64'

export const ChangePassword = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)

    const [currentPassword, setCurrentPassword] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

    const { changePassword } = useUserService()

    const startChangePassword = async () => {
        const currentPasswordError = passwordValidator(currentPassword.value)
        const passwordError = passwordValidator(password.value)
        const confirmPasswordError = passwordValidator(confirmPassword.value)
        const passwordMatchError = passwrodMatchValidator(password.value, confirmPassword.value)
        if (currentPasswordError || passwordError || confirmPasswordError) {
            setCurrentPassword({ ...currentPassword, error: currentPasswordError })
            setPassword({ ...password, error: passwordError })
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
            return
        } else {
            if (passwordMatchError) {
                setPassword({ ...password, error: passwordMatchError })
                setConfirmPassword({ ...confirmPassword, error: passwordMatchError })
                return
            }
        }

        try {
            setLoading(true)
            const encryptedCurrentPassword = Base64.encode(currentPassword.value)
            const encryptedPassword = Base64.encode(password.value)
            const data = { currentPassword: encryptedCurrentPassword, password: encryptedPassword }
            const ret = await changePassword(globalState.userInfo.token, globalState.userInfo.id, data)
            setLoading(false)
            if (ret) {
                if (ret.success) {
                    alert('Password changed successfully, Please login again.')
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    })

                } else {
                    // Alert.alert('Status', ret.error, [{
                    //   text: 'Okay',
                    //   onPress: () => { }
                    // }])
                    alert(ret.error)
                }
            }
            else {
                // Alert.alert('Status', 'Update profile is unsuccessful!', [{
                //   text: 'Okay',
                //   onPress: () => { }
                // }])
                alert('Change Password Fail.')
            }


        } catch (error) {
            setLoading(false)
            // Alert.alert('Status', 'Update profile is unsuccessful!', [{
            //   text: 'Okay',
            //   onPress: () => { }
            // }])
            alert('Change password is failed!')
        }
    }

    return (
        <Background>
            <Header>Change Password</Header>
            <TextInput
                label="Current Password"
                returnKeyType="done"
                value={currentPassword.value}
                onChangeText={(text) => setCurrentPassword({ value: text, error: '' })}
                error={!!currentPassword.error}
                errorText={currentPassword.error}
                secureTextEntry
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

            <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={confirmPassword.value}
                onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                error={!!confirmPassword.error}
                errorText={confirmPassword.error}
                secureTextEntry
            />
            {loading && <ActivityIndicator size='small' />}
            <Button icon="upload" mode="contained" onPress={startChangePassword}>
                Change Password
            </Button>
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