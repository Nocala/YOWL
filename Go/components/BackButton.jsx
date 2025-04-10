import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../assets/icons/Index'
import { theme } from '../constants/theme'

const BackButton = ({ size = 26, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Icon name="arrowleft" strokeWidth={2.5} size={size} color={theme.colors.orange} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm
  }
})