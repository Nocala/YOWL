import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import { theme } from '../../constants/theme'
import ArrowLeft from './Arrow_Left'
import ArrowRight from './Arrow_Right'
import Basketball from './Basket-ball_Ball'
import Cross from './Cross'
import Message from './Message'
import News from './News'
import Plus from './Plus'
import Plus_2 from './Plus_2'
import Reels from './Reels'
import Search from './Search'
import User from './User'
import Settings01Icon from './Settings'

const icons = {
    home: Home,
    arrowleft: ArrowLeft,
    arrowright: ArrowRight,
    ballon_basket: Basketball,
    cross: Cross,
    message: Message,
    news: News,
    plus: Plus,
    reels: Reels,
    search: Search,
    user: User,
    plus_2: Plus_2,
    settings: Settings01Icon
}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
  return (
    <IconComponent
        height={props.size || 24}
        width={props.size || 24}
        strokeWidth={props.strokeWidth || 1.9}
        color={theme.colors.textLight}
        {...props}
    />
  )
}

export default Icon

const styles = StyleSheet.create({})