import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/SreenWrapper'
import BackButton from '../../components/BackButton'
import { useRouter } from 'expo-router'

const creation_post = () => {
    const router=useRouter()
  return (
    <ScreenWrapper>
        <BackButton router={router} />
      <Text>creation_post</Text>
    </ScreenWrapper>
  )
}

export default creation_post

const styles = StyleSheet.create({})