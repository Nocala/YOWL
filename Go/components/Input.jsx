import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const Input = React.forwardRef(({ containerStyles, icon, ...props }, ref) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {icon}
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
        ref={ref}
        {...props}
      />
    </View>
  )
})

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12
  },
  input: {
    flex: 1
  }
})