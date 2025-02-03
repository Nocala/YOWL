import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/SreenWrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../constants/theme';

const index = () => {
    const router = useRouter();
    return (
        <ScreenWrapper bg={ theme.colors.whiteorange }>
            <Header />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>index</Text>
                <Button title="welcome" onPress={() => router.push('Welcome')} />
            </View>
            <Footer />
        </ScreenWrapper>
    );
};

export default index;