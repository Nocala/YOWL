import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/SreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';

const création_profil_1 = () => {
    const router = useRouter();
  return (
    <ScreenWrapper bg={theme.colors.whiteorange}>
        <View>
            <Text>
                Ta chevreuil la pute
            </Text>
        </View>
    </ScreenWrapper>
  )
}

export default création_profil_1

const styles = StyleSheet.create({})