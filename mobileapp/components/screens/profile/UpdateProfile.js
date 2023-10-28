import Background from "../../Background"
import Logo from "../../Logo"
import Header from "../../Header"
import Button from "../../Button"
import TextInput from "../../TextInput"
import { useContext, useState } from "react"
import { GlobalContext } from "../../../context/GlobalContext"
import { useUserService } from "../../../network/useUserService"
import { addressValidator } from '../../../helpers/addressValidator'
import { nameValidator } from '../../../helpers/nameValidator'
import { phoneValidator } from '../../../helpers/phoneValidator'
import { theme } from '../../../core/theme'
import { StyleSheet } from "react-native"
import { ActivityIndicator, Avatar } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DEFAULT_PROFILE_URL } from '@env'

export const UpdateProfile = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState({ value: globalState.userInfo.name, error: '' })
    const [phone, setPhone] = useState({ value: globalState.userInfo.phone, error: '' })
    const [address, setAddress] = useState({ value: globalState.userInfo.address, error: '' })
    const [email, setEmail] = useState({ value: globalState.userInfo.email, error: '' })
    const { updateProfile } = useUserService()

    const startUpdateProfile = async () => {
        const nameError = nameValidator(name.value)
        const phoneError = phoneValidator(phone.value)
        const addressError = addressValidator(address.value)
        if (addressError || nameError || phoneError) {
            setAddress({ ...address, error: addressError })
            setPhone({ ...phone, error: phoneError })
            setName({ ...name, error: nameError })
            return
        }
        try {
            setLoading(true)
            const user = { name: name.value, address: address.value, phone: phone.value }
            const ret = await updateProfile(globalState.userInfo.token, globalState.userInfo.id, user)
            setLoading(false)
            if (ret) {
                if (ret.success) {
                    await AsyncStorage.setItem("USER", JSON.stringify(ret.data))
                    setGlobalState({ ...globalState, userInfo: ret.data })
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
            {globalState.userInfo.image ? <Avatar.Image source={globalState.userInfo.image} size={150} /> : <Avatar.Image source={DEFAULT_PROFILE_URL} size={100} />}
            {loading && <ActivityIndicator size='small' />}
            <Header>Update Profile</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
                autoCapitalize="none"
                autoCompleteType="none"
            />
            <TextInput
                label="Phone"
                returnKeyType="next"
                value={phone.value}
                onChangeText={(text) => setPhone({ value: text, error: '' })}
                error={!!phone.error}
                errorText={phone.error}
                autoCapitalize="none"
                autoCompleteType="none"
                keyboardType="number-pad"
            />
            <TextInput
                label="Address"
                returnKeyType="next"
                value={address.value}
                onChangeText={(text) => setAddress({ value: text, error: '' })}
                error={!!address.error}
                errorText={address.error}
                autoCapitalize="none"
                autoCompleteType="none"
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                disabled
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