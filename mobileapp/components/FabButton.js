import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, MD3Colors, Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function FabButton({onPress }) {
    return (
        <View style={styles.roundButton}>
        <IconButton
          icon="plus-thick"
          iconColor= {theme.colors.surface}
          size={20}
          onPress={onPress}
        />
        
      </View>
    )
}
const styles = StyleSheet.create({
    roundButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        alignSelf: "center",
        backgroundColor: theme.colors.primary,
        zIndex: 1,
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignltems: "center",
        overflow: "hidden",
      },
      plustext: {
        color: theme.colors.surface,
        fontSize: 40,
        width: 30,
      },
})
