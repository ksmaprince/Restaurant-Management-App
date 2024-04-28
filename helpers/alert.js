import { Alert, Platform } from 'react-native'

const alertPolyfill = (title, description, options, extra) => {
    const result = window.confirm([title, description].filter(Boolean).join('\n'))

    try {
        if (result) {
            const confirmOption = options.find(({ style }) => style !== 'cancel')
            confirmOption && confirmOption.onPress()
        } else {
            const cancelOption = options.find(({ style }) => style === 'cancel')
            cancelOption && cancelOption.onPress()
        }
    } catch (error) {
        
    }
    
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert