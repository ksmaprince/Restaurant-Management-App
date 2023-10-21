import React, { useContext, useEffect } from 'react'
import Background from '../Background'
import Logo from '../Logo'
import Header from '../Header'
import Paragraph from '../Paragraph'
import { ActivityIndicator, TouchableRipple, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GlobalContext } from '../../context/GlobalContext'

export default function WelcomeScreen({ navigation }) {
    const {globalState, setGlobalState} = useContext(GlobalContext)
    useEffect(() => {
        prepare()
    }, [])

    const prepare = async () => {
        let user =  await AsyncStorage.getItem('USER')
        setTimeout(async() => {
            if(user){
                setGlobalState({...globalState, userInfo: JSON.parse(user)})
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                  })
            }else{
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'StartScreen' }],
                  })
            }
              
        }, 2000)
    }

    return (
        <Background>
            <Logo />
            <Header>Restaurant Management</Header>
            <Paragraph>
                Preparing your app . . .
            </Paragraph>
            <ActivityIndicator size='small' />
        </Background>
    )
}
