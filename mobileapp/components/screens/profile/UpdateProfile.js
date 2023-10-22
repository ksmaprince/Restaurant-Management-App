import Background from "../../Background"
import Logo from "../../Logo"
import Header from "../../Header"
import Button from "../../Button"
import TextInput from "../../TextInput"
import { useContext, useState } from "react"
import { GlobalContext } from "../../../context/GlobalContext"
import { useUserService } from "../../../network/useUserService"
import { emailValidator } from '../../../helpers/emailValidator'
import { nameValidator } from '../../../helpers/nameValidator'
import { phoneValidator } from '../../../helpers/phoneValidator'
import { theme } from '../../../core/theme'
import { StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export const UpdateProfile = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState({ value: globalState.userInfo.name, error: '' })
    const [phone, setPhone] = useState({ value: globalState.userInfo.phone, error: '' })
    const [email, setEmail] = useState({ value: globalState.userInfo.email, error: '' })
    const { updateProfile } = useUserService()

    const startUpdateProfile = async () => {
        const nameError = nameValidator(name.value)
        const phoneError = phoneValidator(phone.value)
        const emailError = emailValidator(email.value)
        if (emailError || nameError || phoneError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setPhone({ ...phone, error: phoneError })
            setName({ ...name, error: nameError })
            return
        }
        try {
            setLoading(true)
            const user = { name: name.value, phone: phone.value, email: email.value }
            const ret = await updateProfile(globalState.userInfo.token, globalState.userInfo.id, user)
            setLoading(false)
            if (ret) {
                if (ret.success) {
                    // Alert.alert('Status', 'Profile updated successfully', [{
                    //     text: 'Okay',
                    //     onPress: () => {
                    //         navigation.reset({
                    //             index: 0,
                    //             routes: [{ name: 'LoginScreen' }],
                    //         })
                    //     }
                    // }])
                    setGlobalState({...globalState, userInfo: {...globalState.userInfo, name: name.value, phone: phone.value, email: email.value}})
                    alert('Profile updated successfully')
                    navigation.goBack()
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
                alert('Update profile is unsuccessful!')
            }
        } catch (error) {
            setLoading(false)
            // Alert.alert('Status', 'Update profile is unsuccessful!', [{
            //   text: 'Okay',
            //   onPress: () => { }
            // }])
            alert('Update profile is unsuccessful!')
        }
    }

    return (
        <Background>
            {globalState.userInfo.image ? <Avatar.Image source={globalState.userInfo.image} size={150} /> : <Logo />}
            {loading && <ActivityIndicator size='small' />}
            <Header>Update Profile</Header>
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
            <Button icon="upload" mode="outlined" onPress={startUpdateProfile}>
                Update Profile
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